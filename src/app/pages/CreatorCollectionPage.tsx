import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  BadgeCheck,
  Zap,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router";
import { IMAGES, products } from "../data/products";

const creatorProducts = [
  { ...products[0], tag: "Lamp", caption: "My fave corner lamp 🌟" },
  { ...products[5], tag: "Desk", caption: "The perfect WFH setup" },
  { ...products[1], tag: "Throw", caption: "Obsessed with this throw 🧣" },
  { ...products[2], tag: "Candle", caption: "Makes everything feel luxe ✨" },
  { ...products[3], tag: "Vase", caption: "Dried pampas hits different 🌿" },
  { ...products[6], tag: "Organiser", caption: "Keeping the desk cute 💕" },
];

const reelCards = [
  { image: IMAGES.deskSetup, views: "24K", caption: "My WFH setup tour" },
  { image: IMAGES.cozyBedroom, views: "18K", caption: "Bedroom glow-up ✨" },
  { image: IMAGES.softGirlRoom, views: "31K", caption: "Soft girl aesthetic" },
];

export default function CreatorCollectionPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [following, setFollowing] = useState(false);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Hero Banner */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={IMAGES.influencerRoom}
          alt="Creator Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Nav */}
        <div className="absolute top-12 left-0 right-0 px-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <Share2 size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Creator Info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <div className="flex items-end gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg flex-shrink-0">
              <img
                src={IMAGES.creatorWoman}
                alt="Ananya"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h1
                  className="text-white text-[18px] font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ananya Sharma
                </h1>
                <BadgeCheck
                  size={16}
                  className="text-[#6B9FFF] fill-[#6B9FFF]"
                />
              </div>
              <p className="text-white/80 text-[12px]">
                @ananya.creates · HSR Layout, Bengaluru
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-white text-[11px] font-medium">
                  48.2K followers
                </span>
                <span className="text-white/60 text-[11px]">·</span>
                <span className="text-white text-[11px] font-medium">
                  312 posts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow + Stats */}
      <div className="bg-white px-4 pt-4 pb-3 border-b border-[#EDE5D8]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#9A8570]">
              🌸 Lifestyle & Home Decor
            </span>
            <p className="text-[12px] text-[#7A5C4A] mt-0.5">
              Making budget apartments feel like Pinterest boards 🏡
            </p>
          </div>
          <button
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
              following
                ? "bg-[#F5EDE3] text-[#C4704F] border border-[#C4704F]"
                : "bg-[#C4704F] text-white"
            }`}
            onClick={() => setFollowing(!following)}
          >
            {following ? "Following ✓" : "Follow"}
          </button>
        </div>
        <div className="flex gap-4 mt-3">
          {[
            { label: "Products", value: "23" },
            { label: "Collections", value: "6" },
            { label: "Total Saves", value: "14.2K" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[15px] font-bold text-[#2C1A0E]">
                {stat.value}
              </p>
              <p className="text-[10px] text-[#9A8570]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Collection Title */}
      <div className="px-4 pt-5">
        <div className="bg-gradient-to-r from-[#F5E6D3] to-[#F0D5BE] rounded-3xl p-4">
          <span className="text-[10px] text-[#C4704F] font-semibold tracking-widest uppercase">
            Featured Collection
          </span>
          <h2
            className="text-[20px] font-bold text-[#2C1A0E] mt-1 leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            Ananya's Cozy
            <br />
            WFH Setup ✨
          </h2>
          <p className="text-[12px] text-[#7A5C4A] mt-1.5 leading-relaxed">
            Everything I use to make my rented apartment feel like a Pinterest
            board. All under ₹799!
          </p>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
              <span className="text-[11px] text-[#7A5C4A] font-medium">
                4.9 avg rating
              </span>
            </div>
            <span className="text-[#D5C5B0]">·</span>
            <div className="flex items-center gap-1">
              <Zap size={12} className="text-[#C4704F]" />
              <span className="text-[11px] text-[#C4704F] font-medium">
                All 60 min delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reels Inspiration */}
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[15px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Room Inspiration 🎬
          </h2>
          <button className="text-[11px] text-[#C4704F] font-semibold">
            View all →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {reelCards.map((reel) => (
            <div
              key={reel.caption}
              className="flex-shrink-0 w-[120px] relative rounded-2xl overflow-hidden h-[180px]"
            >
              <img
                src={reel.image}
                alt={reel.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <Play size={14} className="text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-[10px] font-medium leading-tight">
                  {reel.caption}
                </p>
                <p className="text-white/70 text-[9px] mt-0.5">
                  {reel.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[15px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop the Collection 🛍️
          </h2>
          <span className="text-[11px] text-[#9A8570]">
            {creatorProducts.length} items
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {creatorProducts.map((p) => (
            <div
              key={p.id + p.tag}
              className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="relative h-[160px]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#C4704F] text-[8px] font-semibold px-2 py-0.5 rounded-full">
                  {p.tag}
                </span>
                <button
                  className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id + p.tag);
                  }}
                >
                  <Heart
                    size={11}
                    className={
                      wishlist.includes(p.id + p.tag)
                        ? "fill-[#C4704F] text-[#C4704F]"
                        : "text-[#9A8570]"
                    }
                  />
                </button>
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-[10px] italic leading-tight">
                    "{p.caption}"
                  </p>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] text-[#2C1A0E] font-medium leading-tight line-clamp-1">
                  {p.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={9} className="fill-[#F5A623] text-[#F5A623]" />
                  <span className="text-[10px] text-[#7A5C4A]">{p.rating}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[14px] font-bold text-[#2C1A0E]">
                    ₹{p.price}
                  </span>
                  <button
                    className="bg-[#C4704F] text-white text-[9px] font-semibold px-2.5 py-1 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/app/cart");
                    }}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop All CTA */}
      <div className="px-4 mt-5 mb-6">
        <button
          className="w-full bg-[#2C1A0E] text-white py-4 rounded-2xl text-[14px] font-semibold"
          onClick={() => navigate("/app/products")}
        >
          Shop All of Ananya's Picks →
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
