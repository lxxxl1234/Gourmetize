import { useEffect, useState, type ReactNode } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";  
import EscolhaCadastro from "./pages/EscolhaCadastro";
import RegisterConsumer from "./pages/Registro_Consumidor";
import RegistroProdutor from "./pages/Registro_produtor";
import TermsOfUse from "./pages/termos_de_uso";
import Política_cookies from "./pages/Política_cookies";
import Política_privacidade from "./pages/Política_privacidade";
import ScrollReveal from "./components/ScrollReveal";
import ScrollToTop from "./components/ScrollToTop";
import MouseGradient from "./components/MouseGradient";
import { ArrowRight, HeartHandshake, MapPin, PackageCheck } from "lucide-react";
import harvestHero from "./assets/imagens/gourmetize-harvest-hero.png";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
 
type Theme = "light" | "dark";

function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-20 sm:space-y-28">
      <ScrollReveal>
        <section id="inicio" className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div className="space-y-7 lg:py-8">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-300">Comida boa começa perto</p>
            <h1 className="font-gourmet-display max-w-xl text-5xl leading-[.96] tracking-[-.045em] text-emerald-950 sm:text-6xl lg:text-7xl dark:text-white">Da horta da sua região para a sua mesa.</h1>
            <p className="max-w-lg text-base leading-7 text-slate-600 dark:text-slate-300">Descubra alimentos frescos de pequenos produtores, acompanhe sua origem e fortaleça a economia local a cada pedido.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/registro" className="group inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(6,78,59,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-[0_14px_28px_rgba(6,78,59,.3)]">Criar minha conta <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/login" className="inline-flex items-center rounded-full border border-emerald-950/15 px-5 py-3 text-sm font-bold text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">Já tenho conta</Link>
            </div>
            <p className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Sem cartão, sem compromisso para começar.</p>
          </div>
          <figure className="relative overflow-hidden rounded-[2rem] bg-emerald-950 shadow-[0_28px_65px_rgba(20,58,42,.24)]">
            <img src={harvestHero} alt="Colheita fresca de um pequeno produtor local" className="aspect-[4/3] h-full w-full object-cover object-[62%_center]" />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/25 to-transparent px-6 pb-6 pt-14 text-sm font-medium text-white">Produtos colhidos no ritmo da estação.</figcaption>
          </figure>
        </section>
      </ScrollReveal>

      {/* COMO FUNCIONA */}
      <ScrollReveal delay={200}>
      <section id="sobre" className="scroll-mt-28 space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-300">Simples por natureza</p>
          <h2 className="font-gourmet-display text-4xl tracking-[-.035em] text-emerald-950 sm:text-5xl dark:text-white">Uma feira local que cabe na rotina.</h2>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300">Você escolhe o que precisa. Quem produz prepara com cuidado. A entrega aproxima bons ingredientes da sua casa.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-[1.25fr_.9fr_.9fr]">
          <FeatureCard icon={<MapPin size={23} />} step="01" title="Encontre perto de você" description="Veja produtores da sua região e escolha alimentos que respeitam o tempo da colheita." className="md:min-h-72" />
          <FeatureCard icon={<PackageCheck size={23} />} step="02" title="Peça com clareza" description="Monte sua compra e acompanhe cada etapa, da confirmação à entrega." />
          <FeatureCard icon={<HeartHandshake size={23} />} step="03" title="Faça parte da rede" description="Seu pedido remunera melhor quem cultiva e movimenta a comunidade." />
        </div>
      </section>
      </ScrollReveal>

      {/* RESTAURANTES EM DESTAQUE (COM EFEITO DE ZOOM NAS IMAGENS) */}
      <ScrollReveal delay={300}>
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-300">Da nossa rede</p>
          <h2 className="font-gourmet-display mt-2 text-4xl tracking-[-.035em] text-emerald-950 sm:text-5xl dark:text-white">Cada produto tem uma história.</h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* CARD 1 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* CONTAINER DA IMAGEM COM ZOOM */}
            <div className="overflow-hidden h-48 w-full relative">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80" 
                alt="Prato gourmet" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay escuro ao passar o mouse para destacar o texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Sítio Boa Terra</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.8
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Hortaliças e temperos cultivados em pequena escala, a poucos quilômetros da cidade.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                  Agricultura familiar
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Colheita da semana
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden h-48 w-full relative">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" 
                alt="Pizza artesanal" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Forno do Vale</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.9
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pães de fermentação natural feitos com farinha local e receitas de família.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  Artesanal
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Feito no dia
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="overflow-hidden h-48 w-full relative">
              <img 
                src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80" 
                alt="Sobremesa gourmet" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Casa do Mel</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.7
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Mel puro, cafés e conservas que carregam a paisagem de onde vieram.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
                  Origem rastreável
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Produção local
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* PARA QUEM É */}
      <ScrollReveal delay={400}>
      <section className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-700 dark:text-emerald-300">Uma rede, muitos jeitos de participar</p>
        <h2 className="font-gourmet-display text-4xl tracking-[-.035em] text-emerald-950 sm:text-5xl dark:text-white">Para quem acredita no valor da origem.</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <TagCard
            title="Para quem compra"
            text="Quer comida de verdade, escolhas mais conscientes e uma relação direta com a origem."
          />
          <TagCard
            title="Para quem produz"
            text="Busca novos caminhos para vender, organizar pedidos e ser reconhecido pelo próprio trabalho."
          />
          <TagCard
            title="Para quem transforma"
            text="Restaurantes e cozinhas que querem ingredientes próximos, justos e cheios de sabor."
          />
        </div>
      </section>
      </ScrollReveal>

      {/* CTA FINAL */}
      <ScrollReveal delay={600}>
      <section id="contatos" className="scroll-mt-28 rounded-[2rem] bg-emerald-950 px-7 py-9 text-white shadow-[0_22px_50px_rgba(20,58,42,.18)] sm:px-10 sm:py-11 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-gourmet-display text-3xl tracking-[-.025em]">Comece pela sua região.</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-emerald-100/80">Crie sua conta para descobrir produtores, organizar pedidos ou trazer seu trabalho para mais perto das pessoas.</p>
        </div>
        <Link to="/registro" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-50">Quero participar <ArrowRight size={16} /></Link>
      </section>
      </ScrollReveal>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Carrega preferência salva ou do sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme: Theme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }
  }, []);

  // Atualiza HTML + localStorage sempre que o tema mudar
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 transition-colors duration-300 relative">
      {/* Fundo animado que segue o mouse */}
      <MouseGradient />

      {!isDashboard && <Navbar />}

      {/* ROTEAMENTO */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<EscolhaCadastro />} />
        <Route path="/registro-consumidor" element={<RegisterConsumer />} />
        <Route path="/termos" element={<TermsOfUse />} />
        <Route path="/privacidade" element={<Política_privacidade />} />
        <Route path="/cookies" element={<Política_cookies />} />
        <Route path="/registro-produtor" element={<RegistroProdutor />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Botão flutuante para voltar ao topo */}
      {!isDashboard && <ScrollToTop />}

      {/* FOOTER */}
 {!isDashboard && <footer className="border-t border-slate-200/70 dark:border-slate-800/80 mt-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
    <span>© {new Date().getFullYear()} Gourmetize. Todos os direitos reservados.</span>
    <span className="flex gap-3">
      <Link to="/termos" className="hover:underline">Termos de uso</Link>
      <Link to="/privacidade" className="hover:underline">Política de Privacidade</Link>
      <Link to="/cookies" className="hover:underline">Política de Cookies</Link>
    </span>
  </div>
</footer>
}
    </div>
  );
}

// =============================================
// COMPONENTES AUXILIARES (CARDS DA HOME)
// =============================================

type FeatureCardProps = {
  icon: ReactNode;
  step: string;
  title: string;
  description: string;
  className?: string;
};

function FeatureCard({ icon, step, title, description, className = "" }: FeatureCardProps) {
  return (
    <div className={`group rounded-[1.5rem] border border-emerald-950/10 bg-white/70 p-6 shadow-[0_12px_28px_rgba(20,58,42,.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(20,58,42,.12)] dark:border-white/10 dark:bg-slate-900/70 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 transition-transform duration-300 group-hover:scale-105 dark:bg-emerald-400/15 dark:text-emerald-300">{icon}</div>
        <span className="text-xs font-bold tracking-[.14em] text-emerald-800/55 dark:text-emerald-200/50">{step}</span>
      </div>
      <h3 className="mt-9 text-lg font-bold text-emerald-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

type TagCardProps = {
  title: string;
  text: string;
};

function TagCard({ title, text }: TagCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-emerald-950/10 bg-white/60 p-5 dark:border-white/10 dark:bg-slate-900/60">
      <div className="mb-5 h-px w-8 bg-emerald-600" />
      <h3 className="text-base font-bold text-emerald-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

export default App;
