import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import noImg from "../../assets/noImg.png";
import useCart from "../../shared/hooks/useCart";
import { formatPrice } from "../../shared/utils/helper";
import type { Product } from "../../shared/schemas/productSchemas";

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
    <li className="border-b-main flex items-center justify-between gap-2 border-b-2 pb-2">
      <div className="w-20 overflow-hidden">
        <img className="object-cover" src={image || noImg} alt={title} />
      </div>
      <div className="capitalize">
        <p>{title}</p>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <div className="flex items-center justify-center gap-2">
          {cart.activeCart === 0 && iconVisible && (
            <span onClick={handleRemoveProduct}>
              <FaMinus />
            </span>
          )}
          <span className="bg-main w-6 rounded-sm text-center">{amount}</span>
          {cart.activeCart === 0 && iconVisible && (
            <span>
              <FaPlus onClick={handleSelectProduct} />
            </span>
          )}
        </div>
        <div>
          <span>{formatPrice(totalprice)}</span>
        </div>
      </div>
    </li>
  );
}

export default CartListItem;
