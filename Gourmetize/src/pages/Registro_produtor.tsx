import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAccount, verifyAccount } from "../lib/auth";
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
  DocumentIcon,
  CalendarIcon,
  CameraIcon,
  KeyIcon, // Ícone para a tela de verificação
} from "@heroicons/react/24/outline";
import ScrollReveal from "../components/ScrollReveal";

export default function RegisterProducer() {
  const navigate = useNavigate();
  
  // Controla qual tela mostrar: 'form' (cadastro) ou 'verify' (código OTP)
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [userEmail, setUserEmail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [localVerificationCode, setLocalVerificationCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Botão de olho para confirmar senha
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
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
    role: "producer", // Define automaticamente como produtor
    has_organic_certificate: false,
    organic_expiry_date: "",
    organic_document: null as File | null,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const v = value.replace(/\D/g, '');
    if (v.length <= 11) {
      return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return v.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
  };

  const formatPhone = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    let formattedValue = value;

    if (name === 'document') formattedValue = formatDocument(value);
    if (name === 'phone') formattedValue = formatPhone(value);

    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files?.[0] || null : formattedValue) 
    });
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
    formData.email.trim().toLowerCase() === formData.email_confirmation.trim().toLowerCase() &&
    formData.password.trim() !== "" &&
    formData.password_confirmation.trim() !== "" &&
    formData.password.length >= 8 &&
    formData.password === formData.password_confirmation &&
    acceptedTerms &&
    (!formData.has_organic_certificate || (formData.organic_expiry_date !== "" && formData.organic_document !== null));

  // 1. Enviar formulário de cadastro (Passo 1)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const data = new FormData();
      
      data.append('name', formData.name);
      data.append('document', formData.document);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('email', formData.email);
      data.append('email_confirmation', formData.email_confirmation);
      data.append('password', formData.password);
      data.append('password_confirmation', formData.password_confirmation);
      data.append('role', formData.role);
      data.append('has_organic_certificate', formData.has_organic_certificate ? '1' : '0');
      
      if (profilePicture) {
        data.append('profile_picture', profilePicture);
      }

      if (formData.has_organic_certificate) {
        if (formData.organic_expiry_date) {
          data.append('organic_expiry_date', formData.organic_expiry_date);
        }
        if (formData.organic_document) {
          data.append('organic_document', formData.organic_document);
        }
      }

      const response = await registerAccount(data);
      
      // Salva o email para usar na próxima etapa e muda para a tela de verificação
      setUserEmail(formData.email);
      setStep('verify');
      setLocalVerificationCode(response.verificationCode ?? "");
      setSuccessMessage(response.message || "Cadastro realizado! Verifique seu email.");

    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        setErrorMessage(firstError[0]);
      } else if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(error.message || "Erro ao conectar com o servidor. Tente novamente.");
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
      const response = await verifyAccount(userEmail, verifyCode);
      
      setSuccessMessage(response.message || "Email verificado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || error.message || "Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-emerald-50/50 dark:bg-slate-950/50 overflow-hidden py-10">
      {/* Fundo */}
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-teal-200/60 dark:from-emerald-950/40 dark:via-slate-900/20 dark:to-teal-950/40" />
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-emerald-300/40 dark:bg-emerald-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-lime-300/40 dark:bg-lime-700/20 rounded-full blur-3xl" />

      {/* Card */}
      <ScrollReveal>
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl px-8 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Gourmetize" className="h-14 rounded-full" />
        </div>

        {/* Mensagens de Feedback */}
        {errorMessage && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 mb-4 text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 mb-4 text-center">
            {successMessage}
          </div>
        )}

        {/* --- TELA 1: Formulário de Cadastro --- */}
        {step === 'form' && (
          <>
            {/* Título */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">
                Cadastro de Produtor
              </h1>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Cadastre seu estabelecimento e comece a vender
              </p>
            </div>

            {/* --- ÁREA DE UPLOAD DE FOTO DE PERFIL COM PRÉ-VISUALIZAÇÃO --- */}
            <div className="flex justify-center mb-6">
              <label className="relative h-24 w-24 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-800 transition overflow-hidden group">
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

            {/* Formulário */}
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">

                <Input icon={UserCircleIcon} label="Nome Completo / Nome Fantasia" name="name" value={formData.name} onChange={handleChange} />
                <Input icon={IdentificationIcon} label="CPF / CNPJ" name="document" value={formData.document} onChange={handleChange} />
                <Input icon={PhoneIcon} label="Telefone" name="phone" value={formData.phone} onChange={handleChange} />
                <Input icon={MapPinIcon} label="Endereço" name="address" value={formData.address} onChange={handleChange} />

                <Input icon={EnvelopeIcon} label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                <Input icon={EnvelopeIcon} label="Confirmar email" name="email_confirmation" value={formData.email_confirmation} onChange={handleChange} type="email" />

                {/* Senha */}
                <div>
                  <label className="text-xs text-emerald-800 dark:text-emerald-200">Senha</label>
                  <div className="relative">
                    <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-emerald-50 dark:bg-slate-800/70 border border-emerald-300 dark:border-slate-600 pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-transform duration-200 hover:scale-110">
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-2 flex gap-1">
                    <span className={`h-1 w-full rounded ${strength >= 1 ? "bg-red-500" : "bg-emerald-200 dark:bg-slate-700"}`} />
                    <span className={`h-1 w-full rounded ${strength >= 2 ? "bg-amber-400" : "bg-emerald-200 dark:bg-slate-700"}`} />
                    <span className={`h-1 w-full rounded ${strength >= 3 ? "bg-emerald-500" : "bg-emerald-200 dark:bg-slate-700"}`} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-emerald-800 dark:text-emerald-200">Confirmar senha</label>
                  <div className="relative">
                    <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="password_confirmation" 
                      value={formData.password_confirmation} 
                      onChange={handleChange} 
                      className="w-full rounded-xl bg-emerald-50 dark:bg-slate-800/70 border border-emerald-300 dark:border-slate-600 pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 transition-transform duration-200 hover:scale-110"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* --- SEÇÃO DE CERTIFICAÇÃO ORGÂNICA (CONDICIONAL) --- */}
              <div className="mt-8 p-4 rounded-xl bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/60">
                <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
                  <DocumentIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  Certificação Orgânica
                </h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="has_organic_certificate"
                      checked={formData.has_organic_certificate}
                      onChange={handleChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-emerald-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    <span className="ml-3 text-sm font-medium text-emerald-900 dark:text-emerald-100">Possui Atestado de Conformidade Orgânica?</span>
                  </label>
                </div>

                {/* Campos condicionais */}
                {formData.has_organic_certificate && (
                  <div className="grid sm:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label className="text-xs text-emerald-800 dark:text-emerald-200">Data de Validade</label>
                      <div className="relative">
                        <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                        <input
                          type="date"
                          name="organic_expiry_date"
                          value={formData.organic_expiry_date}
                          onChange={handleChange}
                          className="w-full rounded-xl bg-emerald-50 dark:bg-slate-800/70 border border-emerald-300 dark:border-slate-600 pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-emerald-800 dark:text-emerald-200">Documento Escaneado (PDF, JPG, PNG)</label>
                      <div className="relative">
                        <DocumentIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                        <input
                          type="file"
                          name="organic_document"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleChange}
                          className="w-full rounded-xl bg-emerald-50 dark:bg-slate-800/70 border border-emerald-300 dark:border-slate-600 pl-10 pr-4 py-2 text-sm text-slate-700 dark:text-slate-200 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-200 dark:file:bg-emerald-900/60 file:text-emerald-800 dark:file:text-emerald-200 hover:file:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      {formData.organic_document && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Arquivo selecionado: {formData.organic_document.name}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Seção de Aceite dos Termos */}
              <div className="mt-6 flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="mt-1 accent-emerald-600"
                />
                <p>
                  Li e aceito os{" "}
                  <Link to="/termos" className="underline cursor-pointer hover:text-emerald-900 dark:hover:text-emerald-100 transition">Termos de Uso</Link>
                  {", "}
                  <Link to="/privacidade" className="underline cursor-pointer hover:text-emerald-900 dark:hover:text-emerald-100 transition">Política de Privacidade</Link>{" "}
                  e{" "}
                  <Link to="/cookies" className="underline cursor-pointer hover:text-emerald-900 dark:hover:text-emerald-100 transition">Política de Cookies</Link>.
                </p>
              </div>

              {/* Botão */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="w-full mt-6 rounded-xl bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Cadastrar Estabelecimento"
                )}
              </button>
              {!isFormValid && <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">Confira e-mail, senha (mínimo de 8 caracteres), termos e, se aplicável, os documentos de certificação.</p>}
            </form>
          </>
        )}

        {/* --- TELA 2: Verificação de Código OTP --- */}
        {step === 'verify' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <KeyIcon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100">Verifique seu email</h2>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">
                Enviamos um código de 6 dígitos para <strong>{userEmail}</strong>.<br/>
                O código expira em 15 minutos.
              </p>
              {localVerificationCode && <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900 dark:bg-amber-400/15 dark:text-amber-200">Modo local: use o código {localVerificationCode}</p>}
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

            <button onClick={() => setStep('form')} className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 underline">
              Voltar e corrigir dados
            </button>
          </div>
        )}

        {step === 'form' && (
          <p className="mt-4 text-xs text-center text-emerald-700 dark:text-emerald-300">
            Um email de confirmação será enviado após o cadastro.
          </p>
        )}
      </div>
      </ScrollReveal>
    </div>
  );
}

/* INPUT PADRÃO */
function Input({ icon: Icon, label, name, value, onChange, type = "text", placeholder }: any) {
  return (
    <div>
      <label className="text-xs text-emerald-800 dark:text-emerald-200">{label}</label>
      <div className="relative">
        <Icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl bg-emerald-50 dark:bg-slate-800/70 border border-emerald-300 dark:border-slate-600 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
