import { Link } from "react-router-dom";
import logo from "../assets/imagens/logo.jpeg";
import { UserCircleIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import ScrollReveal from "../components/ScrollReveal";

export default function EscolhaCadastro() {
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

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
              Bem-vindo a Gourmetize!
            </h1>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Como você deseja usar nossa plataforma?
            </p>
          </div>

          {/* Cards de Escolha */}
          <div className="grid sm:grid-cols-2 gap-4">
            
            {/* Opção Consumidor */}
            <Link 
              to="/registro-consumidor"
              className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-500 bg-emerald-50/50 dark:bg-slate-800/50 hover:bg-emerald-100/70 dark:hover:bg-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-200 dark:bg-emerald-900/50 flex items-center justify-center group-hover:bg-emerald-300 dark:group-hover:bg-emerald-800/60 transition-colors">
                  <UserCircleIcon className="h-10 w-10 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    Sou Consumidor
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Quero descobrir produtos orgânicos e apoiar a agricultura familiar
                  </p>
                </div>
              </div>
            </Link>

            {/* Opção Produtor */}
            <Link 
              to="/registro-produtor"
              className="group relative overflow-hidden rounded-2xl border-2 border-emerald-200 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-500 bg-emerald-50/50 dark:bg-slate-800/50 hover:bg-emerald-100/70 dark:hover:bg-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-200 dark:bg-emerald-900/50 flex items-center justify-center group-hover:bg-emerald-300 dark:group-hover:bg-emerald-800/60 transition-colors">
                  <BuildingStorefrontIcon className="h-10 w-10 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    Sou Produtor
                  </h3>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Quero cadastrar meu estabelecimento e vender meus produtos
                  </p>
                </div>
              </div>
            </Link>

          </div>

          {/* Link para Login */}
          <p className="text-center text-sm text-emerald-700 dark:text-emerald-300 mt-8">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200 underline transition">
              Faça login aqui
            </Link>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}