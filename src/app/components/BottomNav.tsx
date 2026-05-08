import { Home, Compass, Heart, ShoppingBag, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useAppState } from "../state/AppState";

const navItems = [
  { icon: Home, label: "Home", path: "/app" },
  { icon: Compass, label: "Explore", path: "/app/explore" },
  { icon: Heart, label: "Wishlist", path: "/app/wishlist" },
  { icon: ShoppingBag, label: "Cart", path: "/app/cart" },
  { icon: User, label: "Profile", path: "/app/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlistIds } = useAppState();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#EDE5D8] bg-white/96 backdrop-blur-xl lg:hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(path);
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
            >
              <div
                className={`relative p-1 rounded-lg transition-all ${
                  isActive ? "bg-[#C4704F]/10" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-[#C4704F]" : "text-[#9A8570]"}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {label === "Cart" && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#C4704F] rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
                {label === "Wishlist" && wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-[#2C1A0E] rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
                    {wishlistIds.length}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-[#C4704F]" : "text-[#9A8570]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
