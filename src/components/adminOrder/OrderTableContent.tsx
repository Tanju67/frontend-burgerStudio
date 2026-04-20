import type { Order } from "../../shared/schemas/orderSchemas";
import OrderTableItem from "./OrderTableItem";

type OrderTableItemProps = {
  data: Order[];
};

function OrderTableContent({ data }: OrderTableItemProps) {
  return (
    <table className="table-zebra text-text-dark table">
      <thead className="bg-base-200">
        <tr>
          <th></th>
          <th>Customer</th>
          <th>Address</th>
          <th>Order Date</th>
          <th>Order Time</th>
          <th>Order Status</th>
          <th>Order Total</th>
          <th>Order Detail</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order, i) => (
          <OrderTableItem key={order._id} {...order} index={i} />
        ))}
      </tbody>
    </table>
  );
}

export default OrderTableContent;
