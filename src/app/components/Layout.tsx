import { Outlet, useLocation, useNavigate } from "react-router";
import {
  Compass,
  Heart,
  Home,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";
import { BottomNav } from "./BottomNav";
import { useAppState } from "../state/AppState";

const navItems = [
  { icon: Home, label: "Home", path: "/app" },
  { icon: Search, label: "Search", path: "/app/search" },
  { icon: Compass, label: "Explore", path: "/app/explore" },
  { icon: Heart, label: "Wishlist", path: "/app/wishlist" },
  { icon: ShoppingBag, label: "Cart", path: "/app/cart" },
  { icon: User, label: "Profile", path: "/app/profile" },
];

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlistIds, user } = useAppState();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6eadc_0%,_#f4efe7_38%,_#ede4d5_100%)]">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-[#E8DED0] lg:bg-white/75 lg:backdrop-blur-xl lg:px-5 lg:py-6 lg:overflow-y-auto lg:h-screen lg:pb-24">
        <div className="rounded-[28px] bg-[#2C1A0E] px-5 py-5 text-white shadow-[0_24px_60px_rgba(44,26,14,0.16)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-36 items-center justify-start">
              <img
                src="/slikk_logo.png"
                alt="Slikk"
                className="h-9 object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-white/80">
            Trend-first home decor for Bangalore renters, creators, and quick
            room upgrades.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-2xl bg-white/10 px-3 py-2">HSR Layout</div>
            <div className="rounded-2xl bg-white/10 px-3 py-2">
              60 min delivery
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-2">Try & Buy</div>
            <div className="rounded-2xl bg-white/10 px-3 py-2">
              Creator picks
            </div>
          </div>
        </div>

        <nav className="mt-5 space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive =
              path === "/app"
                ? location.pathname === "/app"
                : location.pathname.startsWith(path);

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? "bg-[#FFF3ED] text-[#C4704F] shadow-sm"
                    : "text-[#7A5C4A] hover:bg-white hover:shadow-sm"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#C4704F]" : "text-[#9A8570]"}
                />
                <span className="text-[13px] font-semibold">{label}</span>
                {label === "Cart" && cartCount > 0 && (
                  <span className="ml-auto rounded-full bg-[#C4704F] px-2 py-0.5 text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
                {label === "Wishlist" && wishlistIds.length > 0 && (
                  <span className="ml-auto rounded-full bg-[#2C1A0E] px-2 py-0.5 text-[10px] font-semibold text-white">
                    {wishlistIds.length}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-[28px] bg-[#FAF7F2] p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#C4704F] font-semibold">
            Logged in
          </p>
          <p className="mt-2 text-[14px] font-semibold text-[#2C1A0E]">
            {user?.name ?? "Priya Menon"}
          </p>
          <p className="text-[12px] text-[#7A5C4A]">
            {user?.location ?? "HSR Layout, Bengaluru"}
          </p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <div className="mx-auto min-h-screen w-full max-w-[1600px] px-4 pb-[88px] pt-4 sm:px-6 lg:px-8 lg:pb-10">
          <div className="hidden lg:flex items-center justify-between rounded-[28px] border border-white/70 bg-white/70 px-5 py-4 backdrop-blur-xl shadow-[0_24px_60px_rgba(56,36,17,0.08)] mb-5">
            <div className="flex items-center">
              <img
                src="/slikk_logo.png"
                alt="Slikk"
                className="h-8 object-contain"
              />
            </div>
            <div className="flex items-center gap-3 text-[12px] text-[#7A5C4A]">
              <span className="rounded-full bg-[#FFF3ED] px-3 py-2 font-semibold text-[#C4704F]">
                60-minute delivery
              </span>
              <span className="rounded-full bg-[#F5EDE3] px-3 py-2 font-semibold">
                Try & Buy
              </span>
              <span className="rounded-full bg-[#F5EDE3] px-3 py-2 font-semibold">
                HSR Layout
              </span>
            </div>
          </div>

          <div className="pb-6">
            <Outlet />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
