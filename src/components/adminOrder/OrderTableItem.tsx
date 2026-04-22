import { FaEdit, FaEye } from "react-icons/fa";
import useDashboard from "../../shared/hooks/useDahboard";
import Button from "../../shared/UIElements/button/Button";
import {
  formatAddress,
  formatOrderDate,
  formatPrice,
} from "../../shared/utils/helper";
import type { Order } from "../../shared/schemas/orderSchemas";
import { cn } from "../../shared/utils/cn";

function OrderTableItem({
  _id,
  createdAt,
  status,
  orderItems,
  customerId,
  index,
}: Order & { index: number }) {
  const { openOrderDetailModal, openOrderStatusModal } = useDashboard();
  const { date, time } = formatOrderDate(createdAt);
  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );

  return (
    <tr className="border-main md:border-main/20 group flex flex-col overflow-hidden rounded-4xl border-2 bg-white text-black shadow-sm transition-all hover:shadow-md md:table-row md:rounded-none">
      {/* Index - Hidden on Mobile, shown as a badge or tag if needed */}
      <td className="text-main-btn/40 hidden px-4 py-4 text-lg font-black italic md:table-cell">
        {index + 1}
      </td>

      {/* Customer & Date Info */}
      <td className="px-6 py-4 md:px-4">
        <div className="flex flex-col">
          <span className="text-main-btn text-lg leading-none font-black tracking-tighter uppercase italic md:text-base">
            {customerId.fullName}
          </span>
          <span className="mt-1 text-[10px] font-bold tracking-widest uppercase opacity-50">
            {date} @ {time}
          </span>
        </div>
      </td>

      {/* Address - Mobile: Shown as a small text under title */}
      <td className="px-6 py-1 md:px-4 md:py-4">
        <p className="max-w-50 text-xs font-medium italic opacity-70">
          {formatAddress({
            street: customerId.street,
            houseNumber: customerId.houseNumber,
            city: customerId.city,
            postalCode: customerId.postalCode,
          })}
        </p>
      </td>

      {/* Mobile-only separator */}
      <div className="border-main/10 mx-6 my-2 border-t md:hidden" />

      {/* Status Section */}
      <td className="px-6 py-2 md:px-4 md:py-4">
        <div className="flex items-center justify-between gap-3 md:justify-start">
          <span className="text-[10px] font-black uppercase opacity-40 md:hidden">
            Status
          </span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "bg-main text-main-btn rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase italic",
                status === "preparing" && "bg-orange-100 text-orange-600",
                status === "delivered" && "bg-green-100 text-green-600",
              )}
            >
              {status}
            </span>
            <Button
              type="button"
              onClick={() => openOrderStatusModal(_id)}
              className="bg-main-btn rounded-xl p-2 text-white active:scale-90"
            >
              <FaEdit size={12} />
            </Button>
          </div>
        </div>
      </td>

      {/* Total Price */}
      <td className="px-6 py-2 md:px-4 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="text-[10px] font-black uppercase opacity-40 md:hidden">
            Total Amount
          </span>
          <span className="text-main-btn text-xl font-black tracking-tighter italic md:text-base">
            {formatPrice(total)}
          </span>
        </div>
      </td>

      {/* Order Detail Button */}
      <td className="px-6 py-4 text-center md:px-4">
        <Button
          type="button"
          onClick={() => openOrderDetailModal(orderItems)}
          className="bg-main border-main hover:bg-main-btn hover:text-text-light! flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-2 text-xs font-black tracking-tighter text-black! uppercase italic transition-all active:scale-95 md:w-auto md:px-6 md:py-3 md:text-base! dark:text-white!"
        >
          <FaEye />
          <span>View Order</span>
        </Button>
      </td>
    </tr>
  );
}

export default OrderTableItem;
