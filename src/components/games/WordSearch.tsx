import { useMemo, useState } from "react";
import { RotateCcw, Trophy, Check } from "lucide-react";

// Banco de palavras familiares e acessíveis para idosos
const WORD_BANK = [
  "CASA", "AMIGO", "NETO", "FAMILIA", "JARDIM",
  "FLORES", "CAFE", "LIVRO", "PRAIA", "MUSICA",
  "SAUDE", "PASSEIO", "IGREJA", "ALEGRIA", "VIAGEM",
  "CARINHO", "SOL", "CHUVA", "GATO", "CACHORRO",
];

const SIZE = 8;

function pickWords(count: number): string[] {
  const pool = [...WORD_BANK];
  const result: string[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return result;
}

type Cell = { letter: string; row: number; col: number };

function makeGrid(words: string[]): { grid: Cell[][]; placements: Record<string, Cell[]> } {
  const grid: Cell[][] = Array.from({ length: SIZE }, (_, r) =>
    Array.from({ length: SIZE }, (_, c) => ({ letter: "", row: r, col: c })),
  );
  const placements: Record<string, Cell[]> = {};

  for (const word of words) {
    const candidates: { row: number; start: number }[] = [];
    for (let r = 0; r < SIZE; r++) {
      const maxStart = SIZE - word.length;
      if (maxStart < 0) continue;
      for (let s = 0; s <= maxStart; s++) {
        candidates.push({ row: r, start: s });
      }
    }
    // Embaralhar candidatos
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    let placed = false;
    for (const { row, start } of candidates) {
      const cells: Cell[] = [];
      let overlapOk = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[row][start + i];
        if (cell.letter && cell.letter !== word[i]) {
          overlapOk = false;
          break;
        }
        cells.push(cell);
      }
      if (overlapOk) {
        cells.forEach((cell, i) => (cell.letter = word[i]));
        placements[word] = cells;
        placed = true;
        break;
      }
    }
    if (!placed) {
      console.warn(`Não foi possível colocar a palavra: ${word}`);
    }
  }

  // Preencher células vazias
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const row of grid) {
    for (const cell of row) {
      if (!cell.letter) cell.letter = letters[Math.floor(Math.random() * letters.length)];
    }
  }
  return { grid, placements };
}

export function WordSearch({ onExit }: { onExit: () => void }) {
  const [gameWords, setGameWords] = useState<string[]>(() => pickWords(5));
  const [{ grid, placements }, setBoard] = useState(() => makeGrid(gameWords));
  const [selected, setSelected] = useState<Cell[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const allFound = found.size === gameWords.length;

  const reset = () => {
    const nextWords = pickWords(5);
    setGameWords(nextWords);
    setBoard(makeGrid(nextWords));
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
      const sorted = [...next].sort((a, b) => a.col - b.col);
      const word = sorted.map((c) => c.letter).join("");
      const sameRow = sorted.every((c) => c.row === sorted[0]?.row);
      if (sameRow && gameWords.includes(word) && !found.has(word)) {
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
            {found.size} / {gameWords.length}
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
          <p className="text-lg text-muted-foreground mb-2">
            Que orgulho! Você encontrou {found.size} palavras.
          </p>
          <p className="text-base text-muted-foreground mb-6">
            Uma nova rodada com palavras diferentes vai começar agora.
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
            {gameWords.map((w) => (
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
