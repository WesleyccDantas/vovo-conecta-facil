import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export type CalendarEvent = {
  date: Date;
  title: string;
};

type Props = {
  events: CalendarEvent[];
  initialMonth?: Date;
};

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function EventCalendar({ events, initialMonth }: Props) {
  const today = new Date();
  const start = initialMonth ?? (events[0]?.date ?? today);
  const [view, setView] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(events[0]?.date ?? null);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const eventOn = (d: Date) => events.find((e) => sameDay(e.date, d));
  const selectedEvent = selected ? eventOn(selected) : undefined;

  const go = (delta: number) => setView(new Date(year, month + delta, 1));

  return (
    <section
      aria-label="Calendário de encontros"
      className="bg-card rounded-3xl p-6 sm:p-8 border-2 border-border shadow-card"
    >
      <header className="flex items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Mês anterior"
          className="h-12 w-12 rounded-2xl bg-secondary hover:bg-accent hover:text-accent-foreground grid place-items-center"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <h3 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-primary" aria-hidden />
          {MONTHS[month]} de {year}
        </h3>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Próximo mês"
          className="h-12 w-12 rounded-2xl bg-secondary hover:bg-accent hover:text-accent-foreground grid place-items-center"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </header>

      <div
        role="grid"
        aria-label={`Dias de ${MONTHS[month]} de ${year}`}
        className="grid grid-cols-7 gap-1 sm:gap-2"
      >
        {WEEKDAYS.map((w) => (
          <div
            key={w}
            role="columnheader"
            className="text-center font-bold text-base text-muted-foreground py-2"
          >
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} aria-hidden />;
          const ev = eventOn(d);
          const isToday = sameDay(d, today);
          const isSelected = selected && sameDay(d, selected);
          return (
            <button
              key={i}
              role="gridcell"
              type="button"
              onClick={() => setSelected(d)}
              aria-label={
                ev
                  ? `${d.getDate()} de ${MONTHS[month]} — ${ev.title}`
                  : `${d.getDate()} de ${MONTHS[month]}`
              }
              aria-pressed={!!isSelected}
              className={[
                "relative aspect-square min-h-12 sm:min-h-14 rounded-2xl font-bold text-lg sm:text-xl transition-all border-2",
                ev
                  ? "bg-primary text-primary-foreground border-primary shadow-soft hover:scale-105"
                  : "bg-warm/40 text-foreground border-transparent hover:border-primary",
                isSelected ? "ring-4 ring-accent ring-offset-2 ring-offset-card" : "",
                isToday && !ev ? "border-primary" : "",
              ].join(" ")}
            >
              {d.getDate()}
              {ev && (
                <span
                  aria-hidden
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary-foreground"
                />
              )}
            </button>
          );
        })}
      </div>

      {selectedEvent ? (
        <div
          aria-live="polite"
          className="mt-6 rounded-2xl bg-success/15 text-success-foreground border-2 border-success/40 p-5"
        >
          <p className="font-bold text-lg text-success">
            Tem encontro no dia {selectedEvent.date.getDate()} de {MONTHS[selectedEvent.date.getMonth()]} 💛
          </p>
          <p className="text-lg mt-1">{selectedEvent.title}</p>
        </div>
      ) : (
        <p className="mt-6 text-muted-foreground text-lg" aria-live="polite">
          Toque em um dia destacado para ver o encontro.
        </p>
      )}
    </section>
  );
}
