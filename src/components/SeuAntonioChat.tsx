import { useEffect, useRef, useState } from "react";
import { MessageCircleHeart, X, Send, Volume2 } from "lucide-react";
import antonio from "@/assets/seu-antonio.png";

type Msg = { from: "antonio" | "me"; text: string };

const initial: Msg[] = [
  {
    from: "antonio",
    text:
      "Opa, tudo bom por aí? Meu nome é Antônio, mas pode me chamar de Seu Antônio! Eu também demorei pra pegar o jeito desse tal de celular, mas vi que não é nenhum bicho de sete cabeças. Onde você quer que eu te ajude hoje?",
  },
];

const suggestions = [
  "O que é Wi-Fi?",
  "Como fazer uma ligação?",
  "O que é um golpe?",
  "Como aumentar a letra do celular?",
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function reply(question: string): string {
  const q = normalize(question);

  if (q.includes("wi-fi") || q.includes("wifi") || q.includes("internet")) {
    return "Wi-Fi é a internet sem fio que entra no seu celular. Sabe quando o sinal chega na sua casa pelo aparelhinho do provedor? O Wi-Fi é isso. Pra conectar, vai em Ajustes, toca em Wi-Fi, escolhe o nome da sua rede e coloca a senha. Pronto, tá navegando! 💛";
  }
  if (q.includes("ligacao") || q.includes("ligar") || q.includes("telefone") || q.includes("chamada")) {
    return "Pra fazer uma ligação é fácil: procure o ícone do telefone verde no seu celular. Toque nele, depois no teclado de números. Disque o número com DDD e aperte o botão verde de chamada. Calma, sem pressa, vamos juntos!";
  }
  if (q.includes("golpe") || q.includes("fraude") || q.includes("roubo")) {
    return "Golpe é quando uma pessoa má tenta te enganar pra te roubar. Os mais comuns são: 'sou seu neto, mudei de número' e 'precisa atualizar sua conta do banco'. Regra de ouro: nunca passe senha, código ou dinheiro sem antes ligar pra família. Na dúvida, desliga e respira fundo 💛";
  }
  if (q.includes("letra") || q.includes("fonte") || q.includes("aumentar") || q.includes("maior")) {
    return "Aqui no Conecta Vovô tem botão pra isso lá em cima da página! Procura 'Tamanho da letra' e toca no mais (+) até ficar do tamanho confortável pros seus olhos. No celular também dá pra fazer isso nas configurações, em 'Tela' ou 'Acessibilidade'.";
  }
  if (q.includes("whatsapp") || q.includes("zap") || q.includes("mensagem")) {
    return "WhatsApp é aquele aplicativo verde com balãozinho branco. Serve pra mandar mensagem, áudio, foto e vídeo pros seus queridos, de graça. Lá na página 'Aprender' tem um passo a passo bem caprichado pra você!";
  }
  if (q.includes("video") || q.includes("vídeo") || q.includes("chamada de video")) {
    return "Chamada de vídeo é quando você vê o rosto da pessoa enquanto conversa, igual quando o neto liga. Abra a conversa da pessoa no WhatsApp e toque no desenho da câmera lá em cima. Tem tutorial completinho na página Aprender 💛";
  }
  if (q.includes("youtube")) {
    return "YouTube é aquele aplicativo vermelho com triangulinho branco. Tem vídeo de tudo: receita, música, novela antiga, missa. Toque na lupa pra pesquisar o que quer ver. Manda ver!";
  }
  if (q.includes("ola") || q.includes("oi") || q.includes("bom dia") || q.includes("boa tarde") || q.includes("boa noite")) {
    return "Oi, que bom te ver por aqui! Tô às ordens. Pode perguntar sem vergonha — não tem pergunta boba, viu?";
  }
  if (q.includes("obrigad")) {
    return "Imagina, que isso! Tô aqui pra isso mesmo. Volta sempre que precisar 💛";
  }

  return "Que pergunta boa! Ainda tô aprendendo a responder isso direitinho. Enquanto isso, dá uma olhadinha na página 'Aprender' — tem tutorial bem mastigado. E pode me chamar de novo quando quiser 💛";
}

export function SeuAntonioChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  // ESC fecha o chat + foco gerenciado
  useEffect(() => {
    if (!open) {
      try { window.speechSynthesis?.cancel(); } catch { /* ignore */ }
      openerRef.current?.focus();
      return;
    }
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const speak = (value: string) => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(value);
    u.lang = "pt-BR";
    u.rate = 0.85;
    synth.speak(u);
  };

  const ask = (question: string) => {
    if (!question.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: question }]);
    setText("");
    setTimeout(() => {
      const answer = reply(question);
      setMsgs((m) => [...m, { from: "antonio", text: answer }]);
    }, 600);
  };

  return (
    <>
      <button
        ref={openerRef}
        onClick={() => setOpen(true)}
        aria-label="Abrir conversa com Seu Antônio, seu assistente"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-primary text-primary-foreground rounded-full pl-3 pr-5 py-3 shadow-soft hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="h-12 w-12 rounded-full bg-card overflow-hidden ring-4 ring-primary-foreground/30">
          <img src={antonio} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="font-bold text-lg hidden sm:inline">Seu Antônio</span>
        <MessageCircleHeart className="h-6 w-6" aria-hidden />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 flex items-end sm:items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-card rounded-3xl w-full max-w-lg shadow-card overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Conversa com Seu Antônio"
          >
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-card overflow-hidden">
                <img src={antonio} alt="Avatar do Seu Antônio" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-xl font-bold leading-tight">Seu Antônio</p>
                <p className="text-sm opacity-90">Aqui pra te ajudar 💬</p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => setOpen(false)}
                aria-label="Fechar conversa (atalho: tecla Esc)"
                className="h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-warm/30" aria-live="polite" aria-atomic="false">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl p-4 text-lg leading-relaxed animate-fade-in ${
                    m.from === "antonio"
                      ? "bg-card text-card-foreground rounded-bl-sm"
                      : "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.from === "antonio" && (
                    <button
                      type="button"
                      onClick={() => speak(m.text)}
                      aria-label="Ouvir esta resposta do Seu Antônio em voz alta"
                      className="mt-2 inline-flex items-center gap-2 bg-warm hover:bg-accent hover:text-accent-foreground rounded-xl px-3 py-2 text-base font-bold border-2 border-primary text-primary"
                    >
                      <Volume2 className="h-5 w-5" aria-hidden /> 🔊 Ouvir
                    </button>
                  )}
                </div>
              ))}
              {msgs.length > 0 && msgs[msgs.length - 1].from === "antonio" && (
                <div className="pt-4 animate-fade-in">
                  <p className="text-lg font-bold text-primary mb-3">Posso ajudar em mais alguma coisa? Escolha uma opção abaixo. 💛</p>
                  <div className="flex flex-wrap gap-3">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="bg-card border-2 border-border hover:border-primary hover:bg-warm rounded-2xl px-5 py-3 text-lg font-bold shadow-soft"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-border flex gap-2 bg-card">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask(text)}
                placeholder="Escreva sua pergunta..."
                aria-label="Sua mensagem"
                className="flex-1 h-14 px-4 rounded-2xl border-2 border-border bg-background text-lg focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => ask(text)}
                aria-label="Enviar mensagem"
                className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
              >
                <Send className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
