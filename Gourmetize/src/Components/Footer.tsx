import { Link } from "react-router-dom";
import logo from "../assets/imagens/logo.jpeg";

const linkClass =
  "transition hover:text-emerald-600 dark:hover:text-emerald-400";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="mt-16 scroll-mt-24 border-t border-slate-200/70 bg-slate-50/80 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/80"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        {/* Marca */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Gourmetize"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              Gourmetize
            </span>
          </div>
          <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Da agricultura familiar direto para a sua mesa. Uma economia local
            mais justa e sustentável.
          </p>
          <a
            href="mailto:contato@gourmetize.com"
            className="inline-block text-sm font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            contato@gourmetize.com
          </a>
        </div>

        {/* Navegação */}
        <nav aria-label="Links do rodapé" className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><Link to="/" className={linkClass}>Início</Link></li>
            <li><Link to="/#sobre" className={linkClass}>Sobre</Link></li>
            <li><Link to="/login" className={linkClass}>Entrar</Link></li>
            <li><Link to="/registro" className={linkClass}>Criar conta</Link></li>
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Links legais" className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><Link to="/termos" className={linkClass}>Termos de Uso</Link></li>
            <li><Link to="/privacidade" className={linkClass}>Política de Privacidade</Link></li>
            <li><Link to="/cookies" className={linkClass}>Política de Cookies</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200/70 py-4 dark:border-slate-800/80">
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          © {year} Gourmetize. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
