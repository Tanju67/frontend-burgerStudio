import { FaMinus, FaPlus } from "react-icons/fa6";
import noImg from "../../assets/noImg.png";
import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import { formatPrice } from "../../shared/utils/helper";

function CartListItem({
  _id,
  title,
  image,
  price,
  amount,
  iconVisible = true,
}: Product & { iconVisible?: boolean }) {
  const { removeFromCart, addToCart, cart } = useCart();
  const totalprice = price * amount!;

  // Helper to structure the product object for cart actions
  const handleSelectProduct = () => {
    const product: Product & { amount: number } = {
      _id,
      title,
      image,
      price,
      amount: 1,
    };
    addToCart(product);
  };

  const handleRemoveProduct = () => {
    removeFromCart(_id);
  };

  return (
    <li className="border-main/20 flex items-center justify-between gap-4 border-b py-3 transition-all last:border-0">
      {/* Product Image Section */}
      <div className="border-main/10 h-16 w-16 shrink-0 overflow-hidden rounded-xl border shadow-sm">
        <img
          className="h-full w-full object-cover"
          src={image || noImg}
          alt={title}
        />
      </div>

      {/* Product Title Section */}
      <div className="min-w-0 flex-1">
        <p className="text-text-dark truncate text-sm font-bold capitalize md:text-base">
          {title}
        </p>
        <p className="text-main-dark text-xs font-medium">
          {formatPrice(price)} / unit
        </p>
      </div>

      {/* Controls and Price Section */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Quantity Controls */}
        <div className="bg-main-light border-main/20 flex items-center rounded-full border p-1">
          {cart.activeCart === 0 && iconVisible && (
            <button
              onClick={handleRemoveProduct}
              className="text-secondary-btn hover:bg-secondary-btn/10 cursor-pointer rounded-full p-1.5 transition-colors"
              aria-label="Decrease quantity"
            >
              <FaMinus size={12} />
            </button>
          )}

          <span className="text-main-btn w-8 text-center text-sm font-black">
            {amount}
          </span>

          {cart.activeCart === 0 && iconVisible && (
            <button
              onClick={handleSelectProduct}
              className="text-main-btn hover:bg-main-btn/10 cursor-pointer rounded-full p-1.5 transition-colors"
              aria-label="Increase quantity"
            >
              <FaPlus size={12} />
            </button>
          )}
        </div>

        {/* Total Item Price */}
        <div className="w-20 text-right">
          <span className="text-text-dark font-black tracking-tighter italic">
            {formatPrice(totalprice)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default CartListItem;
