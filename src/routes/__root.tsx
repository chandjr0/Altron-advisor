import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportRuntimeError } from "../lib/error-reporting";
import { pageSeo, SITE_NAME } from "../lib/seo";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-brass">404</p>
        <h1 className="display mt-6 text-4xl text-foreground sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="btn-outline inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.18em] uppercase"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportRuntimeError(error, { boundary: "root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-2xl tracking-tight text-foreground sm:text-3xl">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-solid inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.18em] uppercase"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-outline inline-flex items-center justify-center px-6 py-3 text-xs tracking-[0.18em] uppercase"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const rootSeo = pageSeo({
  title: `${SITE_NAME} — Independent FM Strategy & Commercial Advisory`,
  description:
    "Insight. Clarity. Better Decisions. Independent FM strategy and commercial advisory for corporate occupiers, private equity investors and FM providers. London, UK.",
  path: "/",
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#16202b" },
      { name: "format-detection", content: "telephone=no" },
      ...rootSeo.meta,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "512x512" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      ...rootSeo.links,
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,450&family=Inter:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description:
    "Independent FM strategy and commercial advisory for corporate occupiers, private equity investors and FM providers.",
  url: "https://www.altrionadvisory.com",
  telephone: "+44-7516-166135",
  areaServed: "GB",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  founder: {
    "@type": "Person",
    name: "Derrick Tate",
    jobTitle: "Founder & Managing Director",
  },
  sameAs: ["https://www.linkedin.com/company/altrion-advisory/"],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
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
      <SmoothScroll />
      <Nav />
      <main id="main-content" className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
