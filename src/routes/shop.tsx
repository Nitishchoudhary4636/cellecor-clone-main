import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { products, categories } from "@/data/products";
import { Input } from "@/components/ui/input";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop all products â€” Cellecor" },
      { name: "description", content: "Browse the full Cellecor catalogue: smartwatches, air fryers, mixers, fans and more." },
      { property: "og:title", content: "Shop all products â€” Cellecor" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, sort]);

  const mcpItems = useMemo(
    () =>
      filtered.map((p, index) => ({
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
    [filtered],
  );

  useEffect(() => {
    setMCPData({
      pageName: "Category",
      itemListId: "all-products",
      itemListName: "All products",
      currency: "INR",
      items: mcpItems,
    });
  }, [mcpItems]);

  return (
    <SiteLayout>
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold">All products</h1>
          <p className="mt-2 text-muted-foreground">{products.length} products across {categories.length} categories</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="products-section plp-products product-list" />
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-56 shrink-0">
            <h3 className="font-semibold text-sm mb-3">Categories</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/shop" className="hover:text-brand">All</Link></li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to="/collection/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input placeholder="Search productsâ€¦" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
            {filtered.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">No products match your search.</p>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
