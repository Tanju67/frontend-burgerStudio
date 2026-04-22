import useDashboard from "../../shared/hooks/useDahboard";
import { formatPrice } from "../../shared/utils/helper";
import OrderDetailItem from "./OrderDetailItem";

function OrderDetail() {
  const {
    dashboard: { orderItems },
  } = useDashboard();

  const total = orderItems.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );

  return (
    <div className="p-2 sm:p-4">
      {/* Dynamic Header */}
      <div className="mb-6 text-center">
        <h2 className="text-main-btn text-2xl font-black tracking-tighter uppercase italic">
          Order Items
        </h2>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
          Burger Studio Summary
        </p>
      </div>

      {/* Items List */}
      <ul className="custom-scrollbar flex max-h-[50vh] flex-col gap-3 overflow-y-auto pr-2">
        {orderItems.map((item, index) => (
          <OrderDetailItem key={index} {...item} />
        ))}
      </ul>

      {/* Footer / Total Section */}
      <div className="border-main/30 mt-8 border-t-4 border-double pt-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-main-btn text-lg font-black tracking-tighter uppercase italic">
            Total Amount
          </span>
          <div className="bg-main rounded-xl px-4 py-1 shadow-[4px_4px_0px_0px_rgba(var(--main-btn-rgb),1)]">
            <span className="text-main-btn text-xl font-black tracking-tighter italic">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
