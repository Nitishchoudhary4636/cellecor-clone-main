import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const wished = isWishlisted(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground text-background text-xs font-bold px-2.5 py-1">
            -{discount}%
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 size-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className={`size-4 ${wished ? "fill-brand text-brand" : ""}`} />
        </button>
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button onClick={() => addToCart(product.id)} className="w-full" size="sm">
            Add to cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block font-medium text-sm line-clamp-2 hover:text-brand transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-brand text-brand" />
          <span>{product.rating}</span>
          <span>· {product.reviews} reviews</span>
        </div>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
