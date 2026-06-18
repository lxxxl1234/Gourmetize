interface Word {
  text: string;
  className?: string;
}

interface AnimatedHeadingProps {
  text?: string;
  words?: Word[];
  className?: string;
}

export default function AnimatedHeading({ text, words, className = "" }: AnimatedHeadingProps) {
  // Se 'words' for fornecido, usa ele. Caso contrário, divide a 'text' por espaços.
  const wordArray: Word[] = words 
    ? words 
    : text ? text.split(" ").map(w => ({ text: w })) : [];

  return (
    // Usamos h1 ou h2 dependendo do que for passado, mas aqui vamos forçar h1 para o Hero
    <h1 className={`flex flex-wrap gap-x-3 gap-y-1 ${className}`}>
      {wordArray.map((wordObj, index) => (
        <span
          key={index}
          className={`inline-block animate-reveal-word ${wordObj.className || ""}`}
          // O delay aumenta 0.05s para cada palavra, criando o efeito cascata
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {wordObj.text}
        </span>
      ))}
    </h1>
  );
}
