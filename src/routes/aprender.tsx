import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  Video,
  ShieldAlert,
  Youtube,
  ChevronRight,
  ArrowLeft,
  Search,
  Mic,
  PhoneCall,
  UserCircle2,
  PhoneOff,
  AlertTriangle,
  Lock,
  XCircle,
  Play,
  ThumbsUp,
  Heart,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/aprender")({
  component: Aprender,
  head: () => ({
    meta: [
      { title: "Aprender — Conecta Vovô" },
      {
        name: "description",
        content:
          "Tutoriais simples para WhatsApp, vídeo-chamadas, identificar golpes e usar o YouTube.",
      },
    ],
  }),
});

type Step = { Icon: typeof Search; title: string; desc: string; tip?: string };
type Topic = {
  id: string;
  title: string;
  Icon: typeof MessageCircle;
  intro: string;
  steps: Step[];
};

const topics: Topic[] = [
  {
    id: "whatsapp",
    title: "Como usar o WhatsApp",
    Icon: MessageCircle,
    intro: "Vamos aprender a mandar mensagem pros seus queridos. Calma, é mais fácil do que parece 💛",
    steps: [
      {
        Icon: Search,
        title: "Encontre o ícone verde",
        desc: "Procure no celular um quadradinho verde com um balão de conversa branco. Esse é o WhatsApp.",
      },
      {
        Icon: MessageCircle,
        title: "Abra a conversa",
        desc: "Toque no nome da pessoa com quem quer falar. Vai abrir uma tela com as mensagens.",
      },
      {
        Icon: Mic,
        title: "Segure o microfone para falar",
        desc: "No canto direito tem um microfone. Aperte e segure com o dedo enquanto fala. Quando soltar, sua mensagem é enviada.",
        tip: "Se errar, sem problema — é só apertar de novo e gravar outra.",
      },
    ],
  },
  {
    id: "video",
    title: "Como fazer chamada de vídeo",
    Icon: Video,
    intro: "Vamos ver o rostinho de quem você ama! Olha que delícia, em poucos toques você já consegue.",
    steps: [
      {
        Icon: UserCircle2,
        title: "Abra a conversa da pessoa",
        desc: "No WhatsApp, toque no nome da pessoa que você quer ver. Pode ser um filho, neto ou amigo.",
      },
      {
        Icon: Video,
        title: "Toque na câmera lá em cima",
        desc: "No alto da tela, do lado direito, tem o desenho de uma câmera. É só dar um toquinho nela.",
        tip: "Seu Antônio diz: calma, vamos juntos! Procure com o olhar antes de tocar 💛",
      },
      {
        Icon: PhoneCall,
        title: "Espere a pessoa atender",
        desc: "Vai começar a chamar. Quando a pessoa atender, o rostinho dela aparece na tela. Pode falar normal, como se estivesse perto.",
      },
      {
        Icon: PhoneOff,
        title: "Para desligar, toque no vermelho",
        desc: "Quando quiser encerrar, é só tocar no botão vermelho redondo embaixo da tela. Pronto, chamada encerrada.",
      },
    ],
  },
  {
    id: "golpes",
    title: "Como identificar golpes",
    Icon: ShieldAlert,
    intro: "Aqui a gente vai aprender a se proteger. Pode ficar tranquilo(a): com essas dicas, você não cai em armadilha.",
    steps: [
      {
        Icon: AlertTriangle,
        title: "Desconfie de pressa e urgência",
        desc: "Golpista adora apressar. Se mandarem mensagem dizendo 'é urgente, deposita agora', PARE. Respira fundo.",
      },
      {
        Icon: MessageCircle,
        title: "Número estranho pedindo dinheiro?",
        desc: "Se chegar mensagem de um número que você não conhece dizendo 'sou seu neto, mudei de número', NÃO mande nada. Ligue pro número antigo do neto pra confirmar.",
        tip: "Seu Antônio diz: na dúvida, ligue pra família antes de fazer qualquer coisa 💛",
      },
      {
        Icon: Lock,
        title: "Nunca passe senha nem código",
        desc: "Banco nunca pede senha por telefone ou WhatsApp. Código que chegou no seu celular é SÓ SEU. Nem pra 'funcionário do banco' você passa.",
      },
      {
        Icon: XCircle,
        title: "Não clique em links suspeitos",
        desc: "Se chegar um link prometendo prêmio, Pix de graça ou desconto incrível — não toque. Apague a mensagem e siga em frente.",
      },
    ],
  },
  {
    id: "youtube",
    title: "Como usar o YouTube",
    Icon: Youtube,
    intro: "No YouTube tem vídeo de tudo: receita, música antiga, novela, missa, exercício. Vou te mostrar como achar.",
    steps: [
      {
        Icon: Play,
        title: "Encontre o ícone vermelho",
        desc: "Procure no celular um quadradinho vermelho com um triangulinho branco no meio. Esse é o YouTube. Toque nele pra abrir.",
      },
      {
        Icon: Search,
        title: "Toque na lupa pra pesquisar",
        desc: "No alto da tela tem uma lupinha. Toque nela e escreva o que você quer ver. Por exemplo: 'receita de bolo de fubá'.",
        tip: "Se ficar difícil digitar, toque no microfone do lado e fale o que quer. O YouTube entende!",
      },
      {
        Icon: Video,
        title: "Toque no vídeo que aparecer",
        desc: "Vai aparecer uma lista de vídeos. Escolha um e toque na imagem. Pronto, o vídeo começa sozinho.",
      },
      {
        Icon: ThumbsUp,
        title: "Gostou? Deixe o joinha",
        desc: "Embaixo do vídeo tem um polegar pra cima. Tocando ali, você diz 'gostei!' e o YouTube vai te mostrar mais coisas parecidas.",
      },
    ],
  },
];

function Aprender() {
  const [open, setOpen] = useState<string | null>(null);
  const current = topics.find((t) => t.id === open);

  if (current) {
    return (
      <PageShell>
        <section className="mx-auto max-w-3xl px-4 py-10 animate-fade-in">
          <button
            onClick={() => setOpen(null)}
            className="inline-flex items-center gap-2 mb-6 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-5 h-14 font-bold text-lg"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden />
            Voltar para a lista
          </button>

          <h1 className="font-display text-4xl font-bold mb-3">{current.title}</h1>

          <div className="bg-warm/60 rounded-3xl p-5 mb-8 flex gap-4 items-start border-2 border-warm">
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center shrink-0">
              <Heart className="h-6 w-6" aria-hidden />
            </div>
            <p className="text-lg leading-relaxed">
              <span className="font-bold">Seu Antônio: </span>
              {current.intro}
            </p>
          </div>

          <ol className="space-y-5">
            {current.steps.map((s, i) => (
              <li
                key={i}
                className="bg-card rounded-3xl p-6 border-2 border-border shadow-card flex gap-5 items-start animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
              >
                <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-display text-3xl font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <s.Icon className="h-7 w-7 text-primary" aria-hidden />
                    <h2 className="font-display text-2xl font-bold">{s.title}</h2>
                  </div>
                  <p className="text-lg leading-relaxed">{s.desc}</p>
                  {s.tip && (
                    <p className="mt-3 bg-accent/20 text-accent-foreground rounded-2xl p-3 text-base leading-relaxed">
                      💡 {s.tip}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 bg-success/10 border-2 border-success/30 rounded-3xl p-6 text-center">
            <p className="font-display text-2xl font-bold mb-2">Conseguiu! 🎉</p>
            <p className="text-lg text-muted-foreground">
              Viu como não era nenhum bicho de sete cabeças? Pode voltar aqui sempre que precisar.
            </p>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-2">Aprender</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Escolha o que você quer aprender hoje. Toque em um dos botões abaixo.
        </p>
        <div className="space-y-4">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setOpen(t.id)}
              className="w-full bg-card hover:bg-warm border-2 border-border hover:border-primary rounded-3xl p-6 flex items-center gap-5 text-left shadow-card transition-all hover:-translate-y-0.5"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary grid place-items-center shrink-0">
                <t.Icon className="h-8 w-8" aria-hidden />
              </div>
              <span className="flex-1 font-display text-2xl font-bold">{t.title}</span>
              <ChevronRight className="h-7 w-7 text-primary shrink-0" aria-hidden />
            </button>
          ))}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-10 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-2xl px-5 h-14 font-bold text-lg"
        >
          <ArrowLeft className="h-6 w-6" aria-hidden />
          Voltar para o Início
        </Link>
      </section>
    </PageShell>
  );
}
