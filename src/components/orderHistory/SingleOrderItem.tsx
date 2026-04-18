import noImg from "../../assets/noImg.png";
import type { OrderItem } from "../../shared/schemas/orderSchemas";
import { formatPrice } from "../../shared/utils/helper";

function SingleOrderItem({ product, amount, price }: OrderItem) {
  const totalprice = price * amount;
  const title = product === null ? "No title" : product.title;
  const image = product === null ? noImg : product.image;

  return (
    <li className="border-b-main flex items-center justify-between gap-2 border-b-2 p-2">
      <div className="w-20 overflow-hidden">
        <img className="object-cover" src={image || noImg} alt={title} />
      </div>
      <div>
        <p className="capitalize">{title}</p>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <div className="flex items-center justify-center gap-2">
          <span className="bg-main w-6 rounded-sm text-center">{amount}</span>
        </div>
        <div>
          <span>{formatPrice(totalprice)}</span>
        </div>
      </div>
    </li>
  );
}

export default SingleOrderItem;
