import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { ReactNode } from "react";
import { AccessibilityBar } from "./AccessibilityBar";
import { SeuAntonioChat } from "./SeuAntonioChat";

export function PageShell({
  children,
  showHomeButton = true,
}: {
  children: ReactNode;
  showHomeButton?: boolean;
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <AccessibilityBar />
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Conecta Vovô — Início">
            <span className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-display text-2xl font-bold shadow-soft">
              C
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold">
              Conecta <span className="text-primary">Vovô</span>
            </span>
          </Link>
          {showHomeButton && (
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors rounded-2xl px-5 h-14 font-bold text-lg"
            >
              <Home className="h-6 w-6" aria-hidden />
              Voltar para o Início
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {showHomeButton && (
        <div className="sm:hidden p-4 sticky bottom-24 z-30">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-card border-2 border-primary text-primary rounded-2xl px-5 h-14 font-bold text-lg shadow-card"
          >
            <Home className="h-6 w-6" aria-hidden />
            Voltar para o Início
          </Link>
        </div>
      )}

      <footer className="border-t border-border bg-card py-6 mt-12">
        <p className="text-center text-muted-foreground">
          Feito com carinho para você 💛 — Conecta Vovô
        </p>
      </footer>

      <SeuAntonioChat />
    </div>
  );
}
