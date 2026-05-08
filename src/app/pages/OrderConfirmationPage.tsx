import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] px-4 pt-20"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-xl text-center bg-white rounded-2xl p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4EA] text-[#7A9E7E]">
          <CheckCircle2 size={28} />
        </div>
        <h1
          className="text-[20px] font-semibold text-[#2C1A0E] mt-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Thanks — your order is confirmed
        </h1>
        <p className="text-[13px] text-[#7A5C4A] mt-2">
          We’ll deliver your cozy room pieces in 60 minutes.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/app")}
            className="rounded-2xl bg-[#C4704F] px-4 py-2 text-white font-semibold"
          >
            Back to shopping
          </button>
        </div>
      </div>
    </div>
  );
}
