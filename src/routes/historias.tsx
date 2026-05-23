import { createFileRoute } from "@tanstack/react-router";
import { Send, Quote } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/historias")({
  component: Historias,
  head: () => ({
    meta: [
      { title: "Histórias de Superação — Conecta Vovô" },
      { name: "description", content: "Depoimentos de idosos que aprenderam a usar o celular e ganharam novas conexões." },
    ],
  }),
});

const stories = [
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

function Historias() {
  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Histórias de Superação</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Olha só quem já passou por onde você está passando. Você não está sozinho(a).
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <article key={s.name} className={`${s.bg} rounded-3xl p-7 shadow-card flex flex-col gap-4`}>
              <div className="h-20 w-20 rounded-full bg-card grid place-items-center text-5xl shadow-soft">
                {s.avatar}
              </div>
              <Quote className="h-8 w-8 text-primary" aria-hidden />
              <p className="text-xl leading-relaxed">{s.text}</p>
              <p className="font-display text-xl font-bold mt-auto">{s.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-3xl p-8 border-2 border-border text-center shadow-card">
          <h2 className="font-display text-3xl font-bold mb-3">Sua história também inspira!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Conte pra gente como a tecnologia mudou seu dia a dia. Vamos adorar ouvir.
          </p>
          <button
            onClick={() => alert("Que bom! Em breve abriremos o envio de histórias 💛")}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-8 h-16 font-bold text-xl shadow-soft hover:scale-[1.02] active:scale-95 transition-transform"
          >
            <Send className="h-6 w-6" aria-hidden />
            Enviar minha História
          </button>
        </div>
      </section>
    </PageShell>
  );
}
