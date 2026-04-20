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
    <div>
      <h2 className="text-main-btn mb-4 text-center uppercase">Order Detail</h2>
      <ul className="flex flex-col gap-2">
        {orderItems.map((item, index) => (
          <OrderDetailItem key={index} {...item} />
        ))}
        <div className="text-text-dark flex justify-end gap-2 pr-2">
          <span className="font-bold">Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </ul>
    </div>
  );
}

export default OrderDetail;
