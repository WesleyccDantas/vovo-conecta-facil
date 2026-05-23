import { Type, Contrast, Minus, Plus } from "lucide-react";
import { useA11y } from "@/lib/accessibility";

export function AccessibilityBar() {
  const { fontScale, setFontScale, highContrast, toggleContrast } = useA11y();

  const dec = () => setFontScale(Math.max(0.9, +(fontScale - 0.1).toFixed(2)));
  const inc = () => setFontScale(Math.min(1.5, +(fontScale + 0.1).toFixed(2)));

  return (
    <div
      className="w-full bg-warm/60 border-b border-border"
      role="region"
      aria-label="Opções de acessibilidade"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center justify-end gap-3">
        <div className="flex items-center gap-2 bg-card rounded-2xl px-3 py-2 shadow-sm">
          <Type aria-hidden className="h-5 w-5 text-warm-foreground" />
          <span className="text-base font-semibold">Tamanho da letra</span>
          <button
            onClick={dec}
            aria-label="Diminuir tamanho da letra"
            className="ml-2 h-11 w-11 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center font-bold"
          >
            <Minus className="h-5 w-5" />
          </button>
          <button
            onClick={inc}
            aria-label="Aumentar tamanho da letra"
            className="h-11 w-11 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center font-bold"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={toggleContrast}
          aria-pressed={highContrast}
          className="flex items-center gap-2 bg-card rounded-2xl px-4 h-12 shadow-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Contrast aria-hidden className="h-5 w-5" />
          {highContrast ? "Contraste normal" : "Alto contraste"}
        </button>
      </div>
    </div>
  );
}
