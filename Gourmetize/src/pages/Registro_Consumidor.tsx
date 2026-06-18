import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/imagens/logo.jpeg";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  IdentificationIcon,
  UserCircleIcon,
  MapPinIcon,
  CameraIcon,
  KeyIcon, // Ícone para a tela de verificação
} from "@heroicons/react/24/outline";
import ScrollReveal from "../components/ScrollReveal";

export default function RegisterConsumer() {
  const navigate = useNavigate();
  
  // Controla qual tela mostrar: 'form' (cadastro) ou 'verify' (código OTP)
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [userEmail, setUserEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Botão de olho para confirmar senha
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Estados para lidar com a foto de perfil
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    phone: "",
    address: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
    role: "consumer",
  });

  const strength =
    formData.password.length === 0
      ? 0
      : formData.password.length < 6
        ? 1
        : formData.password.length < 10
          ? 2
          : 3;

  // --- Máscaras de Formatação ---
  const formatDocument = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length <= 11) {
      return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return v.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, "");
    return v.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "document") formattedValue = formatDocument(value);
    if (name === "phone") formattedValue = formatPhone(value);
    setFormData({ ...formData, [name]: formattedValue });
    setErrorMessage("");
  };

  // Função para capturar o arquivo de imagem e gerar pré-visualização
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Validação em tempo real para habilitar o botão
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.document.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.email_confirmation.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.password_confirmation.trim() !== "" &&
    acceptedTerms;

  // 1. Enviar formulário de cadastro (Passo 1)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value as string);
      });
      if (profilePicture) {
        data.append('profile_picture', profilePicture);
      }

      const response = await axios.post("http://127.0.0.1:8000/api/register", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Salva o email para usar na próxima etapa e muda para a tela de verificação
      setUserEmail(formData.email);
      setStep('verify');
      setSuccessMessage(response.data.message || "Cadastro realizado! Verifique seu email.");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0] as string[];
        setErrorMessage(firstError[0]);
      } else {
        setErrorMessage(error.response?.data?.message || "Erro ao conectar com o servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Enviar código de verificação (Passo 2)
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.length !== 6) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verify-email", {
        email: userEmail,
        code: verifyCode,
      });
      
      setSuccessMessage(response.data.message || "Email verificado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-emerald-50/50 dark:bg-slate-950/50 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-teal-200/60" />
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-emerald-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-lime-300/40 rounded-full blur-3xl" />

      <ScrollReveal>
        <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl px-8 py-10">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Gourmetize" className="h-14 rounded-full" />
          </div>

          {errorMessage && (
            <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 mb-4 text-center">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="p-3 text-sm text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 mb-4 text-center">{successMessage}</div>
          )}

          {/* --- TELA 1: Formulário de Cadastro --- */}
          {step === 'form' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-emerald-900">Cadastro de Consumidor</h1>
                <p className="text-sm text-emerald-700">Crie sua conta para começar</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <button type="button" className="rounded-xl border border-emerald-300 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition">Continuar com Google</button>
                <button type="button" className="rounded-xl border border-emerald-300 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition">Continuar com iOS</button>
              </div>

              <div className="text-center text-xs text-emerald-600 mb-6">ou preencha o formulário abaixo</div>

              {/* --- ÁREA DE UPLOAD DE FOTO DE PERFIL COM PRÉ-VISUALIZAÇÃO --- */}
              <div className="flex justify-center mb-6">
                <label className="relative h-24 w-24 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-600 text-xs cursor-pointer hover:bg-emerald-50 transition overflow-hidden group">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <CameraIcon className="h-6 w-6 mb-1" />
                      <span>Foto</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  {previewUrl && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <CameraIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                </label>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input icon={UserCircleIcon} label="Nome completo / Nome fantasia" name="name" value={formData.name} onChange={handleChange} />
                  <Input icon={IdentificationIcon} label="CPF / CNPJ" name="document" value={formData.document} onChange={handleChange} />
                  <Input icon={PhoneIcon} label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
                  <Input icon={MapPinIcon} label="Endereço" name="address" value={formData.address} onChange={handleChange} />
                  <Input icon={EnvelopeIcon} label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                  <Input icon={EnvelopeIcon} label="Confirmar email" name="email_confirmation" value={formData.email_confirmation} onChange={handleChange} type="email" />

                  <div>
                    <label className="text-xs text-emerald-800">Senha</label>
                    <div className="relative">
                      <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full rounded-xl bg-emerald-50 border border-emerald-300 pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 transition-transform duration-200 hover:scale-110">
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="mt-2 flex gap-1">
                      <span className={`h-1 w-full rounded ${strength >= 1 ? "bg-red-500" : "bg-emerald-200"}`} />
                      <span className={`h-1 w-full rounded ${strength >= 2 ? "bg-amber-400" : "bg-emerald-200"}`} />
                      <span className={`h-1 w-full rounded ${strength >= 3 ? "bg-emerald-500" : "bg-emerald-200"}`} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-emerald-800">Confirmar senha</label>
                    <div className="relative">
                      <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        name="password_confirmation" 
                        value={formData.password_confirmation} 
                        onChange={handleChange} 
                        className="w-full rounded-xl bg-emerald-50 border border-emerald-300 pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 transition-transform duration-200 hover:scale-110"
                      >
                        {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 text-xs text-emerald-700">
                  <input type="checkbox" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} className="mt-1 accent-emerald-600" />
                  <p>
                    Li e aceito os{" "}
                    <Link to="/termos" className="underline cursor-pointer hover:text-emerald-900 transition">Termos de Uso</Link>,{" "}
                    <Link to="/privacidade" className="underline cursor-pointer hover:text-emerald-900 transition">Política de Privacidade</Link>{" "}
                    e{" "}
                    <Link to="/cookies" className="underline cursor-pointer hover:text-emerald-900 transition">Política de Cookies</Link>.
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={!isFormValid || isLoading} 
                  className="w-full mt-6 rounded-xl bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : "Criar conta"}
                </button>
              </form>
            </>
          )}

          {/* --- TELA 2: Verificação de Código OTP --- */}
          {step === 'verify' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <KeyIcon className="h-10 w-10 text-emerald-600" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-emerald-900">Verifique seu email</h2>
                <p className="text-sm text-emerald-700 mt-2">
                  Enviamos um código de 6 dígitos para <strong>{userEmail}</strong>.<br/>
                  O código expira em 15 minutos.
                </p>
              </div>

              <form onSubmit={handleVerify} className="max-w-xs mx-auto space-y-4">
                <Input 
                  icon={KeyIcon} 
                  label="Código de verificação" 
                  name="verifyCode" 
                  value={verifyCode} 
                  onChange={(e: any) => { 
                    // Permite apenas números e limita a 6 dígitos
                    setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6)); 
                    setErrorMessage(""); 
                  }} 
                  placeholder="000000" 
                />
                
                <button 
                  type="submit" 
                  disabled={verifyCode.length !== 6 || isLoading} 
                  className="w-full rounded-xl bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : "Verificar e Concluir"}
                </button>
              </form>

              <button onClick={() => setStep('form')} className="text-sm text-emerald-600 hover:text-emerald-800 underline">
                Voltar e corrigir dados
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}

function Input({ icon: Icon, label, name, value, onChange, type = "text", placeholder }: any) {
  return (
    <div>
      <label className="text-xs text-emerald-800">{label}</label>
      <div className="relative">
        <Icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full rounded-xl bg-emerald-50 border border-emerald-300 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
      </div>
    </div>
  );
}
