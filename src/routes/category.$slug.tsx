import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, productsBySection, sections, type SectionSlug } from "@/data/products";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const slug = params.slug as SectionSlug;
    if (!(slug in sections)) throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? sections[loaderData.slug as SectionSlug] : null;
    return {
      meta: [
        { title: s ? `${s.label} — Voltora` : "Category — Voltora" },
        { name: "description", content: s?.description ?? "" },
        { property: "og:title", content: s ? `${s.label} — Voltora` : "Category — Voltora" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useLoaderData() as { slug: SectionSlug };
  const meta = sections[slug];
  const items = productsBySection(slug);
  const cats = categories.filter((c) => c.section === slug);

  useEffect(() => {
    setMCPData({
      pageName: "Category",
      itemListId: slug,
      itemListName: meta.label,
      currency: "INR",
    });
  }, [meta.label, slug]);

  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-deep">Category</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl font-bold">{meta.label}</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{meta.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {cats.map((c) => (
            <Link
              key={c.slug}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="rounded-xl border border-border px-3 py-3 text-sm font-medium text-center hover:border-brand hover:text-brand transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
