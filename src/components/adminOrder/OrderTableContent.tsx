import type { Order } from "../../shared/schemas/orderSchemas";
import OrderTableItem from "./OrderTableItem";

type OrderTableItemProps = {
  data: Order[];
};

function OrderTableContent({ data }: OrderTableItemProps) {
  return (
    <div className="w-full md:py-4">
      {/* Desktop view header - hidden on mobile */}
      <table className="w-full border-separate border-spacing-y-3">
        <thead className="bg-main hidden md:table-header-group">
          <tr className="text-main-btn text-left font-black tracking-tighter uppercase italic">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-4 md:table-row-group">
          {data.map((order, i) => (
            <OrderTableItem key={order._id} {...order} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTableContent;
