import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Star,
  Heart,
  ChevronRight,
  Flame,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { IMAGES, products } from "../data/products";
import { useAppState } from "../state/AppState";

const categories = [
  { label: "Cozy Bedroom", emoji: "🛏️", bg: "bg-[#F5E6D3]" },
  { label: "Desk Glow-Up", emoji: "💻", bg: "bg-[#E8EFF5]" },
  { label: "Soft Girl Decor", emoji: "🌸", bg: "bg-[#F5E8EF]" },
  { label: "Hosting Essentials", emoji: "🕯️", bg: "bg-[#EFF5E8]" },
  { label: "Room Lighting", emoji: "✨", bg: "bg-[#F5F0E8]" },
  { label: "Cute Kitchen", emoji: "☕", bg: "bg-[#E8F5F0]" },
];

const sections = [
  {
    title: "Trending in HSR 🔥",
    subtitle: "What your neighbours are buying",
    ids: ["0", "2", "4"],
  },
  {
    title: "Viral on Pinterest ✨",
    subtitle: "Straight from your saved boards",
    ids: ["1", "3", "5"],
  },
  {
    title: "Creator Picks 🎨",
    subtitle: "Curated by Ananya & Priya",
    ids: ["6", "7", "0"],
  },
  {
    title: "Under ₹599 💸",
    subtitle: "Aesthetic on a budget",
    ids: ["2", "4", "6"],
  },
  {
    title: "Small-room Friendly 🪴",
    subtitle: "Space-saving pieces that still feel styled",
    ids: ["4", "7", "8"],
  },
  {
    title: "Renter-friendly Picks 🏡",
    subtitle: "Move-in friendly, no commitment energy",
    ids: ["1", "3", "8"],
  },
  {
    title: "Cozy Bedroom 🛏️",
    subtitle: "Warm lighting, soft layers, and calm corners",
    ids: ["0", "1", "7"],
  },
  {
    title: "WFH Desk Setup 💻",
    subtitle: "Desk accessories for creator energy",
    ids: ["5", "6", "3"],
  },
  {
    title: "Soft Girl Decor 🌸",
    subtitle: "Pastels, glow, and a little romance",
    ids: ["7", "0", "2"],
  },
  {
    title: "Hosting Essentials 🕯️",
    subtitle: "Lounge-ready details for guests",
    ids: ["2", "3", "4"],
  },
  {
    title: "New Drops ✨",
    subtitle: "Freshly launched in Slikk Spaces",
    ids: ["8", "5", "6"],
  },
];

function ProductCard({
  product,
  onNavigate,
}: {
  product: (typeof products)[0];
  onNavigate: () => void;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div
      className="flex-shrink-0 w-[170px] rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer"
      onClick={onNavigate}
    >
      <div className="relative h-[170px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#C4704F] text-[9px] font-semibold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}
        {product.sellingFast && (
          <span className="absolute bottom-2 left-2 bg-[#C4704F] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Flame size={8} /> Selling Fast
          </span>
        )}
        <button
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
        >
          <Heart
            size={13}
            className={
              wishlisted ? "fill-[#C4704F] text-[#C4704F]" : "text-[#9A8570]"
            }
          />
        </button>
      </div>
      <div className="p-2.5">
        {product.tryAndBuy && (
          <span className="text-[9px] text-[#7A9E7E] font-semibold bg-[#EAF4EA] px-1.5 py-0.5 rounded-full">
            Try & Buy
          </span>
        )}
        <p className="text-[12px] text-[#2C1A0E] font-medium mt-1 leading-tight line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={9} className="fill-[#F5A623] text-[#F5A623]" />
          <span className="text-[10px] text-[#7A5C4A]">{product.rating}</span>
          <span className="text-[10px] text-[#B8A898]">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[13px] font-semibold text-[#2C1A0E]">
            ₹{product.price}
          </span>
          <span className="text-[10px] text-[#B8A898] line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-[9px] text-[#7A9E7E] font-semibold">
            {discount}% off
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Zap size={9} className="text-[#C4704F]" />
          <span className="text-[9px] text-[#C4704F] font-medium">
            {product.delivery} delivery
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAppState();

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#C4704F]" />
              <span className="text-[12px] text-[#7A5C4A]">Delivering to</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[14px] font-semibold text-[#2C1A0E]">
                {user?.location ?? "HSR Layout, Bengaluru"}
              </span>
              <ChevronRight size={14} className="text-[#9A8570]" />
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#FFF3ED] px-2.5 py-1.5 rounded-full">
            <Clock size={12} className="text-[#C4704F]" />
            <span className="text-[11px] font-semibold text-[#C4704F]">
              60 mins
            </span>
          </div>
        </div>
        {/* Search bar */}
        <div
          className="flex items-center gap-2 bg-[#F5EDE3] rounded-2xl px-3.5 py-2.5"
          onClick={() => navigate("/app/search")}
        >
          <Search size={16} className="text-[#9A8570]" />
          <span className="text-[13px] text-[#B8A898]">
            Search home decor, lamps, rugs...
          </span>
        </div>
      </div>

      <div className="overflow-y-auto">
        {/* Hero Banner */}
        <div
          className="mx-4 mt-4 rounded-3xl overflow-hidden relative h-[200px] cursor-pointer"
          onClick={() => navigate("/app/home-decor")}
        >
          <img
            src={IMAGES.cozyBedroom}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-[10px] text-[#F0C4B4] font-semibold tracking-widest uppercase">
              New Category Drop ✨
            </span>
            <h1
              className="text-white text-[18px] font-bold leading-tight mt-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your room called.
              <br />
              It wants a glow-up.
            </h1>
            <button className="mt-2 bg-white text-[#C4704F] text-[11px] font-semibold px-4 py-1.5 rounded-full">
              Shop Home Decor →
            </button>
          </div>
        </div>

        {/* Secondary Banner */}
        <div className="mx-4 mt-3 rounded-2xl overflow-hidden relative h-[80px] cursor-pointer bg-gradient-to-r from-[#F5E6D3] to-[#F0D5BE]">
          <div className="absolute inset-0 flex items-center px-4 gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={IMAGES.softGirlRoom}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] text-[#C4704F] font-semibold tracking-wide uppercase">
                Pinterest Picks
              </p>
              <p
                className="text-[14px] font-bold text-[#2C1A0E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Under ₹699
              </p>
            </div>
            <span className="ml-auto text-[11px] text-[#C4704F] font-semibold">
              Shop →
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-5 px-4">
          <h2
            className="text-[15px] font-semibold text-[#2C1A0E] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Vibe
          </h2>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 ${cat.bg} rounded-2xl px-3 py-3 w-[80px]`}
                onClick={() => navigate("/app/products")}
              >
                <span className="text-[22px]">{cat.emoji}</span>
                <span className="text-[10px] text-[#2C1A0E] font-medium text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((section) => (
          <div key={section.title} className="mt-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <div>
                <h2
                  className="text-[15px] font-semibold text-[#2C1A0E]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.title}
                </h2>
                <p className="text-[11px] text-[#9A8570]">{section.subtitle}</p>
              </div>
              <button
                className="text-[11px] text-[#C4704F] font-semibold"
                onClick={() => navigate("/app/products")}
              >
                See all →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
              {section.ids.map((id) => {
                const p = products[parseInt(id)] || products[0];
                return (
                  <ProductCard
                    key={`${section.title}-${id}`}
                    product={p}
                    onNavigate={() => navigate(`/app/product/${p.id}`)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Creator CTA Banner */}
        <div
          className="mx-4 mt-6 mb-2 rounded-3xl overflow-hidden relative h-[130px] cursor-pointer"
          onClick={() => navigate("/app/creator/ananya")}
        >
          <img
            src={IMAGES.influencerRoom}
            alt="Creator"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-4">
            <div>
              <span className="text-[9px] text-[#F0C4B4] font-semibold tracking-widest uppercase">
                Creator Collection
              </span>
              <h3
                className="text-white text-[15px] font-bold mt-0.5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ananya's Cozy
                <br />
                WFH Setup ✨
              </h3>
              <button className="mt-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white text-[10px] font-semibold px-3 py-1 rounded-full">
                View Collection →
              </button>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
