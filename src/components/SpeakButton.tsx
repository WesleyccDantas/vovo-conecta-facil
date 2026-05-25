import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";

type Props = {
  text: string | (() => string);
  label?: string;
  className?: string;
};

let activeId = 0;

export function SpeakButton({ text, label = "Ouvir Texto", className = "" }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [id] = useState(() => ++activeId);

  useEffect(() => {
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  const handle = () => {
    if (!supported) {
      alert("Seu navegador não tem leitura em voz alta. Tente o Google Chrome 💛");
      return;
    }
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const value = typeof text === "function" ? text() : text;
    if (!value.trim()) return;
    const u = new SpeechSynthesisUtterance(value);
    u.lang = "pt-BR";
    u.rate = 0.85; // voz mais lenta e clara
    u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(u);
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={speaking}
      aria-label={speaking ? "Parar leitura em voz alta" : `${label} em voz alta`}
      data-speak-id={id}
      className={
        "inline-flex items-center gap-2 rounded-2xl px-5 h-14 font-bold text-lg shadow-sm border-2 transition-colors " +
        (speaking
          ? "bg-destructive text-destructive-foreground border-destructive"
          : "bg-card hover:bg-warm border-primary text-primary") +
        " " +
        className
      }
    >
      {speaking ? <Square className="h-6 w-6" aria-hidden /> : <Volume2 className="h-6 w-6" aria-hidden />}
      {speaking ? "Parar leitura" : `🔊 ${label}`}
    </button>
  );
}
