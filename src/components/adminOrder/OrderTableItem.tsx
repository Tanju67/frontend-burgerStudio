import { FaEdit, FaEye } from "react-icons/fa";
import useDashboard from "../../shared/hooks/useDahboard";
import Button from "../../shared/UIElements/button/Button";
import {
  formatAddress,
  formatOrderDate,
  formatPrice,
} from "../../shared/utils/helper";
import type { Order } from "../../shared/schemas/orderSchemas";

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
    <tr className="text-sm md:text-base">
      <th>{index + 1}</th>
      <td>{customerId.fullName}</td>
      <td>
        {formatAddress({
          street: customerId.street,
          houseNumber: customerId.houseNumber,
          city: customerId.city,
          postalCode: customerId.postalCode,
        })}
      </td>
      <td>{date}</td>
      <td>{time}</td>
      <td>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => openOrderStatusModal(_id)}
            className="bg-main-btn hover:bg-main-btn-hover p-1"
          >
            <FaEdit />
          </Button>
          <span>{status}</span>
        </div>
      </td>
      <td>{formatPrice(total)}</td>
      <td>
        <Button
          type="button"
          onClick={() => openOrderDetailModal(orderItems)}
          className="bg-main-btn hover:bg-main-btn-hover flex items-center gap-1 px-2 py-1"
        >
          <span>
            <FaEye />
          </span>
          <span className="hidden xl:block">Detail</span>
        </Button>
      </td>
    </tr>
  );
}

export default OrderTableItem;
