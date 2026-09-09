<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * Registro de novo usuário (Consumidor ou Produtor)
     */
    public function register(Request $request)
    {
        // 1. Validação dos dados
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'document' => 'required|string|max:20',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            
            // Campos específicos do fluxo
            'role' => ['required', Rule::in(['consumer', 'producer'])],
            'has_organic_certificate' => 'nullable|boolean',
            
            // Validação condicional: Só é obrigatório se has_organic_certificate for true (1)
            'organic_expiry_date' => 'required_if:has_organic_certificate,true|nullable|date|after:today',
            'organic_document' => 'required_if:has_organic_certificate,true|nullable|file|mimes:pdf,jpg,jpeg,png|max:2048', // Max 2MB
            
            // Validação da foto de perfil (opcional, apenas imagens, max 2MB)
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // 2. Processar o upload da foto de perfil (se enviada)
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('profile-pictures');
        }

        // 3. Processar o upload do documento orgânico (se existir e for válido)
        $documentPath = null;
        if ($request->hasFile('organic_document')) {
            // Documentos pessoais não podem ficar acessíveis por URL pública.
            $documentPath = $request->file('organic_document')->store('organic-documents');
        }

        // 4. Gerar código de verificação de 6 dígitos
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        // 5. Preparar os dados para salvar no banco
        $userData = [
            'name' => $validated['name'],
            'profile_picture' => $profilePicturePath,
            'document' => $validated['document'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']), // Garante o hash
            'role' => $validated['role'],
            'has_organic_certificate' => (bool) ($validated['has_organic_certificate'] ?? false),
            'organic_expiry_date' => $validated['organic_expiry_date'] ?? null,
            'organic_document_path' => $documentPath,
            // Salva o código e a data de expiração (15 minutos)
            'verification_code' => $code,
            'verification_code_expires_at' => now()->addMinutes(15),
        ];

        // 6. Criar o usuário no banco de dados
        $user = User::create($userData);

        // 7. Enviar o email com o código de verificação
        Mail::raw("Olá {$user->name}! Seu código de verificação do Gourmetize é: {$code}\nEste código expira em 15 minutos.", function ($message) use ($user) {
            $message->to($user->email)->subject('Código de Verificação - Gourmetize');
        });

        // 8. Retornar resposta de sucesso (sem token, pois ainda não está verificado)
        return response()->json([
    'success' => true,
    'message' => 'Cadastro realizado! Enviamos um código de 6 dígitos para o seu e-mail.',
    'email' => $user->email,
], 200);
    }

    /**
     * Login do usuário
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        // Bloqueia o login se o email ainda não foi verificado
        if (!$user->email_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Por favor, verifique seu email antes de fazer login.',
            ], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role, // Importante para o Frontend saber para onde redirecionar
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    /**
     * Verifica o código OTP enviado por email
     */
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        // Verifica se o usuário existe, se o código bate e se não expirou
        if (!$user || $user->verification_code !== $request->code || now()->gt($user->verification_code_expires_at)) {
            return response()->json([
                'success' => false,
                'message' => 'Código inválido ou expirado.',
            ], 400);
        }

        // Código correto: marca como verificado e limpa o código
        $user->update([
            'verification_code' => null,
            'verification_code_expires_at' => null,
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Email verificado com sucesso! Agora você pode fazer login.',
        ], 200);
    }

    /**
     * Logout do usuário (revoga o token atual)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout realizado com sucesso!',
        ], 200);
    }
}
