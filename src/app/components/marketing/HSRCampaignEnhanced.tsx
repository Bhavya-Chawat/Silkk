import { MapPin, Clock, Tag, Heart, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { products, IMAGES } from "../../data/products";
import { useEffect, useMemo, useState } from "react";
import { useCampaignFlag } from "./useCampaignFlag";
import { trackEvent, selectABVariant } from "../../utils/analytics";

export default function HSRCampaignEnhanced() {
  const navigate = useNavigate();
  const { config, active } = useCampaignFlag("hsr");

  // A/B test variant selection
  const [variant, setVariant] = useState<string | null>(null);
  useEffect(() => {
    if (config?.abTest?.enabled && config.abTest.variants) {
      const selected = selectABVariant(
        config.abTest.variants,
        config.abTest.weights || [],
      );
      setVariant(selected);
      trackEvent("hsr_variant_assigned", { variant: selected });
    }
  }, [config]);

  // Sample localised picks for HSR micro-market
  const localPicks = products
    .filter((p) => p.tags.includes("Cozy") || p.tags.includes("Neutral tones"))
    .slice(0, 6);

  // Countdown state
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

  // Emit impression event
  useEffect(() => {
    if (active) {
      trackEvent("hsr_campaign_impression", {
        campaign: config?.name ?? "hsr",
        variant: variant ?? "unknown",
      });
    }
  }, [active, config, variant]);

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

  // Urgency indicators
  const isUrgent = remaining !== null && remaining < 3600000;
  const isVeryUrgent = remaining !== null && remaining < 1800000;

  if (!active) return null;

  // Variant A: "control" — balanced design
  if (variant === "control") {
    return (
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-[16px] font-semibold text-[#2C1A0E]">
              HSR Local — Today's Room Drops
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
                <Clock size={14} /> {fmtRemaining}
              </span>
            )}
          </div>
        </div>

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
                    trackEvent("hsr_campaign_cta_click", {
                      cta: "hero_shop",
                      variant: "control",
                    });
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
                  trackEvent("hsr_product_click", {
                    productId: p.id,
                    variant: "control",
                  });
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
                <p className="text-[12px] font-bold text-[#C4704F]">
                  ₹{p.price}
                </p>
              </button>
            ))}
          </div>
        </div>

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
              trackEvent("hsr_member_cta", { variant: "control" });
              navigate("/app/products");
            }}
          >
            Shop HSR
          </button>
        </div>
      </section>
    );
  }

  // Variant B: "urgency" — time-sensitive design
  if (variant === "urgency") {
    return (
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap
                size={16}
                className={isVeryUrgent ? "text-[#FF6B6B]" : "text-[#C4704F]"}
              />
              <h3
                className={`text-[16px] font-bold ${
                  isVeryUrgent ? "text-[#FF6B6B]" : "text-[#2C1A0E]"
                }`}
              >
                ⏱ Flash Sale — HSR Only
              </h3>
            </div>
            <p className="text-[11px] text-[#9A8570] mt-0.5">
              Limited time picks just for you
            </p>
          </div>
          {remaining !== null && (
            <div
              className={`text-center rounded-xl px-3 py-2 font-mono font-bold text-[18px] ${
                isVeryUrgent
                  ? "bg-[#FF6B6B] text-white animate-pulse"
                  : isUrgent
                    ? "bg-[#FFF3ED] text-[#C4704F]"
                    : "bg-[#F5EDE3] text-[#2C1A0E]"
              }`}
            >
              {fmtRemaining}
            </div>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden relative h-[200px] bg-[#F7EFE6] mb-4">
          <img
            src={IMAGES.homeDecorEditorial}
            alt="HSR hero"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              isVeryUrgent
                ? "bg-[#FF6B6B]/40"
                : "bg-gradient-to-t from-black/60 to-transparent"
            }`}
          />
          <div className="absolute top-3 right-3">
            <span
              className={`text-[12px] font-bold px-3 py-1 rounded-full ${
                isVeryUrgent
                  ? "bg-[#FF6B6B] text-white"
                  : "bg-[#C4704F] text-white"
              }`}
            >
              HURRY — Limited Stock
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => {
                trackEvent("hsr_campaign_cta_click", {
                  cta: "urgency_hero",
                  variant: "urgency",
                });
                navigate("/app/products");
              }}
              className={`px-6 py-3 rounded-2xl font-semibold text-white ${
                isVeryUrgent
                  ? "bg-[#FF6B6B] hover:bg-[#FF5252]"
                  : "bg-[#C4704F] hover:bg-[#B8563D]"
              }`}
            >
              Shop Now Before Sold Out →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-[#FFF3ED] p-3 text-center">
            <p className="text-[14px] font-bold text-[#C4704F]">30% OFF</p>
            <p className="text-[10px] text-[#7A5C4A]">Select items</p>
          </div>
          <div className="rounded-xl bg-[#EAF4EA] p-3 text-center">
            <p className="text-[14px] font-bold text-[#7A9E7E]">60 MIN</p>
            <p className="text-[10px] text-[#7A5C4A]">Delivery</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[12px] font-bold text-[#2C1A0E] mb-2">
            🔥 Trending Now in HSR
          </p>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {localPicks.slice(0, 4).map((p) => (
              <button
                key={p.id}
                type="button"
                className="flex-shrink-0 w-[140px] bg-white rounded-2xl p-2 shadow-sm text-left border-2 border-[#FFF3ED]"
                onClick={() => {
                  trackEvent("hsr_product_click", {
                    productId: p.id,
                    variant: "urgency",
                  });
                  navigate(`/app/product/${p.id}`);
                }}
              >
                <div className="h-[85px] rounded-xl overflow-hidden mb-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] font-medium text-[#2C1A0E] line-clamp-2">
                  {p.name}
                </p>
                <p className="text-[12px] font-bold text-[#FF6B6B]">
                  ₹{p.price}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Variant C: "premium" — sleek, curated design
  if (variant === "premium") {
    return (
      <section className="mt-6 px-4">
        <div className="rounded-[32px] overflow-hidden bg-gradient-to-r from-[#2C1A0E] to-[#3D2B1F] p-5 mb-4">
          <div className="flex items-start justify-between">
            <div className="text-white">
              <p className="text-[10px] uppercase tracking-widest text-[#F0C4B4] font-semibold">
                Curated collection
              </p>
              <h2
                className="text-[22px] font-bold mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HSR Essentials
              </h2>
              <p className="text-[12px] text-white/70 mt-1">
                Handpicked for your space
              </p>
            </div>
            {remaining !== null && (
              <div className="text-right">
                <p className="text-[10px] text-white/60 uppercase">
                  Offer ends
                </p>
                <p className="text-[16px] font-bold text-white font-mono mt-0.5">
                  {fmtRemaining}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {localPicks.slice(0, 3).map((p) => (
            <button
              key={p.id}
              type="button"
              className="rounded-2xl overflow-hidden bg-white shadow-sm text-left hover:shadow-md transition-all"
              onClick={() => {
                trackEvent("hsr_product_click", {
                  productId: p.id,
                  variant: "premium",
                });
                navigate(`/app/product/${p.id}`);
              }}
            >
              <div className="h-[100px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-[10px] font-semibold text-[#2C1A0E] line-clamp-1">
                  {p.name}
                </p>
                <p className="text-[11px] font-bold text-[#C4704F]">
                  ₹{p.price}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-[13px] font-semibold text-[#2C1A0E] mb-3">
            Complete Your Look
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                trackEvent("hsr_campaign_cta_click", {
                  cta: "premium_browse",
                  variant: "premium",
                });
                navigate("/app/products");
              }}
              className="w-full rounded-xl bg-[#2C1A0E] text-white py-3 text-[13px] font-semibold"
            >
              Browse All Picks
            </button>
            <button
              onClick={() => {
                trackEvent("hsr_member_cta", { variant: "premium" });
                navigate("/app/products");
              }}
              className="w-full rounded-xl border border-[#C4704F] text-[#C4704F] py-3 text-[13px] font-semibold"
            >
              Member Exclusive Deals
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
