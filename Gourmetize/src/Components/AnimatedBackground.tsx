export default function AnimatedBackground() {
  return (
    // fixed inset-0: Fixa o fundo na tela inteira
    // -z-10: Garante que fique ATRÁS de todo o conteúdo (navbar, textos, etc.)
    // pointer-events-none: Garante que o fundo não bloqueie cliques nos botões da página
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      {/* Orbe 1: Verde Esmeralda (Canto superior esquerdo) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-3xl animate-float-slow" />
      
      {/* Orbe 2: Verde Azulado/Teal (Canto inferior direito) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-teal-400/20 dark:bg-teal-600/20 rounded-full blur-3xl animate-float-medium" />
      
      {/* Orbe 3: Âmbar suave (Centro-direita, para manter a identidade "Gourmet") */}
      <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-amber-300/15 dark:bg-amber-500/15 rounded-full blur-3xl animate-float-fast" />

      {/* Textura de ruído sutil (opcional, dá um acabamento profissional "fosco") */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}