import { useState } from "react";
import { MessageCircleHeart, X, Send } from "lucide-react";
import antonio from "@/assets/seu-antonio.png";

type Msg = { from: "antonio" | "me"; text: string };

const initial: Msg[] = [
  {
    from: "antonio",
    text:
      "Opa, tudo bom por aí? Meu nome é Antônio, mas pode me chamar de Seu Antônio! Eu também demorei para pegar o jeito desse tal de celular, mas vi que não é nenhum bicho de sete cabeças. Onde você quer que eu te ajude hoje?",
  },
];

export function SeuAntonioChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    const reply = text;
    setText("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          from: "antonio",
          text: `Que bom que você perguntou sobre "${reply}". Logo logo vou poder te ajudar com isso direitinho. Por enquanto, dá uma olhadinha na página Aprender — tem tudo bem explicado lá! 💛`,
        },
      ]);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir conversa com Seu Antônio"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-primary text-primary-foreground rounded-full pl-3 pr-5 py-3 shadow-soft hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="h-12 w-12 rounded-full bg-card overflow-hidden ring-4 ring-primary-foreground/30">
          <img src={antonio} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="font-bold text-lg hidden sm:inline">Seu Antônio</span>
        <MessageCircleHeart className="h-6 w-6" aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-end sm:items-center justify-center p-4" onClick={() => setOpen(false)}>
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
                onClick={() => setOpen(false)}
                aria-label="Fechar conversa"
                className="h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 flex items-center justify-center"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-warm/30">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl p-4 text-lg leading-relaxed ${
                    m.from === "antonio"
                      ? "bg-card text-card-foreground rounded-bl-sm"
                      : "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border flex gap-2 bg-card">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Escreva sua pergunta..."
                aria-label="Sua mensagem"
                className="flex-1 h-14 px-4 rounded-2xl border-2 border-border bg-background text-lg focus:outline-none focus:border-primary"
              />
              <button
                onClick={send}
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
