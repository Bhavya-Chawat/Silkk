import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search, Sparkles, TrendingUp } from "lucide-react";
import { IMAGES, products } from "../data/products";

const suggestions = [
  "Cozy room decor",
  "Desk setup",
  "Warm lamps",
  "Neutral bedding",
  "Cute mugs",
];
const trending = ["Pinterest aesthetic", "Room glow-up", "Host-ready homes"];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return products.slice(0, 6);
    }

    return products.filter((product) =>
      `${product.name} ${product.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-12 pb-3 border-b border-[#EDE5D8]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-[#F5EDE3] flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-[#2C1A0E]" />
          </button>
          <div className="flex-1 rounded-2xl bg-[#F5EDE3] px-3 py-2.5 flex items-center gap-2">
            <Search size={16} className="text-[#9A8570]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search home decor, lamps, rugs..."
              className="w-full bg-transparent text-[13px] text-[#2C1A0E] outline-none placeholder:text-[#B8A898]"
            />
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-[28px] overflow-hidden bg-[#2C1A0E] text-white p-4 shadow-xl relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,112,79,0.3),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_38%)]" />
          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#F0C4B4] font-semibold">
                Trending Search
              </p>
              <h1
                className="mt-2 text-[24px] leading-[1.0] font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Search the next room glow-up.
              </h1>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Sparkles size={22} />
            </div>
          </div>
          <div className="relative mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {trending.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="rounded-full bg-white/10 px-3 py-2 text-[11px] font-medium whitespace-nowrap backdrop-blur-md"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[13px] font-semibold text-[#2C1A0E] mb-2">
            Suggestions
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="rounded-full border border-[#E5D8C8] bg-white px-3 py-2 text-[11px] font-medium text-[#7A5C4A]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-[#2C1A0E]">Shop fast</p>
          <span className="text-[11px] text-[#9A8570]">
            {results.length} results
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 pb-6">
          {results.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-sm"
              onClick={() => navigate(`/app/product/${product.id}`)}
            >
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                    Fast delivery
                  </p>
                  <p
                    className="text-[14px] font-semibold mt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {product.name}
                  </p>
                </div>
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-semibold text-[#C4704F]">
                  Try & Buy
                </span>
              </div>
              <div className="p-3">
                <p className="text-[12px] text-[#7A5C4A]">
                  ₹{product.price} · {product.tags.join(" • ")}
                </p>
                <p className="mt-1 text-[11px] text-[#9A8570]">
                  Delivered in 60 mins from HSR Layout
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[26px] bg-[#FFF8F2] p-4">
          <div className="flex items-center gap-2 text-[#C4704F]">
            <TrendingUp size={14} />
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em]">
              Trending now
            </p>
          </div>
          <div className="mt-3 grid gap-2 text-[13px] text-[#2C1A0E]">
            {trending.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm"
              >
                <span>{item}</span>
                <span className="text-[#C4704F]">Search</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
