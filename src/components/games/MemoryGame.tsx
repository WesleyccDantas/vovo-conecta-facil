import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Trophy } from "lucide-react";

const SYMBOLS = ["🌻", "🐶", "🍎", "☕", "🌈", "🎵", "🚲", "🏡"];

type Card = { id: number; symbol: string; matched: boolean };

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(pairs: number): Card[] {
  const chosen = SYMBOLS.slice(0, pairs);
  const deck = shuffle([...chosen, ...chosen]).map((symbol, id) => ({
    id,
    symbol,
    matched: false,
  }));
  return deck;
}

export function MemoryGame({ onExit }: { onExit: () => void }) {
  const pairs = 6;
  const [deck, setDeck] = useState<Card[]>(() => buildDeck(pairs));
  const [open, setOpen] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const allMatched = useMemo(() => deck.every((c) => c.matched), [deck]);

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const ca = deck.find((c) => c.id === a)!;
    const cb = deck.find((c) => c.id === b)!;
    setMoves((m) => m + 1);
    if (ca.symbol === cb.symbol) {
      setTimeout(() => {
        setDeck((d) => d.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)));
        setOpen([]);
      }, 450);
    } else {
      setTimeout(() => setOpen([]), 900);
    }
  }, [open, deck]);

  const flip = (id: number) => {
    if (open.length === 2) return;
    if (open.includes(id)) return;
    if (deck.find((c) => c.id === id)?.matched) return;
    setOpen((o) => [...o, id]);
  };

  const reset = () => {
    setDeck(buildDeck(pairs));
    setOpen([]);
    setMoves(0);
  };

  return (
    <div className="bg-card rounded-3xl p-6 border-2 border-border shadow-card">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-3xl font-bold">Jogo da Memória</h2>
        <div className="flex items-center gap-3">
          <span className="bg-warm rounded-2xl px-4 py-2 text-lg font-bold">Jogadas: {moves}</span>
          <button
            onClick={onExit}
            className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-4 h-12 font-bold"
          >
            Sair
          </button>
        </div>
      </div>

      {allMatched ? (
        <div className="bg-success/15 border-2 border-success/30 rounded-3xl p-8 text-center animate-fade-in">
          <Trophy className="h-16 w-16 text-success mx-auto mb-3" aria-hidden />
          <p className="font-display text-3xl font-bold mb-2">Você conseguiu! 🎉</p>
          <p className="text-lg text-muted-foreground mb-6">
            Terminou em {moves} jogadas. Sua memória está afiadíssima!
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-8 h-16 font-bold text-xl shadow-soft"
          >
            <RotateCcw className="h-6 w-6" aria-hidden />
            Jogar Novamente
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {deck.map((c) => {
            const shown = open.includes(c.id) || c.matched;
            return (
              <button
                key={c.id}
                onClick={() => flip(c.id)}
                aria-label={shown ? `Carta ${c.symbol}` : "Carta virada"}
                className={`aspect-square rounded-3xl text-5xl sm:text-6xl font-bold grid place-items-center transition-all border-4 ${
                  shown
                    ? c.matched
                      ? "bg-success/20 border-success scale-95"
                      : "bg-warm border-primary"
                    : "bg-primary text-primary-foreground border-primary hover:scale-[1.03] active:scale-95"
                }`}
              >
                {shown ? c.symbol : "?"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
