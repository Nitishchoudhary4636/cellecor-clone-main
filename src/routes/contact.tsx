import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setMCPData } from "@/lib/mcpDataLayer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us â€” Cellecor" },
      { name: "description", content: "Get in touch with the Cellecor team. We typically reply within one business day." },
      { property: "og:title", content: "Contact Cellecor" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setMCPData({
      pageType: "Contact",
      pageName: "Contact",
      currency: "INR",
    });
  }, []);

  return (
    <SiteLayout>
      <section id="contact" className="contact-us mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Contact</p>
          <h1 className="mt-2 font-display text-5xl font-bold">Let's talk.</h1>
          <p className="mt-4 text-muted-foreground max-w-md">We typically reply within one business day. For urgent warranty issues, please use the support page.</p>
          <div className="contact-form-section" />
          <div className="mt-10 space-y-5">
            <Item icon={Mail} title="Email" detail="hello@cellecor.example" />
            <Item icon={Phone} title="Phone" detail="+91 80 1234 5678" />
            <Item icon={MapPin} title="Headquarters" detail="3rd Floor, Indiranagar, Bengaluru 560038" />
          </div>
        </div>
        <form
          id="authForm"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Thanks! We'll be in touch soon.");
          }}
          className="rounded-3xl bg-secondary/40 p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label htmlFor="name">Name</Label><Input id="name" required className="mt-1" /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required className="mt-1" /></div>
          </div>
          <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" className="mt-1" /></div>
          <div><Label htmlFor="cs">Subject</Label><Input id="cs" required className="mt-1" /></div>
          <div><Label htmlFor="cm">Message</Label><Textarea id="cm" required rows={5} className="mt-1" /></div>
          <label htmlFor="chkOffersChecked" className="flex items-center gap-2 text-sm text-muted-foreground">
            <input id="chkOffersChecked" type="checkbox" />
            Receive offers and product updates
          </label>
          <Button type="submit" size="lg" className="w-full rounded-full">{sent ? "Message sent âœ“" : "Send message"}</Button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Item({ icon: Icon, title, detail }: { icon: React.ElementType; title: string; detail: string }) {
  return (
    <div className="flex gap-4">
      <div className="size-10 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0"><Icon className="size-5" /></div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-sm text-muted-foreground">{detail}</div>
      </div>
    </div>
  );
}
