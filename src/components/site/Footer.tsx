import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer site-footer mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-sm">
              Cellecor makes everyday gadgets and appliances that look great on your shelf and last for years.
              Designed in Bengaluru, made for India.
            </p>
            <div className="flex gap-3 pt-2">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-9 rounded-full border border-border flex items-center justify-center hover:bg-brand hover:text-brand-foreground hover:border-brand transition-colors"
                  aria-label="Social"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { to: "/shop", label: "All products" },
              { to: "/category/tech", label: "Tech & Gadgets" },
              { to: "/category/home", label: "Home appliances" },
              { to: "/category/kitchen", label: "Kitchen appliances" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { to: "/about", label: "About us" },
              { to: "/investors", label: "Investors" },
              { to: "/contact", label: "Contact" },
              { to: "/support", label: "Support" },
            ]}
          />
          <FooterCol
            title="Account"
            links={[
              { to: "/account", label: "My account" },
              { to: "/orders", label: "My orders" },
              { to: "/wishlist", label: "Wishlist" },
              { to: "/cart", label: "Cart" },
            ]}
          />
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between text-xs text-muted-foreground">
          <p>Â© {new Date().getFullYear()} Cellecor Gadgets Ltd. All rights reserved.</p>
          <p>An inspired demo build â€” not affiliated with any real brand.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} reloadDocument className="hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
