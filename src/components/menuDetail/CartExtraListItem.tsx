import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import Button from "../../shared/UIElements/button/Button";
import { formatPrice } from "../../shared/utils/helper";

function CartExtraListItem({ _id, title, image, price }: Product) {
  const { addToCart } = useCart();

  // Create the product object and trigger the cart action
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

  return (
    <li className="group bg-main-light/30 hover:bg-main-light hover:border-main-btn/20 flex items-center justify-between gap-3 rounded-2xl border border-transparent p-2 transition-all">
      {/* Small Thumbnail for Extras */}
      <div className="border-main/10 h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-white">
        <img
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt={title}
        />
      </div>

      {/* Info Section */}
      <div className="min-w-0 flex-1 px-1">
        <p className="text-text-dark truncate text-sm font-bold capitalize">
          {title}
        </p>
        <p className="text-main-btn text-[11px] font-black tracking-tighter italic">
          +{formatPrice(price)}
        </p>
      </div>

      {/* Action Section */}
      <div className="flex items-center">
        <Button
          type="button"
          onClick={handleSelectProduct}
          className="bg-main-btn hover:bg-main-btn-hover rounded-full px-4 py-1.5 text-[10px] font-black tracking-widest text-white uppercase shadow-sm transition-all active:scale-90"
        >
          Add
        </Button>
      </div>
    </li>
  );
}

export default CartExtraListItem;
