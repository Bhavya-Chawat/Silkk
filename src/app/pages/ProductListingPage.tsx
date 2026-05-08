import { useState } from "react";
import { ArrowLeft, SlidersHorizontal, Star, Heart, Zap, Flame, X } from "lucide-react";
import { useNavigate } from "react-router";
import { products } from "../data/products";

const filters = ["Price", "Aesthetic", "Room Type", "Colour", "Fast Delivery"];
const aestheticTags = ["All", "Cozy", "Minimal", "Korean aesthetic", "Warm lighting", "Neutral tones"];
const sortOptions = ["Popular", "Price: Low-High", "Price: High-Low", "Newest"];

export default function ProductListingPage() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("All");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState("Popular");
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const filtered = activeTag === "All" ? products : products.filter((p) => p.tags.includes(activeTag));

  const discount = (p: typeof products[0]) =>
    Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-12 pb-3 border-b border-[#EDE5D8]">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-[#F5EDE3] flex items-center justify-center">
            <ArrowLeft size={18} className="text-[#2C1A0E]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[16px] font-semibold text-[#2C1A0E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Home Decor
            </h1>
            <p className="text-[11px] text-[#9A8570]">{filtered.length} curated products</p>
          </div>
          <button
            className="flex items-center gap-1.5 bg-[#F5EDE3] px-3 py-2 rounded-full"
            onClick={() => setShowFilterSheet(true)}
          >
            <SlidersHorizontal size={14} className="text-[#C4704F]" />
            <span className="text-[12px] font-semibold text-[#C4704F]">Filter</span>
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              className="flex-shrink-0 px-3 py-1.5 rounded-full border border-[#E5D8C8] text-[11px] font-medium text-[#7A5C4A] bg-white whitespace-nowrap"
            >
              {f} ▾
            </button>
          ))}
        </div>
      </div>

      {/* Aesthetic Tags */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {aestheticTags.map((tag) => (
            <button
              key={tag}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTag === tag
                  ? "bg-[#C4704F] text-white shadow-sm"
                  : "bg-white text-[#7A5C4A] border border-[#E5D8C8]"
              }`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Sort bar */}
      <div className="px-4 mt-3 flex items-center justify-between">
        <p className="text-[12px] text-[#9A8570]">{filtered.length} products</p>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {sortOptions.map((s) => (
            <button
              key={s}
              className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap ${
                activeSort === s ? "bg-[#2C1A0E] text-white" : "text-[#9A8570]"
              }`}
              onClick={() => setActiveSort(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3 pb-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="relative h-[185px]">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              {p.badge && (
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#C4704F] text-[8px] font-semibold px-2 py-0.5 rounded-full">
                  {p.badge}
                </span>
              )}
              {p.sellingFast && (
                <span className="absolute bottom-2 left-2 bg-[#C4704F] text-white text-[8px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Flame size={8} /> Selling Fast
                </span>
              )}
              <button
                className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
              >
                <Heart
                  size={13}
                  className={wishlist.includes(p.id) ? "fill-[#C4704F] text-[#C4704F]" : "text-[#9A8570]"}
                />
              </button>
              {p.tryAndBuy && (
                <span className="absolute bottom-2 right-2 bg-[#7A9E7E]/90 text-white text-[8px] font-semibold px-2 py-0.5 rounded-full">
                  Try & Buy
                </span>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-[12px] text-[#2C1A0E] font-medium leading-tight line-clamp-2 min-h-[30px]">
                {p.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Star size={9} className="fill-[#F5A623] text-[#F5A623]" />
                <span className="text-[10px] text-[#7A5C4A] font-medium">{p.rating}</span>
                <span className="text-[10px] text-[#B8A898]">({p.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[14px] font-bold text-[#2C1A0E]">₹{p.price}</span>
                <span className="text-[10px] text-[#B8A898] line-through">₹{p.originalPrice}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <Zap size={9} className="text-[#C4704F]" />
                  <span className="text-[9px] text-[#C4704F] font-medium">60 min</span>
                </div>
                <span className="text-[9px] text-[#7A9E7E] font-semibold bg-[#EAF4EA] px-1.5 py-0.5 rounded-full">
                  {discount(p)}% off
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bottom Sheet */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilterSheet(false)} />
          <div className="relative bg-white rounded-t-3xl p-5 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-semibold text-[#2C1A0E]">Filters</h3>
              <button onClick={() => setShowFilterSheet(false)} className="w-8 h-8 rounded-full bg-[#F5EDE3] flex items-center justify-center">
                <X size={16} className="text-[#2C1A0E]" />
              </button>
            </div>

            {[
              { label: "Price Range", options: ["Under ₹499", "₹499–₹699", "₹699–₹999", "₹999+"] },
              { label: "Aesthetic", options: ["Cozy", "Minimal", "Korean aesthetic", "Warm lighting", "Neutral tones"] },
              { label: "Room Type", options: ["Bedroom", "Living Room", "Kitchen", "Bathroom", "Study Room"] },
              { label: "Colour", options: ["Neutral", "Warm tones", "Pastels", "Moody darks", "Whites"] },
            ].map((section) => (
              <div key={section.label} className="mb-5">
                <p className="text-[13px] font-semibold text-[#2C1A0E] mb-2">{section.label}</p>
                <div className="flex flex-wrap gap-2">
                  {section.options.map((o) => (
                    <button key={o} className="px-3 py-1.5 rounded-full border border-[#E5D8C8] text-[11px] font-medium text-[#7A5C4A]">
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="w-full bg-[#C4704F] text-white py-3.5 rounded-2xl text-[14px] font-semibold"
              onClick={() => setShowFilterSheet(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
