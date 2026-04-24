import type { Order } from "../../shared/schemas/orderSchemas";
import SingleOrder from "./SingleOrder";

type OrderContentProps = {
  data: Order[];
};

function OrderContent({ data }: OrderContentProps) {
  return (
    <div className="container-box px-4 py-10">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-main-btn text-3xl font-black tracking-tighter uppercase italic md:text-4xl">
          Your Past Cravings
        </h2>
        <p className="text-main-dark/60 mt-1 text-sm font-medium tracking-widest uppercase">
          Everything you've enjoyed so far
        </p>
        <div className="bg-main-btn mt-3 h-1.5 w-20 rounded-full" />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item: Order) => (
          <SingleOrder key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default OrderContent;
