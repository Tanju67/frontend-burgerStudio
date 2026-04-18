import { motion } from "framer-motion";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import Button from "../../shared/UIElements/button/Button";
import { formatOrderDate, formatPrice } from "../../shared/utils/helper";
import SingleOrderItem from "./SingleOrderItem";
import type { Order } from "../../shared/schemas/orderSchemas";

function SingleOrder({ _id, createdAt, status, orderItems }: Order) {
  const [showOrder, setShowOrder] = useState(false);
  const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);
  const { date, time } = formatOrderDate(createdAt);
  return (
    <div className="bg-bg text-text-dark rounded-lg p-4 text-sm shadow-md md:text-base">
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3">
        <p className="grid grid-cols-3">
          <span className="font-bold">Order ID:</span>{" "}
          <span className="col-span-2">{_id}</span>
        </p>
        <p className="grid grid-cols-3">
          <span className="font-bold">Order Date:</span>{" "}
          <span className="col-span-2">{date}</span>
        </p>
        <p className="grid grid-cols-3">
          <span className="font-bold">Order Time:</span>{" "}
          <span className="col-span-2">{time}</span>
        </p>
        <p className="grid grid-cols-3">
          <span className="font-bold">Order Status:</span>
          <span className="col-span-2">{status}</span>
        </p>
        <p className="grid grid-cols-3">
          <span className="font-bold">Order Total:</span>{" "}
          <span className="col-span-2">{formatPrice(totalPrice)}</span>
        </p>
        <Button
          type="button"
          onClick={() => setShowOrder((prev) => !prev)}
          className="bg-main-btn hover:bg-main-btn-hover absolute right-0 bottom-0 flex items-center gap-1 px-4 py-2 text-white"
        >
          <FaArrowDown />
          <span>See orders</span>
        </Button>
      </div>

      <motion.div
        className="bg-main-light mt-4 p-1"
        variants={{
          hidden: { height: 0, opacity: 0 },
          show: {
            height: "auto",
            opacity: 1,
          },
        }}
        initial="hidden"
        animate={showOrder ? "show" : "hidden"}
        transition={{ duration: 0.3 }}
        exit="hidden"
      >
        {orderItems.map((product) => (
          <SingleOrderItem key={product._id} {...product} />
        ))}
        <p className="flex justify-end gap-1">
          <span className="font-bold">Total: </span>
          <span> {formatPrice(totalPrice)}</span>
        </p>
      </motion.div>
    </div>
  );
}

export default SingleOrder;
