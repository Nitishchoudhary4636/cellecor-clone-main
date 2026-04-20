import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { categories, products, formatPrice } from "@/data/products";
import { setMCPData } from "@/lib/mcpDataLayer";
import heroFan from "@/assets/hero-fan.jpg";
import heroAirfryer from "@/assets/hero-airfryer.jpg";
import heroMixer from "@/assets/hero-mixer.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cellecor — Smart Gadgets & Home Appliances" },
      { name: "description", content: "Discover Cellecor's range of smart gadgets, kitchen tools, and home appliances. Designed in India, built to last." },
      { property: "og:title", content: "Cellecor — Smart Gadgets & Home Appliances" },
      { property: "og:description", content: "Discover Cellecor's range of smart gadgets, kitchen tools, and home appliances." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      id: "retrospin",
      href: "/product/retrospin-pedestal-fan",
      title: "RetroSpin Pedestal Fan",
      image: "https://cellecor.com/cdn/shop/files/banner_-_2_jpg.jpg?v=1775806295&width=1880",
    },
    {
      id: "airfryer",
      href: "/collection/airfryers",
      title: "Air Fryers",
      image: "https://cellecor.com/cdn/shop/files/banner_-_3_jpg.jpg?v=1775806303&width=1880",
    },
    {
      id: "mixer",
      href: "/collection/mixers",
      title: "Mixer Grinders",
      image: heroMixer,
    },
  ];

  useEffect(() => {
    setMCPData({
      pageName: "Home",
      pageType: "Home",
      currency: "INR",
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroSlides.length]);

  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const dailyDeals = [...products].sort((a, b) => b.mrp - b.price - (a.mrp - a.price)).slice(0, 6);

  return (
    <SiteLayout>
      {/* Hero */}
      <section id="hero" className="hero bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
          <div className="space-y-6 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/60 backdrop-blur px-3 py-1 text-xs font-medium">
              ✦ New season · 2025 collection
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] text-balance">
              2D rotation. <br />
              <span className="italic text-brand-deep">Even airflow.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md">
              The RetroSpin pedestal fan blends vintage looks with serious cooling. 120° smooth rotation, 1300 RPM aluminium motor.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/product/$slug" params={{ slug: "retrospin-pedestal-fan" }}>
                  Shop now <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <div className="text-sm">
                <div className="text-muted-foreground line-through">{formatPrice(12999)}</div>
                <div className="text-2xl font-bold">{formatPrice(7999)}</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="swiper aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
              <div
                className="swiper-wrapper flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}
              >
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="swiper-slide min-w-full h-full">
                    <a
                      href={slide.href}
                      title={slide.title}
                      className="hero-banner-link cursor-pointer block h-full w-full"
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="home-img hero-banner-image size-full object-cover"
                        draggable={false}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          {[
            { icon: Truck, title: "Free shipping", sub: "On orders over ₹999" },
            { icon: ShieldCheck, title: "2-year warranty", sub: "On all appliances" },
            { icon: RotateCcw, title: "7-day returns", sub: "Hassle-free" },
            { icon: Award, title: "Made in India", sub: "Designed in Bengaluru" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-secondary flex items-center justify-center">
                <f.icon className="size-5 text-brand" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Shop by category</h2>
          <Link to="/shop" className="text-sm font-medium hover:text-brand">View all →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              to="/collection/$slug"
              params={{ slug: cat.slug }}
              className="group relative aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: cat.tint }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="size-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent">
                <div className="text-white text-sm font-semibold">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="featured-products" />
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-brand font-semibold uppercase tracking-wide">Loved by 10,000+ homes</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Best sellers</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium hover:text-brand">Shop all →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Editorial split */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-6">
        <Link
          to="/category/$slug"
          params={{ slug: "kitchen" }}
          className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-accent"
        >
          <img src={heroAirfryer} alt="Air fryer" className="size-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Healthy cooking</p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">Air fryers, reimagined</h3>
            <p className="text-white/80 text-sm mt-2 max-w-sm">Up to 90% less oil. 8 digital presets. One basket for the whole family.</p>
          </div>
        </Link>
        <Link
          to="/category/$slug"
          params={{ slug: "kitchen" }}
          className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-sand"
        >
          <img src={heroMixer} alt="Mixer grinder" className="size-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase tracking-wider">Kitchen workhorses</p>
            <h3 className="font-display text-3xl sm:text-4xl font-bold mt-2">Built to last decades</h3>
            <p className="text-sm mt-2 max-w-sm">Pure-copper motors. Stainless steel jars. 2-year warranty across the board.</p>
          </div>
        </Link>
      </section>

      {/* Daily deals */}
      <section className="bg-secondary/40 py-16 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-brand font-semibold uppercase tracking-wide">Limited time</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">Daily deals</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-foreground text-background rounded-3xl p-10 sm:p-16 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold max-w-2xl mx-auto text-balance">
            Get ₹500 off your first order.
          </h2>
          <p className="mt-3 text-background/70 max-w-md mx-auto">
            Drop your email — we'll send a code straight to your inbox. No spam, ever.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 rounded-full bg-background/10 border border-background/20 px-5 py-3 text-sm placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <Button type="submit" className="rounded-full">Subscribe</Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
