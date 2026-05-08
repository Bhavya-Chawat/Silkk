import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAppState } from "../state/AppState";
import { IMAGES } from "../data/products";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppState();
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState("1234");
  const [phase, setPhase] = useState<"phone" | "otp" | "done">("phone");

  return (
    <div
      className="min-h-screen bg-[linear-gradient(180deg,#fff7ef_0%,#f7ebdf_45%,#efe3d6_100%)] px-4 py-5 lg:px-8"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] w-full gap-4 rounded-[32px] bg-white/75 backdrop-blur-xl p-4 shadow-[0_30px_80px_rgba(56,36,17,0.12)] lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-5 lg:p-5">
        <div className="relative overflow-hidden rounded-[28px] bg-[#2C1A0E] p-5 text-white lg:min-h-[calc(100vh-4.5rem)] lg:p-8">
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(196,112,79,0.38),transparent_38%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#F0C4B4] font-semibold">
                Slikk Spaces
              </p>
              <h1
                className="mt-3 text-[34px] leading-[0.98] font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Login into the glow-up.
              </h1>
            </div>
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-md">
              <Sparkles size={20} />
            </div>
          </div>
          <p className="relative mt-4 max-w-[250px] text-[14px] leading-relaxed text-white/75">
            Warm, trend-first home decor for Bangalore renters with 60-minute
            delivery and Try & Buy.
          </p>

          <div className="relative mt-5 overflow-hidden rounded-[24px] border border-white/15">
            <img
              src={IMAGES.homeDecorEditorial}
              alt="Decor onboarding"
              className="h-[200px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                <ShieldCheck size={11} /> OTP verified login
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-white/85">
                Built for a modern Indian startup feel, not a generic
                marketplace.
              </p>
            </div>
          </div>

          <div className="relative mt-4 grid gap-2 text-[12px] text-white/75">
            <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-2 backdrop-blur-md">
              60-minute delivery in HSR Layout
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/8 px-3 py-2 backdrop-blur-md">
              Try & Buy for styling-first shopping
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-[#FAF7F2] p-5 shadow-inner lg:min-h-[calc(100vh-4.5rem)] lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#C4704F] font-semibold">
                Welcome back
              </p>
              <h2
                className="mt-2 text-[24px] font-semibold text-[#2C1A0E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Sign in to Slikk Spaces
              </h2>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-[#FFF3ED] flex items-center justify-center text-[#C4704F]">
              <Phone size={18} />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-[#2C1A0E]">
                Phone number
              </span>
              <div className="flex items-center gap-2 rounded-2xl border border-[#E6D9C9] bg-white px-4 py-3 shadow-sm">
                <span className="text-[13px] font-semibold text-[#7A5C4A]">
                  +91
                </span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#2C1A0E] outline-none placeholder:text-[#B8A898]"
                  placeholder="Enter mobile number"
                  inputMode="numeric"
                />
              </div>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {otp.split("").map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  onChange={(event) => {
                    const nextOtp = otp.split("");
                    nextOtp[index] = event.target.value.slice(-1);
                    setOtp(nextOtp.join(""));
                  }}
                  className="h-14 rounded-2xl border border-[#E6D9C9] bg-white text-center text-[18px] font-semibold text-[#2C1A0E] outline-none"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>

            <button
              className="w-full rounded-2xl bg-[#2C1A0E] py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-black/10"
              onClick={() => {
                login(phone);
                setPhase("done");
                navigate("/app", { replace: true });
              }}
            >
              Verify OTP & Continue
            </button>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E6D9C9] bg-white py-3.5 text-[14px] font-semibold text-[#2C1A0E]"
              onClick={() => setPhase("otp")}
            >
              <span>Continue with Google</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mt-5 rounded-[22px] bg-[#FFF8F2] p-4">
            <p className="text-[12px] font-semibold text-[#2C1A0E]">
              Login status
            </p>
            <div className="mt-2 flex items-center gap-2 text-[12px] text-[#7A5C4A]">
              {phase === "done" ? (
                <CheckCircle2 size={14} className="text-[#7A9E7E]" />
              ) : (
                <ArrowRight size={14} className="text-[#C4704F]" />
              )}
              <span>
                {phase === "done" ? "Verification complete" : "OTP flow ready"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
