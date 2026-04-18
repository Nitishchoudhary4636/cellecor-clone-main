import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Package, LogOut } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — Voltora" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, login, logout, orders, wishlist } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMCPData({
      pageType: "login",
      pageName: "Login",
      currency: "INR",
    });
  }, []);

  if (!user) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-md px-4 py-16">
          <h1 className="font-display text-4xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to track orders and manage your wishlist.</p>
          <form
            id="authForm"
            onSubmit={(e) => {
              e.preventDefault();
              const r = login(email, password);
              if (!r.ok) setError(r.error || "Login failed");
              else navigate({ to: "/account" });
            }}
            className="mt-8 space-y-4"
          >
            <input id="name" type="hidden" value="" readOnly />
            <input id="phone" type="hidden" value="" readOnly />
            <input id="chkOffersChecked" type="checkbox" className="hidden" readOnly />
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" className="w-full rounded-full">Sign in</Button>
            <p className="text-sm text-center text-muted-foreground">
              No account? <Link to="/signup" className="text-foreground font-medium underline">Create one</Link>
            </p>
          </form>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-4xl font-bold">Hi, {user.name} 👋</h1>
            <p className="mt-1 text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={logout} className="rounded-full">
            <LogOut className="size-4 mr-1" /> Sign out
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          <Link to="/orders" className="rounded-2xl border border-border p-6 hover:border-brand transition-colors">
            <Package className="size-6 text-brand" />
            <div className="mt-3 font-semibold">My orders</div>
            <div className="text-sm text-muted-foreground">{orders.length} {orders.length === 1 ? "order" : "orders"}</div>
          </Link>
          <Link to="/wishlist" className="rounded-2xl border border-border p-6 hover:border-brand transition-colors">
            <Heart className="size-6 text-brand" />
            <div className="mt-3 font-semibold">My wishlist</div>
            <div className="text-sm text-muted-foreground">{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</div>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
