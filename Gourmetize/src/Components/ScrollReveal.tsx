import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // Atraso em milissegundos (opcional)
}

/**
 * Componente que anima o surgimento dos elementos conforme o usuário rola a página.
 * Utiliza IntersectionObserver para detectar quando o elemento entra na viewport.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // O IntersectionObserver "vigia" quando o elemento entra na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Pequeno delay para dar um efeito cascata se houver vários elementos
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target); // Para de observar depois que apareceu
        }
      },
      { threshold: 0.1 } // Dispara quando 10% do elemento estiver visível
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Limpeza: para de observar quando o componente é desmontado
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible 
          ? "opacity-100 translate-y-0" // Estado final: visível e na posição original
          : "opacity-0 translate-y-10"   // Estado inicial: invisível e 40px mais para baixo
      } ${className}`}
    >
      {children}
    </div>
  );
}
