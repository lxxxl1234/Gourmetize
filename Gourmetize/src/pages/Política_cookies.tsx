import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

export default function Política_cookies() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 sm:py-14 space-y-8">
      <ScrollReveal>
        <Link to="/" className="text-sm text-green-600 dark:text-green-400 hover:underline mb-4 inline-block">
         <strong> ← Voltar para a página inicial</strong>
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
          Política de Cookies
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Eles ajudam o site a lembrar de suas ações e preferências ao longo do tempo.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">2. Como utilizamos os Cookies</h2>
            <p>No Gourmetize, utilizamos cookies para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Funcionalidade:</strong> Lembrar suas preferências de tema (claro/escuro) e manter você logado.</li>
              <li><strong>Desempenho:</strong> Entender como os visitantes interagem com o site, ajudando-nos a melhorar a experiência.</li>
              <li><strong>Análise:</strong> Coletar dados anônimos para métricas de tráfego e uso da plataforma.</li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">3. Tipos de Cookies que Usamos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site.</li>
              <li><strong>Cookies de Preferência:</strong> Permitem que o site lembre de escolhas que você fez.</li>
              <li><strong>Cookies de Terceiros:</strong> Utilizados por serviços externos (como Google Analytics) para fins de análise.</li>
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <section>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">4. Como Gerenciar Cookies</h2>
            <p>
              Você pode controlar e/ou excluir cookies conforme desejar. A maioria dos navegadores permite que você recuse ou aceite cookies através de suas configurações de privacidade. Observe que, ao desativar cookies, algumas funcionalidades do Gourmetize podem não funcionar corretamente.
            </p>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}