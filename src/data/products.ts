import heroFan from "@/assets/hero-fan.jpg";
import heroMixer from "@/assets/hero-mixer.jpg";
import heroAirfryer from "@/assets/hero-airfryer.jpg";
import catSpeaker from "@/assets/cat-speaker.jpg";
import catKettle from "@/assets/cat-kettle.jpg";
import catMixer from "@/assets/cat-mixer.jpg";
import catAirfryer from "@/assets/cat-airfryer.jpg";
import catSmartwatch from "@/assets/cat-smartwatch.jpg";
import catNeckband from "@/assets/cat-neckband.jpg";
import catTws from "@/assets/cat-tws.jpg";
import catTv from "@/assets/cat-tv.jpg";

export type CategorySlug =
  | "fans"
  | "mixers"
  | "airfryers"
  | "kettles"
  | "irons"
  | "speakers"
  | "smartwatches"
  | "neckbands"
  | "tws"
  | "tvs";

export type SectionSlug = "tech" | "home" | "kitchen";

export type Category = {
  slug: CategorySlug;
  name: string;
  image: string;
  section: SectionSlug;
  tint: string;
};

export const categories: Category[] = [
  { slug: "fans", name: "Pedestal Fans", image: heroFan, section: "home", tint: "oklch(0.93 0.03 75)" },
  { slug: "mixers", name: "Mixer Grinders", image: catMixer, section: "kitchen", tint: "oklch(0.88 0.04 300)" },
  { slug: "airfryers", name: "Air Fryers", image: catAirfryer, section: "kitchen", tint: "oklch(0.88 0.06 30)" },
  { slug: "kettles", name: "Electric Kettles", image: catKettle, section: "kitchen", tint: "oklch(0.92 0.06 150)" },
  { slug: "irons", name: "Garment Irons", image: catMixer, section: "home", tint: "oklch(0.92 0.04 10)" },
  { slug: "speakers", name: "Bluetooth Speakers", image: catSpeaker, section: "tech", tint: "oklch(0.92 0.12 95)" },
  { slug: "smartwatches", name: "Smartwatches", image: catSmartwatch, section: "tech", tint: "oklch(0.85 0.08 230)" },
  { slug: "neckbands", name: "Neckbands", image: catNeckband, section: "tech", tint: "oklch(0.85 0.12 50)" },
  { slug: "tws", name: "True Wireless Earbuds", image: catTws, section: "tech", tint: "oklch(0.85 0.08 190)" },
  { slug: "tvs", name: "Smart TVs", image: catTv, section: "tech", tint: "oklch(0.35 0.02 250)" },
];

export const sections: Record<SectionSlug, { label: string; description: string }> = {
  tech: { label: "Tech & Gadgets", description: "Audio, wearables, and smart screens" },
  home: { label: "Home Appliances", description: "Cooling and everyday essentials" },
  kitchen: { label: "Kitchen Appliances", description: "Cook, blend, brew with ease" },
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  features: string[];
  colors?: string[];
  badge?: string;
  bestseller?: boolean;
  trending?: boolean;
};

const p = (
  id: string,
  slug: string,
  name: string,
  category: CategorySlug,
  price: number,
  mrp: number,
  rating: number,
  reviews: number,
  image: string,
  short: string,
  description: string,
  features: string[],
  extras: Partial<Product> = {},
): Product => ({
  id,
  slug,
  name,
  category,
  price,
  mrp,
  rating,
  reviews,
  image,
  gallery: [image],
  shortDescription: short,
  description,
  features,
  ...extras,
});

export const products: Product[] = [
  p(
    "fan-retrospin",
    "retrospin-pedestal-fan",
    "RetroSpin High-Speed Pedestal Fan",
    "fans",
    7999, 12999, 4.7, 956, heroFan,
    "Vintage-style pedestal fan with 1300 RPM aluminium motor and 4 bronze metal blades.",
    "A blend of vintage aesthetics and modern performance. Steady airflow with low power consumption, full ball-bearing support, and a 3-year warranty.",
    ["1300 RPM aluminium motor", "4 bronze metal blades", "120° smooth oscillation", "Low-noise operation", "3-year warranty"],
    { badge: "Save 38%", bestseller: true, trending: true, colors: ["#3b2e21", "#1a1a1a"] },
  ),
  p(
    "fan-powerflow",
    "powerflow-pedestal-fan",
    "PowerFlow Pedestal Fan",
    "fans",
    3999, 6999, 4.6, 612, heroFan,
    "Compact high-speed pedestal fan for everyday cooling.",
    "Designed for living rooms and offices. Powerful copper motor delivers consistent airflow with three-speed control.",
    ["Pure copper motor", "3-speed control", "120° oscillation", "2-year warranty"],
    { badge: "Save 43%", bestseller: true },
  ),
  p(
    "mixer-chopzy",
    "chopzy-juicer-mixer-grinder",
    "Chopzy 600W Juicer Mixer Grinder",
    "mixers",
    3499, 12999, 4.7, 755, catMixer,
    "600W copper motor with 28,000 RPM for fine grinding and juicing.",
    "A reliable kitchen workhorse. Fine grinding, smooth blending and quick juicing every time. Two stainless steel jars and a 2-year motor warranty.",
    ["600W 100% copper motor", "Up to 28,000 RPM", "3 speed + pulse control", "Stainless steel jars", "2-year warranty"],
    { badge: "Save 73%", bestseller: true, trending: true, colors: ["#c0c0c0", "#1a1a1a"] },
  ),
  p(
    "blender-blendpro",
    "blendpro-nutri-blender",
    "BlendPro Nutri-Blender 500W",
    "mixers",
    2499, 9999, 4.7, 728, heroMixer,
    "500W blender with 24,500 RPM and titanium-alloy 6-leaf blade.",
    "Crush fruits, veggies and ice in seconds. The anti-rust titanium-alloy blade ensures consistent blends every time.",
    ["500W motor", "24,500 RPM", "6-leaf titanium-alloy blade", "Two grip-jars included", "2-year warranty"],
    { badge: "Save 75%", trending: true, colors: ["#1e3a8a", "#dc2626", "#0ea5e9"] },
  ),
  p(
    "mixer-cmg60",
    "classic-600w-mixer-grinder",
    "Classic 600W Mixer Grinder",
    "mixers",
    2299, 5999, 4.5, 1240, catMixer,
    "Three-jar mixer grinder with overload protector.",
    "Everything you need for everyday Indian cooking. Three jars for wet grinding, dry grinding and chutney.",
    ["600W motor", "3 stainless steel jars", "Overload protector", "Anti-skid feet", "2-year warranty"],
    { bestseller: true },
  ),
  p(
    "airfryer-airflow",
    "airflow-air-fryer-5l",
    "AirFlow 5.5L Air Fryer",
    "airfryers",
    3799, 11999, 4.7, 1502, heroAirfryer,
    "5.5L digital air fryer with 8 preset cooking modes.",
    "Fry, bake, roast and grill with up to 90% less oil. The large 5.5L basket cooks for the whole family in one go.",
    ["5.5L non-stick basket", "8 digital presets", "60-min timer", "Auto shut-off", "Touch control panel"],
    { badge: "Save 68%", bestseller: true, trending: true },
  ),
  p(
    "kettle-magic",
    "magic-chef-multi-cook-kettle",
    "Magic Chef Multi-Cook Kettle 1.3L",
    "kettles",
    1400, 2999, 4.5, 421, catKettle,
    "1.3L multi-cook kettle for tea, noodles, soups and more.",
    "Stainless steel inner body with auto shut-off. Perfect for hostels, offices and small kitchens.",
    ["1.3L capacity", "Stainless steel body", "Auto shut-off", "Boil-dry protection", "1-year warranty"],
    { badge: "Save 53%" },
  ),
  p(
    "kettle-electric",
    "rapidboil-electric-kettle-15l",
    "RapidBoil Electric Kettle 1.5L",
    "kettles",
    899, 1799, 4.4, 305, catKettle,
    "1.5L electric kettle with 360° swivel base.",
    "Boils water in 4 minutes flat. Cordless 360° base for easy pouring.",
    ["1500W heating element", "1.5L capacity", "360° swivel base", "Auto shut-off"],
  ),
  p(
    "iron-glide",
    "glide-dry-iron",
    "Glide Dry Iron 1000W",
    "irons",
    1299, 2199, 4.4, 532, catMixer,
    "Lightweight 1000W dry iron with non-stick coated soleplate.",
    "Crisp pleats every morning. Adjustable thermostat with thermal fuse for safety.",
    ["1000W power", "Non-stick coated soleplate", "Adjustable thermostat", "Thermal fuse", "2-year warranty"],
    { badge: "Save 41%" },
  ),
  p(
    "speaker-boomx",
    "boomx-portable-bluetooth-speaker",
    "BoomX Portable Bluetooth Speaker",
    "speakers",
    1799, 3499, 4.6, 689, catSpeaker,
    "20W IPX6 portable speaker with 12-hour playback.",
    "Pumping bass and crystal-clear highs in a splash-proof shell. Perfect for indoor and outdoor parties.",
    ["20W output", "IPX6 splash-proof", "12-hour playback", "Bluetooth 5.3", "TWS pairing"],
    { trending: true },
  ),
  p(
    "smartwatch-pulse",
    "pulse-amoled-smartwatch",
    "Pulse AMOLED Smartwatch",
    "smartwatches",
    2199, 5999, 4.5, 1820, catSmartwatch,
    '1.96" AMOLED smartwatch with Bluetooth calling and 100+ sport modes.',
    "Big bright AMOLED display with always-on. Track your heart rate, SpO2 and sleep with medical-grade sensors.",
    ['1.96" AMOLED display', "Bluetooth calling", "100+ sport modes", "SpO2 & heart-rate", "7-day battery life"],
    { badge: "Save 63%", bestseller: true },
  ),
  p(
    "neckband-flex",
    "flex-pro-neckband",
    "Flex Pro Neckband Earphones",
    "neckbands",
    899, 1999, 4.4, 982, catNeckband,
    "Magnetic neckband earphones with 40-hour playback.",
    "Lightweight, flexible silicone band. Magnetic earbuds let you pause with a snap.",
    ["40-hour playback", "ENC noise cancellation", "Bluetooth 5.3", "Magnetic earbuds", "Type-C charging"],
  ),
  p(
    "tws-airbeats",
    "airbeats-true-wireless-earbuds",
    "AirBeats True Wireless Earbuds",
    "tws",
    1499, 3499, 4.6, 1305, catTws,
    "TWS earbuds with 50ms low-latency mode and 35-hour total playback.",
    "Crystal-clear calls with quad-mic ENC, 13mm dynamic drivers, and a sleek pebble case.",
    ["13mm drivers", "Quad-mic ENC", "50ms gaming mode", "35-hour total playback", "IPX5 rated"],
    { trending: true },
  ),
  p(
    "tv-cinemax",
    "cinemax-43-smart-led-tv",
    'CineMax 43" Smart LED TV',
    "tvs",
    18999, 32999, 4.5, 412, catTv,
    "43-inch full-HD smart TV with bezel-less design and dual-band Wi-Fi.",
    "Powered by a quad-core processor and Android OS. 24W box speakers with Dolby surround.",
    ["43-inch FHD display", "Quad-core processor", "Android Smart OS", "24W speakers + Dolby", "Dual-band Wi-Fi"],
    { badge: "Save 42%" },
  ),
];

export const findProduct = (slug: string) => products.find((x) => x.slug === slug);
export const productsByCategory = (slug: CategorySlug) => products.filter((x) => x.category === slug);
export const productsBySection = (slug: SectionSlug) => {
  const cats = categories.filter((c) => c.section === slug).map((c) => c.slug);
  return products.filter((p) => cats.includes(p.category));
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
