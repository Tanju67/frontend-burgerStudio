import noImg from "../../assets/noImg.png";
import type { OrderItem } from "../../shared/schemas/orderSchemas";
import { formatPrice } from "../../shared/utils/helper";

function SingleOrderItem({ product, amount, price }: OrderItem) {
  const totalprice = price * amount;

  // Defensive checks for product data
  const title = !product ? "Product Unavailable" : product.title;
  const image = !product ? noImg : product.image;

  return (
    <li className="border-main/10 flex items-center justify-between gap-4 border-b px-2 py-3 last:border-0">
      {/* Product Image - Smaller & Compact for Order History */}
      <div className="border-main/5 h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm">
        <img
          className="h-full w-full object-cover"
          src={image || noImg}
          alt={title}
        />
      </div>

      {/* Product Name & Quantity Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-text-dark truncate text-sm font-bold capitalize">
            {title}
          </p>
          <span className="bg-main-btn/10 text-main-btn rounded px-1.5 py-0.5 text-[10px] font-black italic">
            x{amount}
          </span>
        </div>
        <p className="text-main-dark/60 text-[10px] font-medium">
          Unit Price: {formatPrice(price)}
        </p>
      </div>

      {/* Item Total Price */}
      <div className="shrink-0 text-right">
        <span className="text-text-dark text-sm font-black tracking-tight italic">
          {formatPrice(totalprice)}
        </span>
      </div>
    </li>
  );
}

export default SingleOrderItem;
