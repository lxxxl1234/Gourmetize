import { useEffect, useState } from "react";
import { ArrowUpRight, Home, Info, LogIn, Mail, Menu, UserPlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/imagens/logo.jpeg";

const links = [
  { label: "Início", to: "/", icon: Home },
  { label: "Sobre", to: "/#sobre", icon: Info },
  { label: "Contato", to: "/#contatos", icon: Mail },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => setHasScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div className="sticky top-3 z-40 mx-auto w-full max-w-7xl px-3 sm:top-4 sm:px-5">
      <nav aria-label="Navegação principal" className={`nav-glass ${hasScrolled ? "nav-glass-scrolled" : ""}`}>
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4">
          <Link to="/" onClick={closeMenu} className="group flex min-w-0 items-center gap-3" aria-label="Gourmetize — página inicial">
            <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-emerald-700/15 bg-white/80 shadow-sm transition duration-300 group-hover:-rotate-3 group-hover:scale-105 dark:border-white/10 dark:bg-slate-900/70">
              <img src={logo} alt="" className="h-8 w-8 rounded-lg object-cover" />
            </span>
            <span className="hidden text-lg font-semibold tracking-[-0.035em] text-slate-900 sm:block dark:text-white">Gourmetize</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const Icon = link.icon;
              return <Link key={link.to} to={link.to} onClick={closeMenu} className="nav-link"><Icon aria-hidden="true" size={15} />{link.label}</Link>;
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login" className="nav-login hidden sm:inline-flex"><LogIn aria-hidden="true" size={15} />Entrar</Link>
            <Link to="/registro" className="nav-cta hidden sm:inline-flex"><UserPlus aria-hidden="true" size={15} strokeWidth={2.25} />Criar conta<ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.25} /></Link>
            <button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((current) => !current)} className="nav-menu-button md:hidden">
              {open ? <X size={19} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden"><div className="mx-3 mb-3 grid gap-1 border-t border-slate-900/8 pt-2 dark:border-white/10">
            {links.map((link) => {
              const Icon = link.icon;
              return <Link key={link.to} to={link.to} onClick={closeMenu} className="nav-mobile-link"><span className="flex items-center gap-3"><Icon aria-hidden="true" size={16} />{link.label}</span><ArrowUpRight aria-hidden="true" size={16} /></Link>;
            })}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-900/8 pt-3 dark:border-white/10">
              <Link to="/login" onClick={closeMenu} className="nav-mobile-action nav-mobile-login"><LogIn aria-hidden="true" size={16} />Entrar</Link>
              <Link to="/registro" onClick={closeMenu} className="nav-mobile-action nav-mobile-create"><UserPlus aria-hidden="true" size={16} />Criar conta</Link>
            </div>
          </div></div>
        </div>
      </nav>
    </div>
  );
}
