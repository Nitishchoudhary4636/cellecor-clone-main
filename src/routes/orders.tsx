import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Your orders — Cellecor" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useStore();

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">Your orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-secondary/40">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <Button asChild className="mt-6 rounded-full"><Link to="/shop">Start shopping</Link></Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-2xl border border-border p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Order ID</div>
                    <div className="font-mono font-semibold">{o.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Placed</div>
                    <div className="text-sm">{new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total</div>
                    <div className="font-semibold">{formatPrice(o.total)}</div>
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-success/10 text-success text-xs font-semibold px-3 py-1">Confirmed</span>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {o.items.map((it) => (
                    <div key={it.productId} className="flex gap-3 text-sm">
                      <div className="size-14 rounded-lg overflow-hidden bg-secondary shrink-0">
                        <img src={it.image} alt="" className="size-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-muted-foreground">Qty {it.quantity} · {formatPrice(it.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
