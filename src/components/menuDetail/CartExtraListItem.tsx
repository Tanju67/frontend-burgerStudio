import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import Button from "../../shared/UIElements/button/Button";
import { formatPrice } from "../../shared/utils/helper";

function CartExtraListItem({ _id, title, image, price }: Product) {
  const { addToCart } = useCart();
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
    <li className="border-b-main flex items-center justify-between gap-2 pb-2 text-xs not-last:border-b-2 md:text-base">
      <div className="w-20 overflow-hidden">
        <img className="object-cover" src={image} alt={title} />
      </div>
      <div>
        <p className="capitalize">{title}</p>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <div className="flex items-center justify-center gap-2">
          <div>
            <span>{formatPrice(price)}</span>
          </div>
          <div>
            <Button
              type="button"
              onClick={handleSelectProduct}
              className="bg-main-btn hover:bg-main-btn-hover px-2 py-1"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartExtraListItem;
