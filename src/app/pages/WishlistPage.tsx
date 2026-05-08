import { useNavigate } from "react-router";
import { Heart } from "lucide-react";
import { products } from "../data/products";
import { useAppState } from "../state/AppState";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistIds, toggleWishlist, addToCart } = useAppState();
  const wishlistProducts = wishlistIds.length
    ? products.filter((product) => wishlistIds.includes(product.id))
    : [];

  return (
    <div
      className="min-h-screen bg-[#FAF7F2]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 pt-12 pb-3 border-b border-[#EDE5D8]">
        <h1
          className="text-[18px] font-bold text-[#2C1A0E]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Wishlist 🤍
        </h1>
        <p className="text-[12px] text-[#9A8570]">
          {wishlistProducts.length} saved items
        </p>
      </div>
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        {wishlistProducts.length === 0 ? (
          <div className="col-span-2 rounded-[28px] bg-white px-5 py-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3ED] text-[#C4704F]">
              <Heart size={24} />
            </div>
            <h2
              className="mt-4 text-[20px] font-semibold text-[#2C1A0E]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your saved aesthetics live here.
            </h2>
            <p className="mt-2 text-[13px] text-[#7A5C4A]">
              Add pieces to your wishlist to build the room story you want next.
            </p>
            <button
              className="mt-5 rounded-2xl bg-[#C4704F] px-5 py-3 text-[13px] font-semibold text-white"
              onClick={() => navigate("/app")}
            >
              Explore decor
            </button>
          </div>
        ) : (
          wishlistProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
              onClick={() => navigate(`/app/product/${p.id}`)}
            >
              <div className="relative h-[160px]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                >
                  <Heart size={13} className="fill-[#C4704F] text-[#C4704F]" />
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] font-semibold text-[#2C1A0E] line-clamp-1">
                  {p.name}
                </p>
                <p className="text-[13px] font-bold text-[#C4704F] mt-1">
                  ₹{p.price}
                </p>
                <button
                  className="mt-2 w-full bg-[#C4704F] text-white py-2 rounded-xl text-[11px] font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                    navigate("/app/cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
