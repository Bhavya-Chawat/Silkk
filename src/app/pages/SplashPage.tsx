import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Truck } from "lucide-react";
import { useAppState } from "../state/AppState";

export default function SplashPage() {
  const navigate = useNavigate();
  const { authenticated, onboardingComplete } = useAppState();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (authenticated) {
        navigate("/app", { replace: true });
        return;
      }

      navigate(onboardingComplete ? "/login" : "/onboarding", {
        replace: true,
      });
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [authenticated, navigate, onboardingComplete]);

  return (
    <div
      className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ef_0%,_#f7e9db_46%,_#efe1d1_100%)] px-4 py-4 lg:px-8 lg:py-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="relative min-h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[32px] border border-white/70 bg-white/55 px-6 py-12 text-center shadow-[0_30px_80px_rgba(56,36,17,0.12)] backdrop-blur-xl lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-6 lg:px-8 lg:py-8 lg:text-left">
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(135deg,rgba(196,112,79,0.12),transparent_35%,rgba(122,158,126,0.12)_72%,transparent)]" />
        <div className="relative lg:flex lg:flex-col lg:justify-center lg:min-h-[calc(100vh-6rem)]">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#2C1A0E] text-white shadow-xl animate-pulse lg:mx-0">
            <Sparkles size={30} />
          </div>
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C4704F]">
            Slikk Spaces
          </p>
          <h1
            className="relative mt-3 text-[38px] leading-[0.95] font-semibold text-[#2C1A0E] lg:text-[64px]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your room called.
            <br />
            It wants a glow-up.
          </h1>
          <p className="relative mt-4 text-[14px] leading-relaxed text-[#7A5C4A] max-w-[300px] mx-auto lg:mx-0 lg:max-w-[440px] lg:text-[16px]">
            Pinterest-inspired decor, creator-led drops, and 60-minute delivery
            built for Bangalore homes.
          </p>

          <div className="relative mt-8 grid gap-3 text-left lg:max-w-[460px]">
            {[
              "Launching in HSR Layout",
              "Try & Buy for decor styling",
              "Affordable room glow-ups, fast",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-[#FAF7F2] px-4 py-3 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF3ED] text-[#C4704F]">
                  <Truck size={16} />
                </div>
                <p className="text-[13px] font-medium text-[#2C1A0E]">{item}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-8 flex justify-center gap-2 lg:justify-start">
            <span className="h-2 w-8 rounded-full bg-[#2C1A0E]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C7B5]" />
            <span className="h-2 w-2 rounded-full bg-[#D8C7B5]" />
          </div>
        </div>

        <div className="relative hidden rounded-[28px] bg-[#2C1A0E] p-6 text-white shadow-[0_24px_60px_rgba(44,26,14,0.16)] lg:flex lg:flex-col lg:justify-between lg:min-h-[calc(100vh-6rem)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#F0C4B4] font-semibold">
              Web launch view
            </p>
            <h2
              className="mt-3 text-[28px] font-semibold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Desktop-friendly, category-first, and ready for launch.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">
              The app now uses the browser width properly, with a wider auth
              flow and a left rail for the commerce shell.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div className="rounded-2xl bg-white/10 px-3 py-3">Urban Gen Z</div>
            <div className="rounded-2xl bg-white/10 px-3 py-3">
              Creator inspired
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-3">
              60-minute delivery
            </div>
            <div className="rounded-2xl bg-white/10 px-3 py-3">Try & Buy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
