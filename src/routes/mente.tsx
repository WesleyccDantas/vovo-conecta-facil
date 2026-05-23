import { createFileRoute } from "@tanstack/react-router";
import { Brain, Puzzle, Play } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/mente")({
  component: Mente,
  head: () => ({
    meta: [
      { title: "Exercitar a Mente — Conecta Vovô" },
      { name: "description", content: "Jogos divertidos para manter a memória e o raciocínio em forma." },
    ],
  }),
});

const games = [
  {
    title: "Jogo da Memória",
    desc: "Vire os cartões e encontre os pares iguais. Bom pra memória e relaxante!",
    Icon: Brain,
  },
  {
    title: "Caça-Palavras",
    desc: "Encontre palavras escondidas no meio das letras. Um clássico que nunca cansa.",
    Icon: Puzzle,
  },
];

function Mente() {
  const play = (name: string) =>
    confirm(`Quer começar agora o jogo "${name}"?`) &&
    alert("Que ótimo! Em breve o jogo abre aqui pra você 💛");

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Exercitar a Mente</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Escolha um joguinho. Pode jogar sem pressa, é só pra se divertir.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {games.map((g) => (
            <article key={g.title} className="bg-card rounded-3xl p-7 border-2 border-border shadow-card flex flex-col gap-5">
              <div className="h-20 w-20 rounded-3xl bg-accent/30 text-accent-foreground grid place-items-center">
                <g.Icon className="h-10 w-10" aria-hidden />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">{g.title}</h2>
                <p className="text-lg text-muted-foreground">{g.desc}</p>
              </div>
              <button
                onClick={() => play(g.title)}
                className="mt-auto inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl h-16 font-bold text-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-transform"
              >
                <Play className="h-7 w-7" aria-hidden />
                Jogar
              </button>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
