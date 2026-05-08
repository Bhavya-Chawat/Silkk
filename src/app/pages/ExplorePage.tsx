import { useNavigate } from "react-router";
import { IMAGES } from "../data/products";
import { Search } from "lucide-react";

const exploreGrid = [
  { title: "Soft Girl Aesthetic", image: IMAGES.softGirlRoom, tag: "viral" },
  { title: "WFH Glow-Up", image: IMAGES.deskSetup, tag: "new" },
  { title: "Monsoon Vibes", image: IMAGES.monsoonRoom, tag: "trending" },
  { title: "Date Night", image: IMAGES.dateNight, tag: "limited" },
  { title: "Minimal & Clean", image: IMAGES.neutralBedroom, tag: "popular" },
  { title: "Kitchen Cuteness", image: IMAGES.cuteKitchen, tag: "new" },
  { title: "Candlelit Corner", image: IMAGES.candles, tag: "viral" },
  { title: "Plant Parent", image: IMAGES.plantVase, tag: "trending" },
];

const tagColors: Record<string, string> = {
  viral: "bg-[#FF6B6B]/90",
  new: "bg-[#6B7AFF]/90",
  trending: "bg-[#C4704F]/90",
  limited: "bg-[#9B59B6]/90",
  popular: "bg-[#7A9E7E]/90",
};

export default function ExplorePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-12 pb-3 border-b border-[#EDE5D8]">
        <h1
          className="text-[18px] font-bold text-[#2C1A0E] mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Explore ✨
        </h1>
        <div className="flex items-center gap-2 bg-[#F5EDE3] rounded-2xl px-3.5 py-2.5">
          <Search size={16} className="text-[#9A8570]" />
          <span className="text-[13px] text-[#B8A898]">
            Search styles, products, vibes...
          </span>
        </div>
      </div>
      <div className="px-4 pt-4 columns-2 gap-3">
        {exploreGrid.map((item, i) => (
          <div
            key={item.title}
            className={`mb-3 rounded-2xl overflow-hidden relative cursor-pointer ${
              i % 3 === 0 ? "h-[200px]" : "h-[150px]"
            }`}
            onClick={() => navigate("/app/products")}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <span
                className={`text-[8px] font-semibold text-white px-1.5 py-0.5 rounded-full ${tagColors[item.tag]}`}
              >
                {item.tag}
              </span>
              <p className="text-white text-[12px] font-semibold mt-0.5 leading-tight">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
