import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createElement, useEffect, useMemo, useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { findProduct, formatPrice, products } from "@/data/products";
import { useStore } from "@/lib/store";
import { setMCPData, toAbsoluteUrl } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — Voltora` : "Product — Voltora" },
      { name: "description", content: loaderData?.product.shortDescription ?? "" },
      { property: "og:title", content: loaderData ? `${loaderData.product.name} — Voltora` : "Product — Voltora" },
      { property: "og:description", content: loaderData?.product.shortDescription ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]);
  const wished = isWishlisted(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productUrl = useMemo(() => {
    if (typeof window === "undefined") return `/product/${product.slug}`;
    return `${window.location.origin}/product/${product.slug}`;
  }, [product.slug]);

  useEffect(() => {
    setMCPData({
      pageType: "Product",
      currency: "INR",
      Item: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: toAbsoluteUrl(product.image),
        url: productUrl,
        price: product.price,
        availability: "in_stock",
        category: product.category,
        color: product.colors ?? [],
        size: [],
      },
    });
  }, [product, productUrl]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <nav className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-foreground">Shop</Link> / <span>{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 pb-16">
        <div className="aspect-square rounded-3xl overflow-hidden bg-secondary">
          <img src={product.image} alt={product.name} className="size-full object-cover" />
        </div>

        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block rounded-full bg-brand text-brand-foreground text-xs font-bold px-3 py-1">
              {product.badge}
            </span>
          )}
          <h1 className="font-display text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-4 ${i < Math.round(product.rating) ? "fill-brand text-brand" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-base text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
                <span className="text-sm font-semibold text-success">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={`Color ${c}`}
                    className={`size-9 rounded-full border-2 transition-all ${color === c ? "border-foreground scale-110" : "border-border"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center rounded-full border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5" aria-label="Decrease">
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2.5" aria-label="Increase">
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="rounded-full flex-1 sm:flex-none sm:px-10 btn-large"
              onClick={() => {
                addToCart(product.id, qty);
                toast.success(`Added ${qty} × ${product.name} to cart`);
              }}
            >
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={`size-4 ${wished ? "fill-brand text-brand" : ""}`} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm"><Truck className="size-4 text-brand" /> Free shipping over ₹999</div>
            <div className="flex items-center gap-2 text-sm"><ShieldCheck className="size-4 text-brand" /> 2-year warranty</div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Key features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {product.features.map((f: string) => (
                <li key={f} className="flex gap-2"><span className="text-brand">•</span>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
          {createElement("pdp_recommendation", { id: "pdp_recommendation", className: "pdp_recommendation" })}
          <h2 className="font-display text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
