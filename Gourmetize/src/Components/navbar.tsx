import { useState } from "react";
import logo from "../assets/imagens/logo.jpeg";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white oswald text-xl font-semibold text-slate-900 dark:text-white">
          Gourmetize
       </h1>
        


        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-900 dark:text-white text-2xl focus:outline-none"
        >
          ☰
        </button>

        <ul className="hidden md:flex gap-8 text-slate-700 dark:text-slate-300 text-sm font-medium">
          <li className="hover:text-green-500 dark:hover:text-green-500 cursor-pointer">
            Página inicial
          </li>
          <li className="hover:text-green-500 dark:hover:text-green-500 cursor-pointer">
            Sobre
          </li>
          <li className="hover:text-green-500 dark:hover:text-green-500 cursor-pointer">
            Contatos
          </li>
        </ul>
      </div>

      {open && (
        <ul className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-4 py-4 space-y-3 text-slate-700 dark:text-slate-300 text-sm">
          <li className="py-2 border-b border-slate-100 dark:border-slate-800 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer">
            Página inicial
          </li>
          <li className="py-2 border-b border-slate-100 dark:border-slate-800 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer">
            Sobre
          </li>
          <li className="py-2 hover:text-amber-500 dark:hover:text-amber-400 cursor-pointer">
            Contatos
          </li>
        </ul>
      )}
    </nav>
    
  );
}