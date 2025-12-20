import { useEffect, useState } from "react";
import Navbar from "./components/navbar";

type Theme = "light" | "dark";

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
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-950 transition-colors duration-300">
      <Navbar />

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-14 space-y-16">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          {/* Texto */}
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500 px-3 py-1 text-xs font-medium text-slate-950 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/30">
              🍲 Novo • Plataforma Gourmetize
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Organize seus pedidos, cardápios e clientes
              <span className="block   text-green-500 dark:text-amber-300">
                em um só lugar.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              O projeto Gourmetize é a ponte tecnológica que conecta a Agricultura Familiar diretamente à sua mesa. Nossa missão é clara: garantir o consumo de produtos frescos e sazonais, reduzir o desperdício alimentar na cadeia de distribuição e construir uma economia local mais justa e sustentável.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-amber-400 dark:text-slate-900 px-5 py-2.5 text-sm font-medium hover:opacity-90 transition shadow-sm">
                Criar conta
              </button>

              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-600 px-5 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                Já tenho conta
              </button>

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
            <div className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xl p-4 sm:p-5 space-y-4">
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

        {/* COMO FUNCIONA */}
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

        {/* PARA QUEM É */}
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

        {/* CTA FINAL */}
        <section className="rounded-3xl border border-dashed border-slate-400/60 bg-green-300  dark:bg-amber-400/10 dark:border-amber-400/40 px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/70 dark:border-slate-800/80 mt-6">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>© {new Date().getFullYear()} Gourmetize. Todos os direitos reservados.</span>
          <span className="flex gap-3">
            <button className="hover:underline">Termos de uso</button>
            <button className="hover:underline">Privacidade</button>
          </span>
        </div>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 p-4 space-y-2 shadow-sm">
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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70 p-4 space-y-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

export default App;

