import noImg from "../../assets/noImg.png";
import type { OrderItem } from "../../shared/schemas/orderSchemas";
import { formatPrice } from "../../shared/utils/helper";

function OrderDetailItem({ product, amount, price }: OrderItem) {
  // Safe checks for deleted products or missing data
  const title = product?.title || "Product Unavailable";
  const image = product?.image || noImg;

  return (
    <li className="border-main/20 group hover:border-main flex items-center justify-between rounded-2xl border-2 bg-white p-3 transition-colors">
      <div className="flex items-center gap-3">
        {/* Product Thumbnail */}
        <div className="bg-main/5 border-main/10 h-14 w-14 shrink-0 overflow-hidden rounded-xl border">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>

        {/* Title & Unit Price */}
        <div className="flex flex-col">
          <span className="text-main-btn text-sm leading-none font-black tracking-tighter uppercase italic">
            {title}
          </span>
          <span className="mt-1 text-[10px] font-bold opacity-50">
            Unit: {formatPrice(price)}
          </span>
        </div>
      </div>

      {/* Quantity & Subtotal */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <span className="bg-main-btn rounded-md px-2 py-0.5 text-[10px] font-black text-white italic">
            x{amount}
          </span>
          <span className="text-main-btn mt-1 font-black tracking-tighter italic">
            {formatPrice(price * amount)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default OrderDetailItem;
