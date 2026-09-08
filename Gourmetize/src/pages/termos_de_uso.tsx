import ScrollReveal from "../components/ScrollReveal";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <ScrollReveal>
        <Link to="/" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline mb-4 inline-block">
          <strong> ← Voltar para a página inicial</strong>
        </Link> 
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Termos de Uso
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Ao acessar e usar o serviço "Gourmetize", você concorda com os seguintes termos:
        </p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          1. Aceitação dos Termos
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ao usar este site, você concorda com os termos e condições aqui descritos. Caso não concorde, por favor, não utilize nossos serviços.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          2. Uso do Serviço
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          O serviço "Gourmetize" é uma plataforma de organização de pedidos e cardápios para restaurantes e cozinhas. Você é responsável por usar o serviço de acordo com a legislação vigente.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          3. Política de Privacidade
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Para mais informações sobre como tratamos seus dados pessoais, consulte nossa Política de Privacidade.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          4. Alterações nos Termos
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Podemos alterar estes termos a qualquer momento, sendo que a versão mais atualizada será publicada nesta página.
        </p>
      </ScrollReveal>

      {/* Adicionar mais seções conforme necessário */}
    </div>
  );
};

export default TermsOfUse;
