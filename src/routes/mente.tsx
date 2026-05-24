import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Puzzle, Play, ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { MemoryGame } from "@/components/games/MemoryGame";
import { WordSearch } from "@/components/games/WordSearch";

export const Route = createFileRoute("/mente")({
  component: Mente,
  head: () => ({
    meta: [
      { title: "Exercitar a Mente — Conecta Vovô" },
      { name: "description", content: "Jogos divertidos para manter a memória e o raciocínio em forma." },
    ],
  }),
});

type GameId = "memoria" | "caca";

const games: { id: GameId; title: string; desc: string; Icon: typeof Brain }[] = [
  {
    id: "memoria",
    title: "Jogo da Memória",
    desc: "Vire os cartões e encontre os pares iguais. Bom pra memória e relaxante!",
    Icon: Brain,
  },
  {
    id: "caca",
    title: "Caça-Palavras",
    desc: "Encontre palavras escondidas no meio das letras. Um clássico que nunca cansa.",
    Icon: Puzzle,
  },
];

function Mente() {
  const [playing, setPlaying] = useState<GameId | null>(null);

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-4 py-10">
        {playing ? (
          <div className="animate-fade-in">
            <button
              onClick={() => setPlaying(null)}
              className="inline-flex items-center gap-2 mb-6 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-5 h-14 font-bold text-lg"
            >
              <ArrowLeft className="h-6 w-6" aria-hidden />
              Voltar para os jogos
            </button>
            {playing === "memoria" && <MemoryGame onExit={() => setPlaying(null)} />}
            {playing === "caca" && <WordSearch onExit={() => setPlaying(null)} />}
          </div>
        ) : (
          <>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Exercitar a Mente</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Escolha um joguinho. Pode jogar sem pressa, é só pra se divertir.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {games.map((g) => (
                <article
                  key={g.id}
                  className="bg-card rounded-3xl p-7 border-2 border-border shadow-card flex flex-col gap-5"
                >
                  <div className="h-20 w-20 rounded-3xl bg-accent/30 text-accent-foreground grid place-items-center">
                    <g.Icon className="h-10 w-10" aria-hidden />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold mb-2">{g.title}</h2>
                    <p className="text-lg text-muted-foreground">{g.desc}</p>
                  </div>
                  <button
                    onClick={() => setPlaying(g.id)}
                    className="mt-auto inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl h-16 font-bold text-2xl shadow-soft hover:scale-[1.02] active:scale-95 transition-transform"
                  >
                    <Play className="h-7 w-7" aria-hidden />
                    Jogar
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}
