import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { formatPrice, products } from "@/data/products";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Voltora" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string | null>(null);
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", pincode: "", phone: "" });
  const [stateName, setStateName] = useState("");
  const productMap = new Map(products.map((p) => [p.id, p]));
  const shippingFee = cartTotal > 999 ? 0 : 99;
  const mcpItems = useMemo(
    () =>
      cart
        .map((item) => {
          const p = productMap.get(item.productId);
          if (!p) return null;

          return {
            item_id: p.id,
            id: p.id,
            item_sku: p.id,
            item_name: p.name,
            name: p.name,
            price: p.price,
            quantity: item.quantity,
            category: p.category,
            imageUrl: p.image,
            url: `/product/${p.slug}`,
          };
        })
        .filter(Boolean),
    [cart, productMap],
  );

  useEffect(() => {
    setMCPData({
      pageType: "view_checkout",
      currency: "INR",
      items: mcpItems,
    });
  }, [mcpItems]);

  if (cart.length === 0 && !success) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
          <Button asChild className="mt-6 rounded-full"><Link to="/shop">Go shopping</Link></Button>
        </div>
      </SiteLayout>
    );
  }

  if (success) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <CheckCircle2 className="size-16 text-success mx-auto" />
          <h1 className="font-display text-4xl font-bold mt-4">Order placed!</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you. Your order <span className="font-mono font-semibold">{success}</span> has been received.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button asChild className="rounded-full"><Link to="/orders">View orders</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/shop">Continue shopping</Link></Button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const order = placeOrder(shipping);
    setSuccess(order.id);
    setTimeout(() => navigate({ to: "/orders" }), 4000);
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-6">
            <fieldset className="space-y-4">
              <legend className="font-semibold text-lg mb-2">Shipping address</legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="fullName" label="Full name" value={shipping.name} onChange={(v) => setShipping({ ...shipping, name: v })} />
                <Field id="phone" label="Phone" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} />
              </div>
              <Field id="address" label="Address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="city" label="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
                <Field id="state" label="State" value={stateName} onChange={setStateName} />
                <Field id="pincode" label="Pincode" value={shipping.pincode} onChange={(v) => setShipping({ ...shipping, pincode: v })} />
              </div>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="font-semibold text-lg mb-2">Payment</legend>
              <p className="text-sm text-muted-foreground">This is a demo store — no payment will be processed.</p>
              <div className="rounded-xl border border-border p-4 text-sm">💳 Cash on Delivery (demo)</div>
            </fieldset>
          </div>

          <aside className="rounded-2xl bg-secondary/40 p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <h2 className="font-semibold text-lg">Your order</h2>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {cart.map((item) => {
                const p = productMap.get(item.productId);
                if (!p) return null;
                return (
                  <div key={item.productId} className="flex gap-3 text-sm">
                    <div className="size-12 rounded-lg overflow-hidden bg-background shrink-0">
                      <img src={p.image} alt="" className="size-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="line-clamp-1">{p.name}</div>
                      <div className="text-xs text-muted-foreground">Qty {item.quantity}</div>
                    </div>
                    <div className="font-medium">{formatPrice(p.price * item.quantity)}</div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span></div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border"><span>Total</span><span>{formatPrice(cartTotal + shippingFee)}</span></div>
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full checkout-btn">Place order</Button>
          </aside>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <Input id={id} required value={value} onChange={(e) => onChange(e.target.value)} className="mt-1" />
    </div>
  );
}
