import Button from "../components/Button";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Página não encontrada");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-6xl font-bold text-emerald-600 dark:text-emerald-400">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
        Página não encontrada
      </h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button to="/" className="mt-6">
        Voltar ao início
      </Button>
    </div>
  );
}
