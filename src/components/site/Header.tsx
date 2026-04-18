import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useStore } from "@/lib/store";
import { sections } from "@/data/products";

const navLinks = [
  { to: "/category/tech" as const, label: sections.tech.label },
  { to: "/category/home" as const, label: sections.home.label },
  { to: "/category/kitchen" as const, label: sections.kitchen.label },
  { to: "/support" as const, label: "Support & Warranty" },
  { to: "/about" as const, label: "Company" },
  { to: "/investors" as const, label: "Investors" },
];

export function Header() {
  const { cartCount, wishlist, user } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <button onClick={() => setOpen((o) => !o)} className="lg:hidden p-2 -ml-2" aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link to="/" reloadDocument className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="transition-colors"
                reloadDocument
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link to="/shop" reloadDocument className="p-2 hover:text-brand transition-colors" aria-label="Search">
              <Search className="size-5" />
            </Link>
            <Link to="/account" reloadDocument className="p-2 hover:text-brand transition-colors" aria-label="Account">
              <User className="size-5" />
            </Link>
            <Link to="/wishlist" reloadDocument className="relative p-2 hover:text-brand transition-colors" aria-label="Wishlist">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-brand text-brand-foreground text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" reloadDocument className="relative p-2 hover:text-brand transition-colors" aria-label="Cart">
              <ShoppingBag className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-brand text-brand-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden py-4 border-t border-border space-y-1">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} reloadDocument onClick={() => setOpen(false)} className="block py-2 text-sm font-medium">
                {l.label}
              </Link>
            ))}
            {user && <div className="pt-2 text-xs text-muted-foreground">Signed in as {user.name}</div>}
          </nav>
        )}
      </div>
    </header>
  );
}
