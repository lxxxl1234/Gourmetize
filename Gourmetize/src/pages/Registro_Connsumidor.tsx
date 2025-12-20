import { useState } from "react";
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
} from "@heroicons/react/24/outline";

export default function RegisterConsumer() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-emerald-50 overflow-hidden">

      {/* Fundo */}
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-teal-200/60" />
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-emerald-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-lime-300/40 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-emerald-200 bg-white/90 backdrop-blur-xl shadow-2xl px-8 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Gourmetize" className="h-14 rounded-full" />
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-emerald-900">
            Cadastro de Consumidor
          </h1>
          <p className="text-sm text-emerald-700">
            Crie sua conta para começar
          </p>
        </div>

        {/* Social login */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <button className="rounded-xl border border-emerald-300 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition">
            Continuar com Google
          </button>
          <button className="rounded-xl border border-emerald-300 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50 transition">
            Continuar com iOS
          </button>
        </div>

        <div className="text-center text-xs text-emerald-600 mb-6">
          ou preencha o formulário abaixo
        </div>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-600 text-xs cursor-pointer hover:bg-emerald-50 transition">
            Foto
          </div>
        </div>

        {/* Formulário */}
        <div className="grid sm:grid-cols-2 gap-4">

          <Input icon={UserCircleIcon} label="Nome completo / Nome fantasia" />
          <Input icon={IdentificationIcon} label="CPF / CNPJ" />
          <Input icon={PhoneIcon} label="Telefone" />
          <Input icon={MapPinIcon} label="Endereço" />

          <Input icon={EnvelopeIcon} label="Email" />
          <Input icon={EnvelopeIcon} label="Confirmar email" />

          {/* Senha */}
          <div>
            <label className="text-xs text-emerald-800">Senha</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-emerald-50 border border-emerald-300
                           pl-10 pr-12 py-2.5 text-sm
                           text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
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
              <span className={`h-1 w-full rounded ${strength >= 1 ? "bg-red-500" : "bg-emerald-200"}`} />
              <span className={`h-1 w-full rounded ${strength >= 2 ? "bg-amber-400" : "bg-emerald-200"}`} />
              <span className={`h-1 w-full rounded ${strength >= 3 ? "bg-emerald-500" : "bg-emerald-200"}`} />
            </div>
          </div>

          <Input icon={LockClosedIcon} label="Confirmar senha" />
        </div>

        {/* Termos */}
        <div className="mt-6 flex items-start gap-2 text-xs text-emerald-700">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
            className="mt-1 accent-emerald-600"
          />
          <p>
            Li e aceito os{" "}
            <span className="underline cursor-pointer">Termos de Uso</span>,{" "}
            <span className="underline cursor-pointer">Política de Privacidade</span>{" "}
            e{" "}
            <span className="underline cursor-pointer">Política de Cookies</span>.
          </p>
        </div>

        {/* Botão */}
        <button
          disabled={!acceptedTerms}
          className="w-full mt-6 rounded-xl bg-emerald-600 disabled:opacity-50 hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg"
        >
          Criar conta
        </button>

        <p className="mt-4 text-xs text-center text-emerald-700">
          Um email de confirmação será enviado após o cadastro.
        </p>
      </div>
    </div>
  );
}

/* INPUT PADRÃO — TEXTO PRETO */
function Input({ icon: Icon, label }: any) {
  return (
    <div>
      <label className="text-xs text-emerald-800">{label}</label>
      <div className="relative">
        <Icon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
        <input
          type="text"
          className="w-full rounded-xl bg-emerald-50 border border-emerald-300
                     pl-10 pr-4 py-2.5 text-sm
                     text-slate-900 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}
