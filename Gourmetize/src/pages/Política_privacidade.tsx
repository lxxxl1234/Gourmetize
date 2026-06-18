import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

export default function Política_privacidade() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-8">
      <ScrollReveal>
        <Link to="/" className="text-sm text-green-600 dark:text-green-400 hover:underline mb-4 inline-block">
          <strong> ← Voltar para a página inicial</strong>
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
          Política de Privacidade
        </h1>
      </ScrollReveal>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
        <ScrollReveal delay={100}>
          <p>
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">1. Introdução</h2>
            <p>
              No Gourmetize, levamos a sua privacidade a sério. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nosso site e serviços.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">2. Coleta de Informações</h2>
            <p>Coletamos informações que você nos fornece diretamente, como:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nome completo e endereço de e-mail (no cadastro).</li>
              <li>Preferências alimentares e histórico de avaliações.</li>
              <li>Dados de navegação e endereço IP (coletados automaticamente).</li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">3. Uso das Informações</h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fornecer e personalizar sua experiência no Gourmetize.</li>
              <li>Enviar comunicações relevantes sobre novidades e promoções (com seu consentimento).</li>
              <li>Melhorar a segurança e a funcionalidade da plataforma.</li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">4. Proteção de Dados</h2>
            <p>
              Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco através do e-mail: <strong>privacidade@gourmetize.com</strong>.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}