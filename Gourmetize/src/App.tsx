import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import AnimatedHeading from "./components/AnimatedHeading";
 
type Theme = "light" | "dark";

function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:py-14 space-y-16">
      {/* HERO */}
      <ScrollReveal>
      <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
        {/* Texto */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500 px-3 py-1 text-xs font-medium text-slate-950 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/30">
            🍲 Novo • Plataforma Gourmetize
          </span>

          <AnimatedHeading 
            words={[
              { text: "Organize" },
              { text: "seus" },
              { text: "pedidos," },
              { text: "cardápios" },
              { text: "e" },
              { text: "clientes" },
              { text: "em", className: "text-green-500 dark:text-amber-300" },
              { text: "um", className: "text-green-500 dark:text-amber-300" },
              { text: "só", className: "text-green-500 dark:text-amber-300" },
              { text: "lugar.", className: "text-green-500 dark:text-amber-300" }
            ]}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-slate-900 dark:text-slate-50"
          />

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            O projeto Gourmetize é a ponte tecnológica que conecta a Agricultura Familiar diretamente à sua mesa. Nossa missão é clara: garantir o consumo de produtos frescos e sazonais, reduzir o desperdício alimentar na cadeia de distribuição e construir uma economia local mais justa e sustentável.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/registro" className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-amber-400 dark:text-slate-900 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition shadow-sm">
              Criar conta
            </Link>

            <Link to="/login" className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-5 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Já tenho conta
            </Link>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              • Não precisa cartão de crédito para testar
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Disponível 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Painel em tempo real</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <span>Pronto para API</span>z
            </div>
          </div>
        </div>

        {/* Card de destaque / “preview” */}
        <div className="relative">
          <div className="absolute -inset-4 bg-linear-to-tr from-amber-400/10 via-rose-500/10 to-sky-500/10 blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative rounded-3xl border border-white/20 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Visão geral do dia
              </span>
              <span className="text-[10px] rounded-full bg-emerald-500/10 text-emerald-500 px-2 py-0.5">
                Online
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-3">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Pedidos hoje
                </span>
                <p className="mt-1 text-xl font-semibold">32</p>
                <p className="text-[10px] text-emerald-500 mt-1">
                  ▲ +12% vs ontem
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-3">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Ticket médio
                </span>
                <p className="mt-1 text-xl font-semibold">R$ 78</p>
                <p className="text-[10px] text-slate-500 mt-1">
                  / por cliente
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-3">
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Avaliação
                </span>
                <p className="mt-1 text-xl font-semibold flex items-center gap-1">
                  ⭐ 4.8
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  + 210 reviews
                </p>
              </div>
            </div>

            <div className="mt-3 border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Próximos horários
              </p>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/80 px-3 py-2">
                  <span>Reserva • 19:30</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    4 pessoas
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/80 px-3 py-2">
                  <span>Delivery • em preparo</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Pedido #1243
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* COMO FUNCIONA */}
      <ScrollReveal delay={200}>
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Como o Gourmetize funciona?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
          A ideia é simples: você conecta sua cozinha ao mundo digital.
          Depois, será possível plugar sua API para controlar tudo de forma
          automatizada — do cardápio ao histórico de clientes.
        </p>

        <div className=" grid gap-4 sm:grid-cols-3">
          <FeatureCard
            icon="📋"
            title="Cadastre seu cardápio"
            description="Organize pratos, categorias, preços e disponibilidade em poucos cliques."
             
          />
          <FeatureCard
            icon="🧾"
            title="Receba pedidos"
            description="Visualize pedidos em tempo real, com status claros para a equipe."
          />
          <FeatureCard
            icon="📊"
            title="Acompanhe resultados"
            description="Analise vendas, ticket médio e pratos mais pedidos em um painel único."
          
          />
        </div>
      </section>
      </ScrollReveal>

      {/* RESTAURANTES EM DESTAQUE (COM EFEITO DE ZOOM NAS IMAGENS) */}
      <ScrollReveal delay={300}>
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Negocios que amamos
            </h2>
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Sabor & Arte</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.8
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Cozinha contemporânea com ingredientes locais e frescos.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                  Saudável
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Fácil 
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Forno a Lenha</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.9
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pizzas artesanais com massa de fermentação natural de 48h.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  Italiana
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Delivery
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Doce Encanto</h3>
                <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                  ★ 4.7
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sobremesas exclusivas e café especial de origem única.
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
                  Cafeteria
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                  Brunch
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
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Para quem o Gourmetize foi pensado?
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <TagCard
            title="Restaurantes e bistrôs"
            text="Precisa de organização sem perder o toque artesanal."
          />
          <TagCard
            title="Cozinhas pequenas"
            text="Dark kitchens, food trucks e chefs independentes."
          />
          <TagCard
            title="Projetos pessoais"
            text="Ideal para testar sua API ou MVP de delivery próprio."
          />
        </div>
      </section>
      </ScrollReveal>

      {/* CTA FINAL */}
      <ScrollReveal delay={600}>
      <section className="rounded-3xl border border-dashed border-slate-400/60 bg-green-300/50 dark:bg-amber-400/10 dark:border-amber-400/40 backdrop-blur-md px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-amber-200">
            Pronto para receber seus primeiros usuários?
          </p>
          <p className="text-xs sm:text-sm text-slate-900/80 dark:text-amber-100/80 mt-1 max-w-md">
            Use essa página como porta de entrada do seu projeto. Mais tarde,
            você pode conectar sua API, implementar login e criar o painel
            interno do Gourmetize.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-amber-400 dark:text-slate-900 px-5 py-2.5 text-xs sm:text-sm font-medium hover:opacity-90 transition shadow-sm">
          Começar configuração
        </button>
      </section>
      </ScrollReveal>
    </main>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>("light");

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

      <Navbar />

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
      </Routes>

      {/* Botão flutuante para voltar ao topo */}
      <ScrollToTop />

      {/* FOOTER */}
 <footer className="border-t border-slate-200/70 dark:border-slate-800/80 mt-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
    <span>© {new Date().getFullYear()} Gourmetize. Todos os direitos reservados.</span>
    <span className="flex gap-3">
      <Link to="/termos" className="hover:underline">Termos de uso</Link>
      <Link to="/privacidade" className="hover:underline">Política de Privacidade</Link>
      <Link to="/cookies" className="hover:underline">Política de Cookies</Link>
    </span>
  </div>
</footer>
    </div>
  );
}

// =============================================
// COMPONENTES AUXILIARES (CARDS DA HOME)
// =============================================

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-4 space-y-2 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

type TagCardProps = {
  title: string;
  text: string;
};

function TagCard({ title, text }: TagCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-4 space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

export default App;
