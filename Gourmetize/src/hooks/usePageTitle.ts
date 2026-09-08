import { useEffect } from "react";

/**
 * Atualiza o título da aba do navegador por página.
 * Uso: usePageTitle("Entrar") → "Entrar · Gourmetize"
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} · Gourmetize`
      : "Gourmetize — Da agricultura familiar à sua mesa";
  }, [title]);
}
