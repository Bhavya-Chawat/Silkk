import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products, type Product } from "../data/products";

type User = {
  name: string;
  phone: string;
  location: string;
};

type CartItem = Product & { quantity: number };

type AppStateContextValue = {
  user: User | null;
  onboardingComplete: boolean;
  authenticated: boolean;
  wishlistIds: string[];
  cartItems: CartItem[];
  cartCount: number;
  login: (phone: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
  toggleWishlist: (productId: string) => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEYS = {
  user: "sklikk-user",
  onboarding: "sklikk-onboarding",
  wishlist: "sklikk-wishlist",
  cart: "sklikk-cart",
};

const defaultCart = products.slice(0, 3).map((product, index) => ({
  ...product,
  quantity: index === 2 ? 2 : 1,
}));

const AppStateContext = createContext<AppStateContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    readStorage<User | null>(STORAGE_KEYS.user, null),
  );
  const [onboardingComplete, setOnboardingComplete] = useState(() =>
    readStorage<boolean>(STORAGE_KEYS.onboarding, false),
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.wishlist, []),
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.cart, defaultCart),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (user) {
      window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEYS.onboarding,
      JSON.stringify(onboardingComplete),
    );
  }, [onboardingComplete]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEYS.wishlist,
      JSON.stringify(wishlistIds),
    );
  }, [wishlistIds]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
  }, [cartItems]);

  const value = useMemo<AppStateContextValue>(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      user,
      onboardingComplete,
      authenticated: Boolean(user),
      wishlistIds,
      cartItems,
      cartCount,
      login: (phone) =>
        setUser({
          name: "Priya Menon",
          phone,
          location: "HSR Layout, Bengaluru",
        }),
      logout: () => setUser(null),
      completeOnboarding: () => setOnboardingComplete(true),
      toggleWishlist: (productId) => {
        setWishlistIds((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        );
      },
      addToCart: (product) => {
        setCartItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }

          return [...current, { ...product, quantity: 1 }];
        });
      },
      updateCartQuantity: (productId, quantity) => {
        setCartItems((current) =>
          current
            .map((item) =>
              item.id === productId ? { ...item, quantity } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      clearCart: () => setCartItems([]),
    };
  }, [cartItems, onboardingComplete, user, wishlistIds]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
