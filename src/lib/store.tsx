import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

type CartItem = { productId: string; quantity: number };
type Order = {
  id: string;
  date: string;
  items: { productId: string; quantity: number; price: number; name: string; image: string }[];
  total: number;
  shipping: { name: string; address: string; city: string; pincode: string; phone: string };
};
type User = { email: string; name: string };

type StoreCtx = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  placeOrder: (shipping: Order["shipping"]) => Order;
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (email: string, password: string, name: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

const KEYS = {
  cart: "cellecor.cart",
  wishlist: "cellecor.wishlist",
  orders: "cellecor.orders",
  user: "cellecor.user",
  users: "cellecor.users",
};

function load<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {
    /* noop */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load(KEYS.cart, []));
    setWishlist(load(KEYS.wishlist, []));
    setOrders(load(KEYS.orders, []));
    setUser(load<User | null>(KEYS.user, null));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save(KEYS.cart, cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) save(KEYS.wishlist, wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) save(KEYS.orders, orders); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) save(KEYS.user, user); }, [user, hydrated]);

  const value: StoreCtx = useMemo(() => {
    const productMap = new Map<string, Product>(products.map((p) => [p.id, p]));
    const cartTotal = cart.reduce((sum, item) => {
      const p = productMap.get(item.productId);
      return p ? sum + p.price * item.quantity : sum;
    }, 0);
    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

    return {
      cart,
      cartCount,
      cartTotal,
      addToCart: (productId, qty = 1) =>
        setCart((c) => {
          const existing = c.find((i) => i.productId === productId);
          if (existing) return c.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + qty } : i));
          return [...c, { productId, quantity: qty }];
        }),
      updateQuantity: (productId, quantity) =>
        setCart((c) =>
          quantity <= 0 ? c.filter((i) => i.productId !== productId) : c.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        ),
      removeFromCart: (productId) => setCart((c) => c.filter((i) => i.productId !== productId)),
      clearCart: () => setCart([]),
      wishlist,
      isWishlisted: (productId) => wishlist.includes(productId),
      toggleWishlist: (productId) =>
        setWishlist((w) => (w.includes(productId) ? w.filter((id) => id !== productId) : [...w, productId])),
      orders,
      placeOrder: (shipping) => {
        const order: Order = {
          id: `VLT-${Date.now().toString(36).toUpperCase()}`,
          date: new Date().toISOString(),
          items: cart.map((i) => {
            const p = productMap.get(i.productId)!;
            return { productId: i.productId, quantity: i.quantity, price: p.price, name: p.name, image: p.image };
          }),
          total: cartTotal,
          shipping,
        };
        setOrders((o) => [order, ...o]);
        setCart([]);
        return order;
      },
      user,
      login: (email, password) => {
        const users = load<Record<string, { password: string; name: string }>>(KEYS.users, {});
        const account = users[email.toLowerCase()];
        if (!account) return { ok: false, error: "No account found for this email." };
        if (account.password !== password) return { ok: false, error: "Incorrect password." };
        setUser({ email: email.toLowerCase(), name: account.name });
        return { ok: true };
      },
      signup: (email, password, name) => {
        const users = load<Record<string, { password: string; name: string }>>(KEYS.users, {});
        const k = email.toLowerCase();
        if (users[k]) return { ok: false, error: "An account with this email already exists." };
        users[k] = { password, name };
        save(KEYS.users, users);
        setUser({ email: k, name });
        return { ok: true };
      },
      logout: () => setUser(null),
    };
  }, [cart, wishlist, orders, user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
