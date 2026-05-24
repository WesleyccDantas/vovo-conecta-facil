import { useMemo, useState } from "react";
import { RotateCcw, Trophy, Check } from "lucide-react";

// Simple word search: a grid with words placed horizontally.
// User taps letters to select a word; if it matches one of the target words, it's found.

const WORDS = ["AMOR", "NETO", "CAFE", "SOL", "LAR"];
const SIZE = 8;

type Cell = { letter: string; row: number; col: number };

function makeGrid(): { grid: Cell[][]; placements: Record<string, Cell[]> } {
  const grid: Cell[][] = Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) => ({ letter: "", row: r, col: c })),
  );
  const placements: Record<string, Cell[]> = {};
  const usedRows = new Set<number>();

  for (const word of WORDS) {
    let placed = false;
    for (let attempt = 0; attempt < 50 && !placed; attempt++) {
      const row = Math.floor(Math.random() * SIZE);
      if (usedRows.has(row)) continue;
      const maxStart = SIZE - word.length;
      if (maxStart < 0) continue;
      const start = Math.floor(Math.random() * (maxStart + 1));
      const cells: Cell[] = [];
      for (let i = 0; i < word.length; i++) {
        cells.push(grid[row][start + i]);
      }
      cells.forEach((cell, i) => (cell.letter = word[i]));
      placements[word] = cells;
      usedRows.add(row);
      placed = true;
    }
  }

  // Fill empty cells
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.letter) cell.letter = letters[Math.floor(Math.random() * letters.length)];
    }
  }
  return { grid, placements };
}

export function WordSearch({ onExit }: { onExit: () => void }) {
  const [{ grid, placements }, setBoard] = useState(() => makeGrid());
  const [selected, setSelected] = useState<Cell[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const allFound = found.size === WORDS.length;

  const reset = () => {
    setBoard(makeGrid());
    setSelected([]);
    setFound(new Set());
  };

  const toggle = (cell: Cell) => {
    if (allFound) return;
    setSelected((prev) => {
      const exists = prev.find((c) => c.row === cell.row && c.col === cell.col);
      const next = exists
        ? prev.filter((c) => !(c.row === cell.row && c.col === cell.col))
        : [...prev, cell];
      // sort by column for matching
      const sorted = [...next].sort((a, b) => a.col - b.col);
      const word = sorted.map((c) => c.letter).join("");
      const sameRow = sorted.every((c) => c.row === sorted[0]?.row);
      if (sameRow && WORDS.includes(word) && !found.has(word)) {
        setFound((f) => new Set(f).add(word));
        return [];
      }
      return next;
    });
  };

  const isSelected = (cell: Cell) =>
    selected.some((c) => c.row === cell.row && c.col === cell.col);
  const isFound = useMemo(() => {
    const cells = new Set<string>();
    for (const word of found) {
      placements[word]?.forEach((c) => cells.add(`${c.row}-${c.col}`));
    }
    return cells;
  }, [found, placements]);

  return (
    <div className="bg-card rounded-3xl p-6 border-2 border-border shadow-card">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-3xl font-bold">Caça-Palavras</h2>
        <div className="flex items-center gap-3">
          <span className="bg-warm rounded-2xl px-4 py-2 text-lg font-bold">
            {found.size} / {WORDS.length}
          </span>
          <button
            onClick={onExit}
            className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-4 h-12 font-bold"
          >
            Sair
          </button>
        </div>
      </div>

      <p className="text-lg text-muted-foreground mb-4">
        Toque nas letras de uma palavra (na mesma linha) pra marcar. Sem pressa!
      </p>

      {allFound ? (
        <div className="bg-success/15 border-2 border-success/30 rounded-3xl p-8 text-center animate-fade-in">
          <Trophy className="h-16 w-16 text-success mx-auto mb-3" aria-hidden />
          <p className="font-display text-3xl font-bold mb-2">Você achou todas! 🎉</p>
          <p className="text-lg text-muted-foreground mb-6">
            Que orgulho! Sua atenção tá em dia.
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
        <>
          <div className="grid gap-1.5 mb-5" style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0,1fr))` }}>
            {grid.flat().map((cell) => {
              const sel = isSelected(cell);
              const done = isFound.has(`${cell.row}-${cell.col}`);
              return (
                <button
                  key={`${cell.row}-${cell.col}`}
                  onClick={() => toggle(cell)}
                  aria-label={`Letra ${cell.letter}`}
                  className={`aspect-square rounded-xl font-bold text-xl sm:text-2xl grid place-items-center border-2 transition-all ${
                    done
                      ? "bg-success/25 border-success text-success-foreground"
                      : sel
                        ? "bg-primary text-primary-foreground border-primary scale-95"
                        : "bg-warm/50 border-border hover:border-primary"
                  }`}
                >
                  {cell.letter}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {WORDS.map((w) => (
              <span
                key={w}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 h-12 font-bold text-lg border-2 ${
                  found.has(w)
                    ? "bg-success/15 border-success text-success line-through"
                    : "bg-card border-border"
                }`}
              >
                {found.has(w) && <Check className="h-5 w-5" aria-hidden />}
                {w}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
