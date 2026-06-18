<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'profile_picture',           // <-- Adicionado (caminho da foto de perfil)
        'email',
        'password',
        'document',
        'phone',
        'address',
        'role',                      // <-- Adicionado (consumer ou producer)
        'has_organic_certificate',   // <-- Adicionado (boolean)
        'organic_expiry_date',       // <-- Adicionado (date)
        'organic_document_path',     // <-- Adicionado (string/caminho do arquivo)
        'verification_code',
        'verification_code_expires_at',
        'email_verified_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'has_organic_certificate' => 'boolean', // <-- Adicionado
            'organic_expiry_date' => 'date',        // <-- Adicionado
        ];
    }
}