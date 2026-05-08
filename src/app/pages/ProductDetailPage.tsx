import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Zap,
  ChevronRight,
  Users,
  Flame,
  ZoomIn,
} from "lucide-react";
import { useNavigate } from "react-router";
import { IMAGES, products } from "../data/products";
import { useAppState } from "../state/AppState";

const product = products[0]; // Amber Glow Rattan Lamp

const colorVariants = [
  { name: "Amber", hex: "#D4956A" },
  { name: "Ivory", hex: "#F5F0E8" },
  { name: "Sage", hex: "#9BAE9A" },
  { name: "Charcoal", hex: "#3A3A3A" },
];

const reviews = [
  {
    name: "Priya S.",
    location: "Koramangala",
    rating: 5,
    text: "Obsessed with this lamp! My room went from blah to Pinterest in 5 mins 🔥",
    image: IMAGES.cozyBedroom,
    date: "2 days ago",
  },
  {
    name: "Riya K.",
    location: "HSR Layout",
    rating: 5,
    text: "The warm glow is everything. Looks exactly like the photos. Fast delivery too!",
    image: IMAGES.softGirlRoom,
    date: "1 week ago",
  },
  {
    name: "Meera T.",
    location: "Indiranagar",
    rating: 4,
    text: "Exactly what I needed for my WFH setup. Totally aesthetic ✨",
    image: IMAGES.deskSetup,
    date: "1 week ago",
  },
];

const relatedProducts = products.slice(1, 5);

const galleryImages = [
  IMAGES.decorativeLamp,
  IMAGES.cozyBedroom,
  IMAGES.softGirlRoom,
  IMAGES.neutralBedroom,
];

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistIds } = useAppState();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => navigate("/app/cart"), 800);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative h-[380px] overflow-hidden bg-[#F0E8DE]">
          <img
            src={galleryImages[activeImage]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 ${zoomed ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-12 left-0 right-0 px-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
            >
              <ArrowLeft size={18} className="text-[#2C1A0E]" />
            </button>
            <div className="flex gap-2">
              <button
                className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                onClick={() => setZoomed((value) => !value)}
              >
                <ZoomIn size={16} className="text-[#2C1A0E]" />
              </button>
              <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                <Share2 size={16} className="text-[#2C1A0E]" />
              </button>
              <button
                className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart
                  size={16}
                  className={
                    wishlistIds.includes(product.id)
                      ? "fill-[#C4704F] text-[#C4704F]"
                      : "text-[#2C1A0E]"
                  }
                />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-14 left-4 flex flex-col gap-1.5 mt-4">
            <span className="bg-[#FF6B6B]/90 backdrop-blur-sm text-white text-[9px] font-semibold px-2.5 py-1 rounded-full">
              🔥 Viral on Pinterest
            </span>
          </div>

          {/* Gallery Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`rounded-full transition-all ${
                  i === activeImage
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar bg-white">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                i === activeImage ? "border-[#C4704F]" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white px-4 pb-5">
        {/* Social proof */}
        <div className="flex items-center gap-1.5 py-3 border-b border-[#F0E8DE]">
          <div className="flex items-center gap-1 bg-[#FFF3ED] px-2.5 py-1 rounded-full">
            <Users size={11} className="text-[#C4704F]" />
            <span className="text-[10px] font-semibold text-[#C4704F]">
              12 people in HSR bought this today
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#FFF3ED] px-2.5 py-1 rounded-full">
            <Flame size={11} className="text-[#C4704F]" />
            <span className="text-[10px] font-semibold text-[#C4704F]">
              Selling fast
            </span>
          </div>
        </div>

        <div className="pt-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-[10px] text-[#9A8570] font-medium uppercase tracking-wide">
                Slikk Home Decor
              </span>
              <h1
                className="text-[20px] font-bold text-[#2C1A0E] mt-0.5 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {product.name}
              </h1>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-[#FFF9ED] px-2.5 py-1 rounded-full">
              <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
              <span className="text-[12px] font-semibold text-[#2C1A0E]">
                {product.rating}
              </span>
            </div>
            <span className="text-[12px] text-[#9A8570]">
              {product.reviews} ratings
            </span>
            <span className="text-[12px] text-[#C4704F] font-medium">
              See all reviews →
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[24px] font-bold text-[#2C1A0E]">
              ₹{product.price}
            </span>
            <span className="text-[14px] text-[#B8A898] line-through">
              ₹{product.originalPrice}
            </span>
            <span className="bg-[#EAF4EA] text-[#7A9E7E] text-[11px] font-semibold px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          </div>

          {/* Delivery + Try&Buy */}
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-1.5 bg-[#FFF3ED] border border-[#F5D5C0] px-3 py-2 rounded-xl flex-1">
              <Zap size={13} className="text-[#C4704F]" />
              <div>
                <p className="text-[10px] font-semibold text-[#C4704F]">
                  Delivery in 60 mins
                </p>
                <p className="text-[9px] text-[#9A8570]">
                  HSR Layout · Free above ₹599
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#EAF4EA] border border-[#C5DFC5] px-3 py-2 rounded-xl">
              <span className="text-[10px] font-semibold text-[#5A8A5E]">
                Try &<br />
                Buy ✓
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Colour Variants */}
      <div className="bg-white mt-2 px-4 py-4">
        <p className="text-[13px] font-semibold text-[#2C1A0E] mb-3">
          Colour:{" "}
          <span className="text-[#C4704F]">
            {colorVariants[selectedColor].name}
          </span>
        </p>
        <div className="flex gap-3">
          {colorVariants.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(i)}
              className={`flex flex-col items-center gap-1 transition-all`}
            >
              <div
                className={`w-9 h-9 rounded-full border-2 transition-all ${
                  selectedColor === i
                    ? "border-[#C4704F] scale-110"
                    : "border-[#E5D8C8]"
                }`}
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[9px] text-[#9A8570]">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Aesthetic Tags */}
      <div className="bg-white mt-2 px-4 py-4">
        <p className="text-[13px] font-semibold text-[#2C1A0E] mb-2">
          Aesthetic Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Warm lighting",
            "Cozy vibes",
            "Pinterest core",
            "Renter-friendly",
            "Bedroom essential",
          ].map((tag) => (
            <span
              key={tag}
              className="bg-[#F5EDE3] text-[#7A5C4A] text-[11px] font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Complete the Room */}
      <div className="mt-2 px-4 py-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-[15px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Complete the Room ✨
          </h2>
          <button className="text-[11px] text-[#C4704F] font-semibold">
            View all →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {relatedProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/app/product/${p.id}`)}
              className="flex-shrink-0 w-[120px] rounded-2xl overflow-hidden bg-[#FAF7F2] cursor-pointer text-left"
            >
              <div className="h-[110px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-[11px] text-[#2C1A0E] font-medium leading-tight line-clamp-1">
                  {p.name}
                </p>
                <p className="text-[12px] font-bold text-[#C4704F] mt-0.5">
                  ₹{p.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-2 px-4 py-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2
              className="text-[15px] font-semibold text-[#2C1A0E]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reviews ⭐
            </h2>
            <p className="text-[11px] text-[#9A8570]">
              {product.reviews} verified buyers
            </p>
          </div>
          <div className="text-right">
            <span className="text-[24px] font-bold text-[#2C1A0E]">
              {product.rating}
            </span>
            <p className="text-[10px] text-[#9A8570]">out of 5</p>
          </div>
        </div>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.name} className="bg-[#FAF7F2] rounded-2xl p-3">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#2C1A0E]">
                      {r.name}
                    </span>
                    <span className="text-[10px] text-[#B8A898]">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={9}
                        className="fill-[#F5A623] text-[#F5A623]"
                      />
                    ))}
                    <span className="text-[10px] text-[#9A8570] ml-1">
                      · {r.location}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#7A5C4A] mt-1 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-32" />

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EDE5D8] px-4 py-3 shadow-[0_-10px_30px_rgba(56,36,17,0.08)] lg:bottom-0 lg:left-[288px] lg:right-0 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] gap-3">
          <div className="flex gap-3">
            <button
              className="flex-1 border-2 border-[#C4704F] text-[#C4704F] py-3.5 rounded-2xl text-[14px] font-semibold"
              onClick={() => navigate("/app/cart")}
            >
              Try & Buy
            </button>
            <button
              className={`flex-[2] py-3.5 rounded-2xl text-[14px] font-semibold transition-all ${
                added ? "bg-[#7A9E7E] text-white" : "bg-[#C4704F] text-white"
              }`}
              onClick={handleAddToCart}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
