import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, BookMarked, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/encontros")({
  component: Encontros,
  head: () => ({
    meta: [
      { title: "Nossos Encontros — Conecta Vovô" },
      { name: "description", content: "Participe das oficinas online ao vivo do Conecta Vovô." },
    ],
  }),
});

function Encontros() {
  const join = () =>
    confirm("Você quer se inscrever na próxima oficina?") &&
    alert("Pronto! Sua vaga está garantida. A gente te avisa por aqui 💛");

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Nossos Encontros</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Toda semana a gente se reúne online pra aprender junto, com calma e bom humor.
        </p>

        <article className="bg-card rounded-3xl p-8 border-2 border-primary shadow-card">
          <div className="inline-flex items-center gap-2 bg-success/15 text-success font-bold rounded-full px-4 py-2 mb-5">
            <Users className="h-5 w-5" aria-hidden />
            Próxima Oficina Online
          </div>
          <h2 className="font-display text-3xl font-bold mb-6">
            Como mandar fotos pela primeira vez no WhatsApp
          </h2>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <BookMarked className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Tema</p>
                <p className="text-lg text-muted-foreground">Enviando fotos e vídeos pelo WhatsApp</p>
              </div>
            </li>
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <Calendar className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Data</p>
                <p className="text-lg text-muted-foreground">Quinta-feira, 04 de junho</p>
              </div>
            </li>
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <Clock className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Horário</p>
                <p className="text-lg text-muted-foreground">15h às 16h30 (horário de Brasília)</p>
              </div>
            </li>
          </ul>

          <button
            onClick={join}
            className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-2xl h-20 font-bold text-2xl shadow-soft hover:scale-[1.01] active:scale-95 transition-transform"
          >
            Quero Participar
          </button>
          <p className="text-center text-muted-foreground mt-4">
            Sem complicação. A gente te liga pra te ajudar a entrar.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
