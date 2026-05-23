import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Video, ShieldAlert, Youtube, ChevronRight, ArrowLeft, Search, Mic } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/aprender")({
  component: Aprender,
  head: () => ({
    meta: [
      { title: "Aprender — Conecta Vovô" },
      { name: "description", content: "Tutoriais simples para WhatsApp, vídeo-chamadas, identificar golpes e usar o YouTube." },
    ],
  }),
});

type Topic = {
  id: string;
  title: string;
  Icon: typeof MessageCircle;
  steps?: { Icon: typeof Search; title: string; desc: string }[];
};

const topics: Topic[] = [
  {
    id: "whatsapp",
    title: "Como usar o WhatsApp",
    Icon: MessageCircle,
    steps: [
      { Icon: Search, title: "Encontre o ícone verde", desc: "Procure no celular um quadradinho verde com um balão de conversa branco. Esse é o WhatsApp." },
      { Icon: MessageCircle, title: "Abra a conversa", desc: "Toque no nome da pessoa com quem quer falar. Vai abrir uma tela com as mensagens." },
      { Icon: Mic, title: "Segure o microfone para falar", desc: "No canto direito tem um microfone. Aperte e segure com o dedo enquanto fala. Quando soltar, sua mensagem é enviada." },
    ],
  },
  { id: "video", title: "Como fazer chamada de vídeo", Icon: Video },
  { id: "golpes", title: "Como identificar golpes", Icon: ShieldAlert },
  { id: "youtube", title: "Como usar o YouTube", Icon: Youtube },
];

function Aprender() {
  const [open, setOpen] = useState<string | null>(null);
  const current = topics.find((t) => t.id === open);

  if (current && current.steps) {
    return (
      <PageShell>
        <section className="mx-auto max-w-3xl px-4 py-10">
          <button
            onClick={() => setOpen(null)}
            className="inline-flex items-center gap-2 mb-6 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-5 h-14 font-bold text-lg"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden />
            Voltar para a lista
          </button>
          <h1 className="font-display text-4xl font-bold mb-2">{current.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">Vamos passo a passo, com calma.</p>
          <ol className="space-y-5">
            {current.steps.map((s, i) => (
              <li key={i} className="bg-card rounded-3xl p-6 border-2 border-border shadow-card flex gap-5 items-start">
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-display text-3xl font-bold">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <s.Icon className="h-7 w-7 text-primary" aria-hidden />
                    <h2 className="font-display text-2xl font-bold">{s.title}</h2>
                  </div>
                  <p className="text-lg leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Aprender</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Escolha o que você quer aprender hoje. Toque em um dos botões abaixo.
        </p>
        <div className="space-y-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => (t.steps ? setOpen(t.id) : alert("Em breve! Seu Antônio está preparando esse tutorial 💛"))}
              className="w-full bg-card hover:bg-warm border-2 border-border hover:border-primary rounded-3xl p-6 flex items-center gap-5 text-left shadow-card transition-all hover:-translate-y-0.5"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <t.Icon className="h-8 w-8" aria-hidden />
              </div>
              <span className="flex-1 font-display text-2xl font-bold">{t.title}</span>
              <ChevronRight className="h-7 w-7 text-primary shrink-0" aria-hidden />
            </button>
          ))}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-10 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-5 h-14 font-bold text-lg"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden />
          Voltar para o Início
        </Link>
      </section>
    </PageShell>
  );
}
