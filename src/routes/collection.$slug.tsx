import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, productsByCategory, type CategorySlug } from "@/data/products";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/collection/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.cat.name} â€” Cellecor` : "Collection â€” Cellecor" },
      { name: "description", content: loaderData ? `Shop ${loaderData.cat.name} from Cellecor.` : "" },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { cat } = Route.useLoaderData();
  const items = productsByCategory(cat.slug as CategorySlug);
  const mcpItems = useMemo(
    () =>
      items.map((p, index) => ({
        item_id: p.id,
        id: p.id,
        item_sku: p.id,
        item_name: p.name,
        name: p.name,
        price: p.price,
        quantity: 1,
        category: p.category,
        imageUrl: p.image,
        url: `/product/${p.slug}`,
        index,
      })),
    [items],
  );

  useEffect(() => {
    setMCPData({
      pageName: "Category",
      itemListId: cat.slug,
      itemListName: cat.name,
      currency: "INR",
      items: mcpItems,
    });
  }, [cat.name, cat.slug, mcpItems]);

  return (
    <SiteLayout>
      <section style={{ backgroundColor: cat.tint }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">Collection</p>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl font-bold">{cat.name}</h1>
            <p className="mt-3 max-w-md">{items.length} products</p>
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden">
            <img src={cat.image} alt={cat.name} className="size-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="products-section plp-products product-list" />
        {items.length === 0 ? (
          <p className="text-muted-foreground py-12 text-center">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
