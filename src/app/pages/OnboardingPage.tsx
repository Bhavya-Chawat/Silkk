import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Sparkles, MousePointer2 } from "lucide-react";
import { useAppState } from "../state/AppState";
import { IMAGES } from "../data/products";

const onboardingSlides = [
  {
    title: "Pinterest-inspired homes in 60 mins",
    body: "Trend-first decor for renters, creators, and room refreshes that need to happen today.",
    image: IMAGES.softGirlRoom,
  },
  {
    title: "Try & Buy your favorite decor",
    body: "Style before you commit, keep the pieces you love, and send back the ones that do not fit.",
    image: IMAGES.influencerRoom,
  },
  {
    title: "Affordable aesthetics for every room",
    body: "Warm, cozy, and creator-approved sets that make a Bangalore apartment feel finished fast.",
    image: IMAGES.cozyBedroom,
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppState();
  const [activeSlide, setActiveSlide] = useState(0);

  const slide = useMemo(() => onboardingSlides[activeSlide], [activeSlide]);

  return (
    <div
      className="min-h-screen bg-[linear-gradient(180deg,#f9efe4_0%,#f6ede4_45%,#efe2d5_100%)] px-4 py-6 lg:px-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full gap-4 rounded-[32px] bg-white/70 backdrop-blur-xl p-4 shadow-[0_30px_80px_rgba(56,36,17,0.12)] lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-5 lg:p-5">
        <div className="flex items-center justify-between px-2 pt-2 lg:col-span-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#C4704F] font-semibold">
              Slikk Spaces
            </p>
            <p className="text-[12px] text-[#7A5C4A]">
              A new category, not a new app.
            </p>
          </div>
          <button
            className="rounded-full bg-[#F5EDE3] px-4 py-2 text-[12px] font-semibold text-[#2C1A0E]"
            onClick={() => {
              completeOnboarding();
              navigate("/login", { replace: true });
            }}
          >
            Skip
          </button>
        </div>

        <div className="mt-4 rounded-[28px] overflow-hidden relative h-[54vh] min-h-[420px] shadow-xl lg:mt-0 lg:h-auto lg:min-h-[calc(100vh-8rem)]">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white flex items-center gap-2">
            <Sparkles size={11} /> Glow-up mode
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#F0C4B4] font-semibold">
              <MousePointer2 size={12} /> Swipe through the launch
            </div>
            <h1
              className="text-[30px] leading-[0.98] font-semibold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {slide.title}
            </h1>
            <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed text-white/80">
              {slide.body}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar lg:hidden">
          {onboardingSlides.map((item, index) => (
            <button
              key={item.title}
              className={`snap-start flex min-w-[78%] items-center gap-3 rounded-[24px] border p-3 text-left transition-all ${
                activeSlide === index
                  ? "bg-[#2C1A0E] border-[#2C1A0E] text-white"
                  : "bg-white border-[#EADFD1] text-[#2C1A0E]"
              }`}
              onClick={() => setActiveSlide(index)}
            >
              <div className="h-16 w-16 overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-[10px] font-semibold uppercase tracking-[0.25em] ${activeSlide === index ? "text-[#F0C4B4]" : "text-[#C4704F]"}`}
                >
                  Step {index + 1}
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-tight">
                  {item.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between px-2 pb-2 lg:hidden">
          <div className="flex gap-2">
            {onboardingSlides.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all ${activeSlide === index ? "w-8 bg-[#2C1A0E]" : "w-2 bg-[#D8C7B5]"}`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-[#C4704F] px-5 py-3 text-[13px] font-semibold text-white shadow-lg shadow-[#C4704F]/20"
            onClick={() => {
              if (activeSlide < onboardingSlides.length - 1) {
                setActiveSlide((value) => value + 1);
                return;
              }

              completeOnboarding();
              navigate("/login", { replace: true });
            }}
          >
            {activeSlide < onboardingSlides.length - 1 ? "Next" : "Continue"}
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="hidden lg:flex flex-col justify-between rounded-[28px] bg-[#FAF7F2] p-6 shadow-inner lg:min-h-[calc(100vh-8rem)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C4704F] font-semibold">
              Swipe the launch
            </p>
            <h2
              className="mt-2 text-[28px] font-semibold text-[#2C1A0E]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Three screens to introduce the category.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#7A5C4A]">
              This is the web version of the Slikk Spaces launch flow, with
              wider panels and more breathing room for desktop.
            </p>
          </div>
          <div className="space-y-3">
            {onboardingSlides.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setActiveSlide(index)}
                className={`w-full rounded-[24px] border p-3 text-left transition-all ${
                  activeSlide === index
                    ? "bg-[#2C1A0E] border-[#2C1A0E] text-white"
                    : "bg-white border-[#EADFD1] text-[#2C1A0E]"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-70">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-[14px] font-semibold">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
