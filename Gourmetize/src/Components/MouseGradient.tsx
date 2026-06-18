import { useEffect, useState } from "react";

export default function MouseGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      {/* 1. Cor de base do site (Claro: cinza muito claro / Escuro: quase preto) */}
      <div className="fixed inset-0 -z-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-500" />
      
      {/* 2. O "Spotlight" Verde que segue o mouse */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-300"
        style={{
          // Gradiente radial verde esmeralda suave centrado nas coordenadas do mouse
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15), transparent 50%)`
        }}
      />
      
      {/* 3. Textura de grade (grid) sutil para dar um ar "tech" e premium */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </>
  );
}
