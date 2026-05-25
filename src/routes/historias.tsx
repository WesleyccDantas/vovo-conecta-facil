import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Send, Quote, X, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SpeakButton } from "@/components/SpeakButton";

export const Route = createFileRoute("/historias")({
  component: Historias,
  head: () => ({
    meta: [
      { title: "Histórias de Superação — Conecta Vovô" },
      { name: "description", content: "Depoimentos de idosos que aprenderam a usar o celular e ganharam novas conexões." },
    ],
  }),
});

type Story = { name: string; age?: string; text: string; avatar: string; bg: string };

const baseStories: Story[] = [
  {
    name: "Dona Maria, 72 anos",
    text: "Aprendi a fazer chamada de vídeo e agora vejo meus netos todo domingo. Parece pouco, mas pra mim mudou tudo.",
    avatar: "👵🏼",
    bg: "bg-warm",
  },
  {
    name: "Seu João, 78 anos",
    text: "Tinha medo de mexer no celular. Hoje mando mensagem no WhatsApp e até figurinha! É bom demais.",
    avatar: "👴🏽",
    bg: "bg-accent/30",
  },
  {
    name: "Dona Lúcia, 69 anos",
    text: "Descobri o YouTube e agora assisto receitas todo dia. Já fiz bolo de fubá pra vizinhança inteira!",
    avatar: "👵🏿",
    bg: "bg-primary/10",
  },
];

const STORAGE_KEY = "conecta-vovo:historias";

function Historias() {
  const [stories, setStories] = useState<Story[]>(baseStories);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", text: "" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Story[];
        setStories([...saved, ...baseStories]);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const story: Story = {
      name: form.age ? `${form.name}, ${form.age} anos` : form.name,
      text: form.text,
      avatar: "💛",
      bg: "bg-success/15",
    };
    const updated = [story, ...stories];
    setStories(updated);
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      localStorage.setItem(STORAGE_KEY, JSON.stringify([story, ...existing]));
    } catch {
      /* ignore */
    }
    setSent(true);
    setForm({ name: "", age: "", text: "" });
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 200);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Histórias de Superação</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Olha só quem já passou por onde você está passando. Você não está sozinho(a).
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <article key={`${s.name}-${i}`} className={`${s.bg} rounded-3xl p-7 shadow-card flex flex-col gap-4 animate-fade-in`}>
              <div className="h-20 w-20 rounded-full bg-card grid place-items-center text-5xl shadow-soft" aria-hidden>
                {s.avatar}
              </div>
              <Quote className="h-8 w-8 text-primary" aria-hidden />
              <p className="text-xl leading-relaxed">{s.text}</p>
              <p className="font-display text-xl font-bold mt-auto">{s.name}</p>
              <SpeakButton text={`${s.name}. ${s.text}`} label="Ouvir história" className="self-start" />
            </article>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-3xl p-8 border-2 border-border text-center shadow-card">
          <h2 className="font-display text-3xl font-bold mb-3">Sua história também inspira!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Conte pra gente como a tecnologia mudou seu dia a dia. Vamos adorar ouvir.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-8 h-16 font-bold text-xl shadow-soft hover:scale-[1.02] active:scale-95 transition-transform"
          >
            <Send className="h-6 w-6" aria-hidden />
            Enviar minha História
          </button>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 flex items-end sm:items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-card rounded-3xl w-full max-w-xl shadow-card overflow-hidden flex flex-col max-h-[90vh] animate-fade-in"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Enviar minha história"
          >
            <div className="bg-primary text-primary-foreground p-5 flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold">Conte sua história 💛</h3>
              <button
                onClick={close}
                aria-label="Fechar"
                className="h-11 w-11 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/25 grid place-items-center"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <div className="h-20 w-20 mx-auto rounded-full bg-success/20 text-success grid place-items-center mb-4">
                  <Check className="h-10 w-10" aria-hidden />
                </div>
                <p className="font-display text-2xl font-bold mb-2">Obrigado por compartilhar!</p>
                <p className="text-lg text-muted-foreground mb-6">
                  Sua história pode inspirar outras pessoas 💛
                </p>
                <button
                  onClick={close}
                  className="bg-primary text-primary-foreground rounded-2xl px-6 h-14 font-bold text-lg"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="p-6 space-y-5 overflow-y-auto">
                <div>
                  <label htmlFor="hist-name" className="block text-lg font-bold mb-2">
                    Seu nome
                  </label>
                  <input
                    id="hist-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full h-14 px-4 rounded-2xl border-2 border-border bg-background text-lg focus:outline-none focus:border-primary"
                    placeholder="Por exemplo: Dona Maria"
                  />
                </div>
                <div>
                  <label htmlFor="hist-age" className="block text-lg font-bold mb-2">
                    Sua idade
                  </label>
                  <input
                    id="hist-age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    inputMode="numeric"
                    className="w-full h-14 px-4 rounded-2xl border-2 border-border bg-background text-lg focus:outline-none focus:border-primary"
                    placeholder="Por exemplo: 70"
                  />
                </div>
                <div>
                  <label htmlFor="hist-text" className="block text-lg font-bold mb-2">
                    Sua história
                  </label>
                  <textarea
                    id="hist-text"
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    required
                    rows={5}
                    className="w-full p-4 rounded-2xl border-2 border-border bg-background text-lg focus:outline-none focus:border-primary resize-none"
                    placeholder="Conte com suas palavras..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl h-16 font-bold text-xl shadow-soft hover:scale-[1.01] active:scale-95 transition-transform"
                >
                  <Send className="h-6 w-6" aria-hidden />
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </PageShell>
  );
}
