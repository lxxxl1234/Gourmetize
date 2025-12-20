import { useState } from "react";
import logo from "../assets/imagens/logo.jpeg";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Força da senha (visual)
  const strength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-emerald-50">

      {/* Fundo decorativo verde */}
      <div className="absolute inset-0 bg-linear-to-tr from-emerald-200/60 via-lime-100/40 to-teal-200/60" />
      <div className="absolute -top-32 -left-32 h-96 w-96 bg-emerald-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-lime-300/40 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-emerald-200 bg-white/90 backdrop-blur-xl shadow-2xl px-8 py-10">

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <button className="w-full mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold transition shadow-lg">
            Entrar
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4 text-xs text-emerald-700">
            <span className="hover:underline cursor-pointer">
              Esqueci a senha
            </span>
            <span className="hover:underline cursor-pointer">
              Criar conta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
