import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, BookMarked, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { SpeakButton } from "@/components/SpeakButton";
import { EventCalendar } from "@/components/EventCalendar";

export const Route = createFileRoute("/encontros")({
  component: Encontros,
  head: () => ({
    meta: [
      { title: "Nossos Encontros — Conecta Vovô" },
      { name: "description", content: "Participe das oficinas online ao vivo do Conecta Vovô." },
    ],
  }),
});

const NEXT_EVENT_DATE = new Date(new Date().getFullYear(), 5, 10); // 10 de Junho

const events = [
  { date: NEXT_EVENT_DATE, title: "Como não cair em golpes digitais — 14h" },
];

function Encontros() {
  const join = () => {
    const ok = confirm(
      "Você quer se inscrever na oficina 'Como não cair em golpes digitais' no dia 10 de junho às 14h?",
    );
    if (ok) {
      alert("Pronto! Sua vaga está garantida. A gente te avisa por aqui 💛 Pode ficar tranquilo(a).");
    }
  };

  const fullText = () =>
    "Nossos Encontros. Próxima Oficina Online: Como não cair em golpes digitais. Data: 10 de Junho. Horário: 14 horas. Toque no botão Quero Participar para se inscrever.";

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">Nossos Encontros</h1>
          <SpeakButton text={fullText} label="Ouvir esta página" />
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          Toda semana a gente se reúne online pra aprender junto, com calma e bom humor.
        </p>

        <article className="bg-card rounded-3xl p-8 border-2 border-primary shadow-card mb-8">
          <div className="inline-flex items-center gap-2 bg-success/15 text-success font-bold rounded-full px-4 py-2 mb-5">
            <Users className="h-5 w-5" aria-hidden />
            Próxima Oficina Online
          </div>
          <h2 className="font-display text-3xl font-bold mb-6">
            Como não cair em golpes digitais
          </h2>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <BookMarked className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Tema</p>
                <p className="text-lg text-muted-foreground">
                  Como reconhecer e evitar golpes pelo WhatsApp, telefone e mensagem
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <Calendar className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Data</p>
                <p className="text-lg text-muted-foreground">10 de Junho</p>
              </div>
            </li>
            <li className="flex items-center gap-4 bg-warm/50 rounded-2xl p-4">
              <Clock className="h-7 w-7 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-bold text-lg">Horário</p>
                <p className="text-lg text-muted-foreground">14h (horário de Brasília)</p>
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

        <h2 className="font-display text-3xl font-bold mb-4">Calendário dos Encontros</h2>
        <p className="text-lg text-muted-foreground mb-5">
          Os dias destacados em <span className="font-bold text-primary">azul</span> têm oficina. Toque no dia pra ver o tema.
        </p>
        <EventCalendar events={events} initialMonth={NEXT_EVENT_DATE} />
      </section>
    </PageShell>
  );
}
