import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { findProduct, formatPrice, products } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — Voltora" }, { name: "description", content: "Review the items in your shopping cart." }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const productMap = new Map(products.map((p) => [p.id, p]));
  const shipping = cartTotal > 999 || cartTotal === 0 ? 0 : 99;

  if (cart.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-display text-4xl font-bold">Your cart is empty</h1>
          <p className="mt-3 text-muted-foreground">Start exploring our collection of gadgets and appliances.</p>
          <Button asChild size="lg" className="mt-8 rounded-full">
            <Link to="/shop">Browse products</Link>
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">Your cart</h1>
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-4">
            {cart.map((item) => {
              const p = productMap.get(item.productId);
              if (!p) return null;
              return (
                <div key={item.productId} className="flex gap-4 p-4 rounded-2xl border border-border">
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="size-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                    <img src={p.image} alt={p.name} className="size-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to="/product/$slug" params={{ slug: p.slug }} className="font-medium hover:text-brand">{p.name}</Link>
                    <div className="text-sm text-muted-foreground mt-1">{formatPrice(p.price)}</div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => updateQuantity(p.id, item.quantity - 1)} className="p-1.5" aria-label="Decrease">
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(p.id, item.quantity + 1)} className="p-1.5" aria-label="Increase">
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(p.id)} className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-1">
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold text-right">{formatPrice(p.price * item.quantity)}</div>
                </div>
              );
            })}
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-foreground">
              Clear cart
            </button>
          </div>

          <aside className="rounded-2xl bg-secondary/40 p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <h2 className="font-semibold text-lg">Order summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              {shipping === 0 && cartTotal > 0 && (
                <p className="text-xs text-success">🎉 You qualify for free shipping!</p>
              )}
            </div>
            <div className="pt-4 border-t border-border flex justify-between font-semibold text-lg">
              <span>Total</span><span>{formatPrice(cartTotal + shipping)}</span>
            </div>
            <Button asChild size="lg" className="w-full rounded-full">
              <Link to="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full rounded-full">
              <Link to="/shop">Continue shopping</Link>
            </Button>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
