import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaReceipt } from "react-icons/fa6";
import type { Order } from "../../shared/schemas/orderSchemas";
import { formatOrderDate, formatPrice } from "../../shared/utils/helper";
import SingleOrderItem from "./SingleOrderItem";

function SingleOrder({ _id, createdAt, status, orderItems }: Order) {
  const [showOrder, setShowOrder] = useState(false);
  const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);
  const { date, time } = formatOrderDate(createdAt);

  const statusColors =
    {
      out_for_delivery: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      preparing: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    }[status] || "bg-main/10 text-main-dark border-main/20";

  return (
    <div className="bg-bg border-main/10 overflow-hidden rounded-4xl border shadow-sm transition-all hover:shadow-md">
      {/* Main Order Header */}
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Visual Receipt Icon */}
            <div className="bg-main-light text-main-btn flex h-12 w-12 items-center justify-center rounded-2xl">
              <FaReceipt size={24} />
            </div>
            <div>
              <p className="text-main-dark/50 text-[10px] font-black tracking-widest uppercase italic">
                Order ID: {_id.slice(-8).toUpperCase()}
              </p>
              <h3 className="text-text-dark text-lg font-black tracking-tighter italic">
                {date} <span className="text-main-btn">@</span> {time}
              </h3>
            </div>
          </div>

          {/* Order Status Badge */}
          <div
            className={`rounded-full border px-4 py-1 text-[10px] font-black tracking-widest uppercase ${statusColors}`}
          >
            {status}
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="border-main/20 mt-6 flex items-end justify-between border-t border-dashed pt-4">
          <div>
            <p className="text-main-dark/60 text-[10px] font-bold tracking-wider uppercase">
              Items
            </p>
            <p className="text-text-dark text-xl font-black italic">
              {orderItems.length}{" "}
              {orderItems.length === 1 ? "Product" : "Products"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-main-dark/60 text-[10px] font-bold tracking-wider uppercase">
              Total Paid
            </p>
            <p className="text-main-btn text-2xl font-black italic drop-shadow-sm">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* Expand Trigger */}
        <button
          onClick={() => setShowOrder(!showOrder)}
          className="bg-main-light/50 text-main-dark hover:bg-main-light mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all"
        >
          {showOrder ? "Hide Details" : "Show Order Details"}
          <FaChevronDown
            className={`transition-transform duration-300 ${showOrder ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expanded Items List */}
      <AnimatePresence>
        {showOrder && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-main-light/30 border-main/10 border-t"
          >
            <div className="space-y-1 p-4">
              {orderItems.map((product) => (
                <SingleOrderItem key={product._id} {...product} />
              ))}

              {/* Internal Summary */}
              <div className="border-main/10 mt-4 flex justify-end border-t px-2 pt-4">
                <p className="flex items-center gap-2">
                  <span className="text-main-dark text-xs font-bold uppercase italic">
                    Final Total:
                  </span>
                  <span className="text-main-btn text-lg font-black">
                    {formatPrice(totalPrice)}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SingleOrder;
