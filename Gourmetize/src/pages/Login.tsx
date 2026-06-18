import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/imagens/logo.jpeg";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import ScrollReveal from "../components/ScrollReveal";

export default function Login() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Força da senha (visual)
  const strength =
    formData.password.length === 0
      ? 0
      : formData.password.length < 6
      ? 1
      : formData.password.length < 10
      ? 2
      : 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Limpa mensagens de erro ao digitar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Envia os dados para a API do Laravel
      const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
      
      setSuccessMessage(response.data.message || "Login realizado com sucesso!");
      
      // Salva o token no localStorage
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Redireciona para a home após 1.5 segundos
      setTimeout(() => navigate("/"), 1500);

    } catch (error: any) {
      // Captura os erros de validação do Laravel
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        setErrorMessage(firstError[0]);
      } else if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-50/50 dark:bg-slate-950/50">

      {/* Fundo decorativo verde */}
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-teal-200/60" />
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-emerald-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-lime-300/40 rounded-full blur-3xl" />

      {/* Card */}
      <ScrollReveal>
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl px-8 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Gourmetize"
            className="h-16 w-auto rounded-full drop-shadow-md"
          />
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-emerald-900">
            Gourmetize
          </h1>
          <p className="mt-1 text-sm text-emerald-700">
            Acesse sua conta
          </p>
        </div>

        {/* Mensagens de Feedback (Erro/Sucesso) */}
        {errorMessage && (
          <div className="p-3 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800 mb-4">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 text-sm text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 mb-4">
            {successMessage} Redirecionando...
          </div>
        )}

        <form onSubmit={handleSubmit}>
        <div className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs mb-1 text-emerald-800">
              Email
            </label>

            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
                className="w-full rounded-xl bg-emerald-50 border border-emerald-300 pl-10 pr-4 py-2.5 text-sm text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs mb-1 text-emerald-800">
              Senha
            </label>

            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-emerald-50 border border-emerald-300 pl-10 pr-12 py-2.5 text-sm text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />

              {/* Mostrar senha */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700 transition-transform duration-200 hover:scale-110"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Força da senha */}
            <div className="mt-2 flex gap-1">
              <span
                className={`h-1 w-full rounded transition ${
                  strength >= 1 ? "bg-red-500" : "bg-emerald-200"
                }`}
              />
              <span
                className={`h-1 w-full rounded transition ${
                  strength >= 2 ? "bg-amber-400" : "bg-emerald-200"
                }`}
              />
              <span
                className={`h-1 w-full rounded transition ${
                  strength >= 3 ? "bg-emerald-500" : "bg-emerald-200"
                }`}
              />
            </div>

            <p className="mt-1 text-[11px] text-emerald-700">
              {strength === 1 && "Senha fraca"}
              {strength === 2 && "Senha média"}
              {strength === 3 && "Senha forte"}
            </p>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 rounded-xl bg-emerald-600 disabled:opacity-50 hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4 text-xs text-emerald-700">
            <span className="hover:underline cursor-pointer">
              Esqueci a senha
            </span>
            <Link to="/registro" className="hover:underline cursor-pointer">
              Criar conta
            </Link>
          </div>
        </div>
        </form>
      </div>
      </ScrollReveal>
    </div>
  );
}
