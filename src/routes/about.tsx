import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Voltora — Our story" },
      { name: "description", content: "Voltora is a Bengaluru-based brand making everyday gadgets and appliances that look great and last for years." },
      { property: "og:title", content: "About Voltora" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-deep">Our story</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">Designed in India.<br /><span className="italic">Built to last.</span></h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose prose-neutral">
        <p className="text-lg text-muted-foreground">
          Voltora started in 2018 with a simple idea — that great gadgets shouldn't cost a fortune and shouldn't look out of place in your home.
        </p>
        <p className="text-muted-foreground">
          Today, we design and manufacture a full range of consumer electronics and home appliances — from smartwatches and earbuds to mixers,
          fans, and air fryers. Every product goes through 200+ quality checks before it reaches you.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 mt-12 not-prose">
          {[
            { n: "10M+", l: "Happy customers" },
            { n: "200+", l: "Cities served" },
            { n: "2-year", l: "Standard warranty" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-secondary/50 p-6 text-center">
              <div className="font-display text-4xl font-bold text-brand">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
