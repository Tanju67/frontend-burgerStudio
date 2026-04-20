import noImg from "../../assets/noImg.png";
import type { OrderItem } from "../../shared/schemas/orderSchemas";
import { formatPrice } from "../../shared/utils/helper";

function OrderDetailItem({ product, amount, price }: OrderItem) {
  const title = product === null ? "No title" : product.title;
  const image = product === null ? noImg : product.image;
  return (
    <li className="bg-main-light text-text-dark flex items-center justify-between p-2">
      <div className="flex items-center justify-center">
        <img
          src={image || noImg}
          alt=""
          className="h-12 w-12 object-cover object-center"
        />
        <span className="rounded-sm p-1 capitalize">{title}</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <span className="bg-main-dark w-10 rounded-sm p-1 text-center text-white">
          {amount} x
        </span>
        <span className="bg-main-btn w-20 rounded-sm p-1 text-center text-white">
          {formatPrice(price)}
        </span>
      </div>
    </li>
  );
}

export default OrderDetailItem;
