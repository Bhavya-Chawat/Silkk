import { ArrowLeft, Heart, Share2, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { IMAGES, products } from "../data/products";
import HSRCampaignEnhanced from "../components/marketing/HSRCampaignEnhanced";
import { useCampaignFlag } from "../components/marketing/useCampaignFlag";

const collections = [
  {
    title: "Cozy Monsoon Room",
    tag: "viral",
    image: IMAGES.monsoonRoom,
    bg: "from-[#2C3E50]",
  },
  {
    title: "WFH Setup",
    tag: "new launch",
    image: IMAGES.deskSetup,
    bg: "from-[#3D2B1F]",
  },
  {
    title: "Sunday Reset",
    tag: "renter-friendly",
    image: IMAGES.throwBlanket,
    bg: "from-[#2D3A2E]",
  },
  {
    title: "Date Night Hosting",
    tag: "limited drop",
    image: IMAGES.dateNight,
    bg: "from-[#3A1A2E]",
  },
  {
    title: "Minimalist Bedroom",
    tag: "renter-friendly",
    image: IMAGES.neutralBedroom,
    bg: "from-[#2A2A2A]",
  },
  {
    title: "Pinterest Core",
    tag: "viral",
    image: IMAGES.softGirlRoom,
    bg: "from-[#3E2C3F]",
  },
];

const tagColors: Record<string, string> = {
  viral: "bg-[#FF6B6B]/90 text-white",
  "renter-friendly": "bg-[#7A9E7E]/90 text-white",
  "limited drop": "bg-[#C4704F]/90 text-white",
  "new launch": "bg-[#6B7AFF]/90 text-white",
};

const bundleProducts = products.slice(0, 4);

export default function HomeDecorPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Back Nav */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-4 pt-12 pb-3 flex items-center justify-between border-b border-[#EDE5D8]">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-[#F5EDE3] flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-[#2C1A0E]" />
        </button>
        <div className="text-center">
          <p className="text-[11px] text-[#9A8570] font-medium">Collection</p>
          <h1
            className="text-[15px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Home Decor
          </h1>
        </div>
        <button className="w-9 h-9 rounded-full bg-[#F5EDE3] flex items-center justify-center">
          <Share2 size={16} className="text-[#2C1A0E]" />
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={IMAGES.homeDecorEditorial}
          alt="Home Decor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[9px] tracking-widest text-[#F0C4B4] font-semibold uppercase">
            New Category — Just Launched 🎉
          </span>
          <h2
            className="text-white text-[26px] font-bold leading-tight mt-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            Make your space
            <br />
            Pinterest-worthy.
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
              <Zap size={11} className="text-[#F0C4B4]" />
              60 min delivery
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
              Try & Buy Available
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Vibe */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[17px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shop by Vibe 🌙
          </h2>
          <span className="text-[11px] text-[#9A8570]">6 collections</span>
        </div>

        {/* Big featured card */}
        <div
          className="relative h-[200px] rounded-3xl overflow-hidden mb-3 cursor-pointer"
          onClick={() => navigate("/app/products")}
        >
          <img
            src={collections[0].image}
            alt={collections[0].title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${collections[0].bg} to-transparent opacity-70`}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span
              className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${tagColors[collections[0].tag]}`}
            >
              {collections[0].tag}
            </span>
            <h3
              className="text-white text-[18px] font-semibold mt-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {collections[0].title}
            </h3>
            <p className="text-white/70 text-[11px]">12 curated products</p>
          </div>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-3">
          {collections.slice(1).map((col) => (
            <div
              key={col.title}
              className="relative h-[150px] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => navigate("/app/products")}
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${col.bg} to-transparent opacity-70`}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <span
                  className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${tagColors[col.tag]}`}
                >
                  {col.tag}
                </span>
                <p
                  className="text-white text-[12px] font-semibold mt-0.5 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {col.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HSR Campaign (enhanced wireframe with A/B variants) */}
      {(() => {
        const { active } = useCampaignFlag("hsr");
        return active ? <HSRCampaignEnhanced /> : null;
      })()}

      {/* Room Bundles */}
      <div className="mt-7 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2
              className="text-[17px] font-semibold text-[#2C1A0E]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Room Bundles 🏡
            </h2>
            <p className="text-[11px] text-[#9A8570]">
              Complete looks, one tap
            </p>
          </div>
          <button className="text-[11px] text-[#C4704F] font-semibold">
            See all →
          </button>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm">
          <div className="relative h-[140px] rounded-2xl overflow-hidden mb-3">
            <img
              src={IMAGES.influencerRoom}
              alt="Bundle"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-[#C4704F] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
              Save ₹400
            </div>
          </div>
          <h3 className="text-[14px] font-semibold text-[#2C1A0E]">
            The Cozy Bedroom Bundle
          </h3>
          <p className="text-[11px] text-[#9A8570] mt-0.5">
            Lamp + Throw + Candle Set + Cushion
          </p>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-[16px] font-bold text-[#2C1A0E]">
                ₹1,799
              </span>
              <span className="text-[11px] text-[#B8A898] line-through ml-2">
                ₹2,199
              </span>
            </div>
            <button
              className="bg-[#C4704F] text-white text-[12px] font-semibold px-4 py-2 rounded-full"
              onClick={() => navigate("/app/cart")}
            >
              Add Bundle →
            </button>
          </div>
        </div>
      </div>

      {/* Complete the Look */}
      <div className="mt-7 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[17px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Complete the Look ✨
          </h2>
          <button className="text-[11px] text-[#C4704F] font-semibold">
            See all →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {bundleProducts.map((p) => (
            <div
              key={p.id}
              className="flex-shrink-0 w-[130px] rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer"
              onClick={() => navigate(`/app/product/${p.id}`)}
            >
              <div className="relative h-[130px]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                  <Heart size={11} className="text-[#9A8570]" />
                </button>
              </div>
              <div className="p-2">
                <p className="text-[11px] text-[#2C1A0E] font-medium leading-tight line-clamp-1">
                  {p.name}
                </p>
                <p className="text-[12px] font-semibold text-[#C4704F] mt-0.5">
                  ₹{p.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Curated */}
      <div
        className="mt-7 mx-4 mb-4 rounded-3xl overflow-hidden relative h-[140px] cursor-pointer"
        onClick={() => navigate("/app/creator/ananya")}
      >
        <img
          src={IMAGES.creatorWoman}
          alt="Creator"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
        <div className="absolute inset-0 flex items-center px-4">
          <div>
            <span className="text-[9px] text-[#F0C4B4] font-semibold tracking-widest uppercase">
              Creator Curated
            </span>
            <h3
              className="text-white text-[16px] font-bold mt-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ananya's Picks
            </h3>
            <p className="text-white/70 text-[11px]">48K followers love this</p>
            <button className="mt-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-semibold px-3 py-1 rounded-full">
              See Collection →
            </button>
          </div>
        </div>
      </div>

      <div className="h-4" />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
