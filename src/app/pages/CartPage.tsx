import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Zap,
  Heart,
  ChevronRight,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router";
import { products } from "../data/products";
import { useAppState } from "../state/AppState";

const upsellProducts = products.slice(3, 7);

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems: cart,
    addToCart,
    clearCart,
    updateCartQuantity,
  } = useAppState();
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = cart.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0,
  );
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 49;
  const promoDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingFee - promoDiscount;
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-12 pb-3 border-b border-[#EDE5D8] flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-[#F5EDE3] flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-[#2C1A0E]" />
        </button>
        <div className="flex-1">
          <h1
            className="text-[16px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            My Cart
          </h1>
          <p className="text-[11px] text-[#9A8570]">{cart.length} items</p>
        </div>
        <button
          className="text-[11px] font-semibold text-[#C4704F]"
          onClick={clearCart}
        >
          Clear all
        </button>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-2xl px-4 py-3">
        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
          <div className="flex items-center gap-2">
            <span className="text-[13px]">🎉</span>
            <p className="text-[12px] font-semibold text-[#7A9E7E]">
              You've unlocked FREE delivery!
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] text-[#7A5C4A]">
                Add{" "}
                <span className="font-semibold text-[#C4704F]">
                  ₹{FREE_SHIPPING_THRESHOLD - subtotal}
                </span>{" "}
                more for free delivery
              </p>
              <Zap size={13} className="text-[#C4704F]" />
            </div>
            <div className="h-2 bg-[#F0E8DE] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C4704F] to-[#E8956A] rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="mx-4 mt-4 rounded-[28px] bg-white px-5 py-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3ED] text-[#C4704F]">
            <Heart size={24} />
          </div>
          <h2
            className="mt-4 text-[20px] font-semibold text-[#2C1A0E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your future cozy room starts here.
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#7A5C4A]">
            Save the pieces you love, build a bundle, and get a room glow-up
            delivered in 60 minutes.
          </p>
          <button
            className="mt-5 rounded-2xl bg-[#C4704F] px-5 py-3 text-[13px] font-semibold text-white"
            onClick={() => navigate("/app")}
          >
            Start shopping
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 mt-4 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm"
              >
                <div
                  className="w-[80px] h-[80px] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/app/product/${item.id}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#2C1A0E] leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  {item.tryAndBuy && (
                    <span className="inline-block mt-1 text-[9px] text-[#7A9E7E] font-semibold bg-[#EAF4EA] px-1.5 py-0.5 rounded-full">
                      Try & Buy
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[15px] font-bold text-[#2C1A0E]">
                        ₹{item.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-[#B8A898] line-through ml-1">
                        ₹{item.originalPrice * item.quantity}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="w-7 h-7 rounded-full bg-[#F5EDE3] flex items-center justify-center"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                      >
                        {item.quantity === 1 ? (
                          <Trash2 size={12} className="text-[#C4704F]" />
                        ) : (
                          <Minus size={12} className="text-[#7A5C4A]" />
                        )}
                      </button>
                      <span className="text-[13px] font-semibold text-[#2C1A0E] w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-7 h-7 rounded-full bg-[#C4704F] flex items-center justify-center"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={12} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <h2
                className="text-[15px] font-semibold text-[#2C1A0E]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Complete your room ✨
              </h2>
              <button className="text-[11px] text-[#C4704F] font-semibold">
                See all →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {upsellProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex-shrink-0 w-[130px] bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative h-[110px]">
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
                    <p className="text-[11px] text-[#2C1A0E] font-medium line-clamp-1">
                      {p.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[12px] font-bold text-[#C4704F]">
                        ₹{p.price}
                      </span>
                      <button
                        className="bg-[#C4704F] text-white text-[9px] font-semibold px-2 py-1 rounded-full"
                        onClick={() => addToCart(p)}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4 mt-5 bg-gradient-to-r from-[#F5E6D3] to-[#F0D5BE] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#C4704F] uppercase tracking-wide">
                  Bundle Deal 🎁
                </span>
                <h3 className="text-[14px] font-bold text-[#2C1A0E] mt-0.5">
                  Cozy Bedroom Bundle
                </h3>
                <p className="text-[11px] text-[#7A5C4A]">
                  Save ₹400 when you buy the set
                </p>
              </div>
              <button
                className="bg-[#C4704F] text-white text-[11px] font-semibold px-3 py-2 rounded-xl"
                onClick={() => addToCart(products[3])}
              >
                Add Bundle
              </button>
            </div>
          </div>

          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-[#C4704F]" />
              <span className="text-[13px] font-semibold text-[#2C1A0E]">
                Promo Code
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <input
                className="flex-1 bg-[#F5EDE3] rounded-xl px-3 py-2.5 text-[13px] text-[#2C1A0E] outline-none placeholder:text-[#B8A898]"
                placeholder="Enter code e.g. GLOW10"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className={`px-4 py-2.5 rounded-xl text-[12px] font-semibold ${promoCode ? "bg-[#C4704F] text-white" : "bg-[#F0E8DE] text-[#9A8570]"}`}
                onClick={() => {
                  if (promoCode) setPromoApplied(true);
                }}
              >
                {promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>
            {promoApplied && (
              <p className="text-[11px] text-[#7A9E7E] font-semibold mt-2">
                🎉 10% off applied — saving you ₹{promoDiscount}!
              </p>
            )}
          </div>

          <div className="mx-4 mt-4 bg-white rounded-2xl p-4">
            <h3 className="text-[14px] font-semibold text-[#2C1A0E] mb-3">
              Price Details
            </h3>
            <div className="space-y-2">
              {[
                {
                  label: `Subtotal (${cart.reduce((s, i) => s + i.quantity, 0)} items)`,
                  value: `₹${subtotal}`,
                },
                {
                  label: "Delivery",
                  value: shippingFee === 0 ? "FREE 🎉" : `₹${shippingFee}`,
                  green: shippingFee === 0,
                },
                {
                  label: "Promo Discount",
                  value: promoApplied ? `-₹${promoDiscount}` : "–",
                  green: promoApplied,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-[12px] text-[#9A8570]">
                    {row.label}
                  </span>
                  <span
                    className={`text-[12px] font-medium ${row.green ? "text-[#7A9E7E]" : "text-[#2C1A0E]"}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="border-t border-[#F0E8DE] pt-2 mt-2 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#2C1A0E]">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-[16px] font-bold text-[#2C1A0E]">
                    ₹{total}
                  </span>
                  <p className="text-[10px] text-[#7A9E7E]">
                    You save ₹{savings + promoDiscount} total 🎉
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-32" />

          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EDE5D8] px-4 py-3 shadow-[0_-10px_30px_rgba(56,36,17,0.08)] lg:left-[288px] lg:px-8">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between mb-2">
              <div>
                <span className="text-[11px] text-[#9A8570]">Total</span>
                <p className="text-[16px] font-bold text-[#2C1A0E]">₹{total}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FFF3ED] px-2.5 py-1 rounded-full">
                <Zap size={11} className="text-[#C4704F]" />
                <span className="text-[10px] font-semibold text-[#C4704F]">
                  Delivers in 60 mins
                </span>
              </div>
            </div>
            <button
              className="mx-auto flex w-full max-w-[1200px] items-center justify-center gap-2 rounded-2xl bg-[#C4704F] py-3.5 text-[15px] font-semibold text-white"
              onClick={() => navigate("/app/checkout")}
            >
              Proceed to Checkout
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
