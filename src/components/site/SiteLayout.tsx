import { type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Marquee } from "./Marquee";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div id="global-welcome" className="global_welcome" />
      <div id="exit-intent" className="global-exit-intent" />
      <div id="surveyFeedback" className="survey-feedback" />
      <div id="product-recommendation" className="global-product-recommendation" />
      <Marquee
        items={[
          "Free shipping on orders over ₹999",
          "New: AirFlow 5.5L Air Fryer — Shop Now",
          "Buy 2 get 10% off on TWS earbuds",
          "Made in India · 2-year warranty",
        ]}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
