import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Wrench, Truck, RotateCcw } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & Warranty â€” Cellecor" },
      { name: "description", content: "Register your product, file a warranty claim, or browse FAQs." },
      { property: "og:title", content: "Support & Warranty â€” Cellecor" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  const cards = [
    { icon: ShieldCheck, title: "Warranty claim", desc: "Have a product that needs service? File a claim in 2 minutes." },
    { icon: Wrench, title: "Service centres", desc: "Find a Cellecor-authorised service centre near you." },
    { icon: Truck, title: "Shipping info", desc: "Track your order and view delivery timelines." },
    { icon: RotateCcw, title: "Returns & refunds", desc: "Easy 7-day returns on most products." },
  ];

  const faqs = [
    { q: "What is the warranty on Cellecor products?", a: "All Cellecor appliances come with a standard 2-year manufacturer warranty. Smartwatches and TWS earbuds come with a 1-year warranty." },
    { q: "How long does shipping take?", a: "Most orders are delivered within 3â€“5 business days across India. Metro cities usually receive orders within 48 hours." },
    { q: "Can I return a product?", a: "Yes, you can return any product within 7 days of delivery if it's unused and in its original packaging." },
    { q: "How do I track my order?", a: "After placing your order, you'll receive a tracking link via SMS and email. You can also view it in 'My orders'." },
    { q: "Do you ship internationally?", a: "Currently we only ship within India. International shipping is coming soon." },
  ];

  return (
    <SiteLayout>
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-display text-5xl font-bold">Support & warranty</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">We're here to help â€” file a warranty claim, browse FAQs, or get in touch with our team.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border p-6 hover:border-brand transition-colors">
              <c.icon className="size-6 text-brand" />
              <div className="mt-4 font-semibold">{c.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold mt-16 mb-6">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-12 text-sm text-muted-foreground">
          Still need help? <Link to="/contact" className="underline text-foreground">Contact our team</Link>.
        </p>
      </section>
    </SiteLayout>
  );
}
