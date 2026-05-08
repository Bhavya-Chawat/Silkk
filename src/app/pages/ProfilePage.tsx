import { IMAGES } from "../data/products";
import {
  ChevronRight,
  MapPin,
  Package,
  Heart,
  Gift,
  Star,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAppState } from "../state/AppState";

const menuItems = [
  { icon: Package, label: "My Orders", sub: "3 active orders" },
  { icon: Heart, label: "Saved Collections", sub: "12 collections" },
  { icon: Gift, label: "Refer & Earn", sub: "Earn ₹150 per referral" },
  { icon: Star, label: "Rewards & Coins", sub: "240 Slikk coins" },
  { icon: Settings, label: "Settings", sub: "" },
  { icon: HelpCircle, label: "Help & Support", sub: "" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAppState();
  const orders: Array<{ id: string; title: string; status: string }> = [];

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="bg-white px-4 pt-12 pb-5 border-b border-[#EDE5D8]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F0D5BE]">
            <img
              src={IMAGES.creatorWoman}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-[17px] font-bold text-[#2C1A0E]">
              {user?.name ?? "Priya Menon"}
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-[#C4704F]" />
              <span className="text-[12px] text-[#9A8570]">
                {user?.location ?? "HSR Layout, Bengaluru"}
              </span>
            </div>
            <span className="mt-1.5 inline-block bg-[#FFF3ED] text-[#C4704F] text-[10px] font-semibold px-2.5 py-1 rounded-full">
              ✨ Aesthetic Enthusiast
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: "Orders", value: "12" },
            { label: "Saved", value: "47" },
            { label: "Coins", value: "240" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#FAF7F2] rounded-xl py-2.5 text-center"
            >
              <p className="text-[16px] font-bold text-[#2C1A0E]">{s.value}</p>
              <p className="text-[10px] text-[#9A8570]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 mt-4 space-y-2">
        {menuItems.map(({ icon: Icon, label, sub }) => (
          <button
            key={label}
            className="w-full bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm"
          >
            <div className="w-9 h-9 bg-[#F5EDE3] rounded-xl flex items-center justify-center">
              <Icon size={17} className="text-[#C4704F]" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[13px] font-semibold text-[#2C1A0E]">
                {label}
              </p>
              {sub && <p className="text-[11px] text-[#9A8570]">{sub}</p>}
            </div>
            <ChevronRight size={16} className="text-[#B8A898]" />
          </button>
        ))}
      </div>
      <div className="px-4 mt-4">
        <div className="rounded-[28px] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2
                className="text-[15px] font-semibold text-[#2C1A0E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order history
              </h2>
              <p className="text-[11px] text-[#9A8570]">
                Recent room refreshes and bundles
              </p>
            </div>
            <span className="text-[11px] text-[#9A8570]">
              {orders.length} orders
            </span>
          </div>
          {orders.length === 0 ? (
            <div className="rounded-2xl bg-[#FAF7F2] p-4 text-center">
              <p className="text-[13px] font-semibold text-[#2C1A0E]">
                No orders yet.
              </p>
              <p className="mt-1 text-[12px] text-[#7A5C4A]">
                Your first cozy room refresh is waiting in the feed.
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="px-4 mt-4 mb-4">
        <button
          className="w-full border border-[#E5D8C8] rounded-2xl py-3 text-[13px] font-semibold text-[#9A8570]"
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
