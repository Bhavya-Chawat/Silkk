import { useState } from "react";
import { useNavigate } from "react-router";
import { Zap, ChevronRight } from "lucide-react";
import { useAppState } from "../state/AppState";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useAppState();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<"upi" | "card" | "cod">("upi");

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 49;
  const total = subtotal + shipping;

  const placeOrder = () => {
    // frontend-only flow: clear cart and navigate to confirmation
    clearCart();
    navigate("/app/confirmation", { replace: true });
  };

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] px-4 pb-28"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="pt-12">
        <h1
          className="text-[20px] font-semibold text-[#2C1A0E]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Checkout
        </h1>
        <p className="text-[12px] text-[#9A8570] mt-1">
          Confirm your details and place order
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <div className="bg-white rounded-2xl p-4">
          <label className="block text-[12px] text-[#7A5C4A]">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipient name"
            className="w-full mt-2 rounded-xl border border-[#E6D9C9] px-3 py-2"
          />
          <label className="block text-[12px] text-[#7A5C4A] mt-3">
            Delivery address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Flat / building / street / area"
            className="w-full mt-2 rounded-xl border border-[#E6D9C9] px-3 py-2 h-24"
          />
        </div>

        <div className="bg-white rounded-2xl p-4">
          <p className="text-[13px] font-semibold text-[#2C1A0E]">
            Payment method
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setMethod("upi")}
              className={`flex-1 rounded-2xl border px-3 py-2 ${method === "upi" ? "bg-[#FFF3ED] border-[#C4704F]" : ""}`}
            >
              UPI
            </button>
            <button
              onClick={() => setMethod("card")}
              className={`flex-1 rounded-2xl border px-3 py-2 ${method === "card" ? "bg-[#FFF3ED] border-[#C4704F]" : ""}`}
            >
              Card
            </button>
            <button
              onClick={() => setMethod("cod")}
              className={`flex-1 rounded-2xl border px-3 py-2 ${method === "cod" ? "bg-[#FFF3ED] border-[#C4704F]" : ""}`}
            >
              Cash on delivery
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4">
          <p className="text-[13px] font-semibold text-[#2C1A0E]">
            Order summary
          </p>
          <div className="mt-3 space-y-2">
            {cartItems.map((it) => (
              <div key={it.id} className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[#2C1A0E]">
                    {it.name}
                  </p>
                  <p className="text-[11px] text-[#9A8570]">
                    {it.quantity} × ₹{it.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-[#2C1A0E]">
                    ₹{it.price * it.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-[#F0E8DE] pt-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#9A8570]">Subtotal</span>
                <span className="text-[12px] font-medium">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[12px] text-[#9A8570]">Delivery</span>
                <span className="text-[12px] font-medium">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[14px] font-bold text-[#2C1A0E]">
                  Total
                </span>
                <span className="text-[16px] font-bold text-[#2C1A0E]">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-[76px] left-0 right-0 z-50 bg-white border-t border-[#EDE5D8] px-4 py-4 lg:bottom-0">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <div>
            <p className="text-[12px] text-[#9A8570]">Total</p>
            <p className="text-[16px] font-bold text-[#2C1A0E]">₹{total}</p>
          </div>
          <button
            onClick={placeOrder}
            className="flex items-center gap-2 rounded-2xl bg-[#C4704F] px-4 py-3 text-white font-semibold"
          >
            Place Order
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
