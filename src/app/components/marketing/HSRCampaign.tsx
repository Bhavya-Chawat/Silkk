import { MapPin, Clock, Tag, Heart } from "lucide-react";
import { useNavigate } from "react-router";
import { products, IMAGES } from "../../data/products";
import { useEffect, useMemo, useState } from "react";
import { useCampaignFlag } from "./useCampaignFlag";
import { trackEvent } from "../../utils/analytics";

export default function HSRCampaign() {
  const navigate = useNavigate();
  const { config, active } = useCampaignFlag("hsr");

  // Sample localised picks for HSR micro-market (filter by renter-friendly / cozy)
  const localPicks = products
    .filter((p) => p.tags.includes("Cozy") || p.tags.includes("Neutral tones"))
    .slice(0, 6);

  // Countdown state for flash edit if end is present
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!config || !config.end) return;
    const end = new Date(config.end).getTime();

    function compute() {
      const now = Date.now();
      const diff = Math.max(0, end - now);
      setRemaining(diff);
    }

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [config]);

  // Emit impression event once on mount if active
  useEffect(() => {
    if (active) {
      trackEvent("hsr_campaign_impression", {
        campaign: config?.name ?? "hsr",
      });
    }
  }, [active, config]);

  const fmtRemaining = useMemo(() => {
    if (remaining === null) return null;
    const total = Math.floor(remaining / 1000);
    const hrs = Math.floor(total / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(total % 60)
      .toString()
      .padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }, [remaining]);

  if (!active) return null;

  return (
    <section className="mt-6 px-4">
      {/* Campaign Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[16px] font-semibold text-[#2C1A0E]">
            HSR Local — Today’s Room Drops
          </h3>
          <p className="text-[11px] text-[#9A8570]">
            Curated for HSR renters · 60-min delivery
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#7A5C4A]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF3ED] px-3 py-1 text-[#C4704F] font-semibold">
            <MapPin size={14} /> HSR
          </span>
          {remaining !== null && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F5EDE3] px-3 py-1">
              <Clock size={14} /> Ends in {fmtRemaining}
            </span>
          )}
        </div>
      </div>

      {/* Hero merchandising wireframe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="col-span-2 rounded-2xl overflow-hidden relative h-[180px] bg-[#F7EFE6]">
          <img
            src={IMAGES.homeDecorEditorial}
            alt="HSR hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 bottom-4 text-white">
            <p className="text-[11px] font-semibold">HSR Flash Edit</p>
            <h4
              className="text-[18px] font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Monsoon Cozy Picks
            </h4>
            <p className="text-[12px] text-white/80 mt-1">
              Up to 30% off — local stock
            </p>
            <div className="mt-2">
              <button
                onClick={() => {
                  trackEvent("hsr_campaign_cta_click", { cta: "hero_shop" });
                  navigate("/app/products");
                }}
                className="rounded-2xl bg-[#C4704F] px-3 py-2 text-white font-semibold"
              >
                Shop Flash Edit
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm flex items-center gap-3">
            <div className="rounded-xl bg-[#FFF3ED] p-3">
              <Tag size={18} className="text-[#C4704F]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold">Local Deal</p>
              <p className="text-[11px] text-[#9A8570]">
                Flat ₹150 off on orders ₹799+
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm flex items-center gap-3">
            <div className="rounded-xl bg-[#EAF4EA] p-3">
              <Heart size={18} className="text-[#7A9E7E]" />
            </div>
            <div>
              <p className="text-[12px] font-semibold">Local Favorites</p>
              <p className="text-[11px] text-[#9A8570]">
                Top-sellers in HSR this week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Local picks carousel (wireframe) */}
      <div className="mt-4">
        <p className="text-[13px] font-semibold text-[#2C1A0E] mb-2">
          HSR Picks — Quick Buys
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {localPicks.map((p) => (
            <button
              key={p.id}
              type="button"
              className="flex-shrink-0 w-[150px] bg-white rounded-2xl p-2 shadow-sm text-left"
              onClick={() => {
                trackEvent("hsr_product_click", { productId: p.id });
                navigate(`/app/product/${p.id}`);
              }}
            >
              <div className="h-[90px] rounded-xl overflow-hidden mb-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[12px] font-medium text-[#2C1A0E] line-clamp-2">
                {p.name}
              </p>
              <p className="text-[12px] font-bold text-[#C4704F]">₹{p.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Micro-campaign CTA strip */}
      <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#F5E6D3] to-[#F0D5BE] p-3 flex items-center justify-between">
        <div>
          <p className="text-[12px] text-[#7A5C4A]">HSR Member Day</p>
          <p className="text-[14px] font-bold text-[#2C1A0E]">
            Extra 10% off for Slikk members
          </p>
        </div>
        <button
          className="bg-[#C4704F] text-white px-4 py-2 rounded-2xl"
          onClick={() => {
            trackEvent("hsr_member_cta", {});
            navigate("/app/products");
          }}
        >
          Shop HSR
        </button>
      </div>
    </section>
  );
}
