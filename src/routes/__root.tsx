import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { A11yProvider } from "@/lib/accessibility";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-muted-foreground">Não conseguimos achar essa página.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold">Algo deu errado</h1>
        <p className="mt-2 text-muted-foreground">Vamos tentar de novo?</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-2xl bg-primary px-6 py-4 font-bold text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Conecta Vovô — Inclusão digital com carinho" },
      {
        name: "description",
        content:
          "Conecta Vovô ensina idosos a usar o celular de um jeito simples, seguro e acolhedor. Aprenda WhatsApp, chamadas de vídeo, jogos e mais.",
      },
      { property: "og:title", content: "Conecta Vovô" },
      { property: "og:description", content: "Inclusão digital acolhedora para idosos." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Nunito:wght@400;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <A11yProvider>
        <Outlet />
      </A11yProvider>
    </QueryClientProvider>
  );
}
