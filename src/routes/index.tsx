import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Brain, Heart, Users, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import antonio from "@/assets/seu-antonio.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Conecta Vovô — Inclusão digital com carinho" },
      {
        name: "description",
        content: "Aprenda a usar o celular sem medo. Tutoriais simples, jogos e encontros online.",
      },
    ],
  }),
});

const cards = [
  {
    to: "/aprender" as const,
    title: "Aprender",
    desc: "Tutoriais bem explicadinhos do WhatsApp, vídeo-chamadas e mais.",
    Icon: BookOpen,
    color: "bg-primary/10 text-primary",
  },
  {
    to: "/mente" as const,
    title: "Exercitar a Mente",
    desc: "Jogos divertidos pra manter a cabeça afiada.",
    Icon: Brain,
    color: "bg-accent/30 text-accent-foreground",
  },
  {
    to: "/historias" as const,
    title: "Histórias de Superação",
    desc: "Inspire-se com quem já passou por aí.",
    Icon: Heart,
    color: "bg-warm text-warm-foreground",
  },
  {
    to: "/encontros" as const,
    title: "Nossos Encontros",
    desc: "Oficinas ao vivo pra aprender junto.",
    Icon: Users,
    color: "bg-success/15 text-success",
  },
];

function Home() {
  return (
    <PageShell showHomeButton={false}>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-primary font-bold text-lg mb-3">Bem-vindo(a) 💛</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            Tecnologia <span className="text-primary">sem complicação</span>, do seu jeito.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            Aqui no Conecta Vovô você aprende a usar o celular com calma, no seu ritmo. Sem
            pressa, sem palavra difícil — como um vizinho ajudando.
          </p>
          <Link
            to="/aprender"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl px-8 h-16 font-bold text-xl shadow-soft hover:scale-[1.02] active:scale-95 transition-transform"
          >
            Começar a aprender
            <ArrowRight className="h-6 w-6" aria-hidden />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-warm rounded-[2.5rem] rotate-3" aria-hidden />
          <div className="relative bg-card rounded-[2.5rem] p-6 shadow-card flex items-center gap-5">
            <img
              src={antonio}
              alt="Seu Antônio, nosso assistente sorrindo e acenando"
              width={768}
              height={768}
              className="h-40 w-40 sm:h-52 sm:w-52 object-contain"
            />
            <div>
              <p className="font-display text-2xl font-bold mb-2">Oi, sou o Seu Antônio!</p>
              <p className="text-lg text-muted-foreground">
                Tô aqui no cantinho da tela. Quando precisar, é só me chamar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">Por onde vamos começar?</h2>
        <p className="text-lg text-muted-foreground mb-8">Escolha um cartão abaixo. Pode clicar com calma.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {cards.map(({ to, title, desc, Icon, color }) => (
            <Link
              key={to}
              to={to}
              className="group bg-card rounded-3xl p-7 border-2 border-border hover:border-primary shadow-card hover:-translate-y-1 transition-all flex flex-col gap-4 min-h-[200px]"
            >
              <div className={`h-16 w-16 rounded-2xl grid place-items-center ${color}`}>
                <Icon className="h-8 w-8" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-1">{title}</h3>
                <p className="text-lg text-muted-foreground">{desc}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-primary font-bold text-lg">
                Entrar <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
