import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Download, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investor relations — Cellecor" },
      { name: "description", content: "Cellecor investor information, annual reports, and financial highlights." },
      { property: "og:title", content: "Investor relations — Cellecor" },
    ],
  }),
  component: InvestorsPage,
});

function InvestorsPage() {
  return (
    <SiteLayout>
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Investor relations</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl font-bold">Building India's next consumer brand.</h1>
          <p className="mt-4 text-background/70 max-w-2xl">
            Cellecor Gadgets Ltd. is listed on the BSE SME platform. Below you'll find our latest financial highlights, reports, and announcements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Revenue FY24", value: "₹284 Cr", delta: "+62% YoY" },
            { label: "EBITDA margin", value: "11.2%", delta: "+180 bps" },
            { label: "Active SKUs", value: "120+", delta: "32 new in FY24" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl bg-secondary/40 p-6">
              <div className="text-sm text-muted-foreground">{m.label}</div>
              <div className="font-display text-4xl font-bold mt-2">{m.value}</div>
              <div className="text-sm text-success font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="size-3.5" /> {m.delta}
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold mb-6">Reports & filings</h2>
        <div className="space-y-2">
          {[
            "Annual Report FY 2023–24",
            "Q4 FY24 — Investor Presentation",
            "Q3 FY24 — Earnings Release",
            "Code of Conduct",
            "Insider Trading Policy",
          ].map((t) => (
            <a key={t} href="#" className="flex items-center justify-between rounded-xl border border-border px-5 py-4 hover:border-brand transition-colors">
              <span className="flex items-center gap-3">
                <Building2 className="size-4 text-brand" /> {t}
              </span>
              <Download className="size-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
