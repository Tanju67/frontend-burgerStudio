import useDashboard from "../../shared/hooks/useDahboard";
import type { Product } from "../../shared/schemas/productSchemas";
import { cn } from "../../shared/utils/cn";
import Item from "./Item";

type ContentProps = {
  data: Product[];
};

function Content({ data }: ContentProps) {
  const {
    dashboard: { menuActiveTab },
  } = useDashboard();

  // Navigation tabs state logic
  const isGrid = menuActiveTab === 0;
  const isList = menuActiveTab === 1;
  const isImage = menuActiveTab === 2;

  if (data.length === 0)
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="bg-main/5 border-main/20 w-full max-w-lg rounded-4xl border-2 border-dashed p-12 text-center">
          <p className="text-main-btn text-xl font-black tracking-tighter uppercase italic">
            Kitchen is ready but no burgers found! <br />
            <span className="text-sm font-bold tracking-normal opacity-60">
              Start adding some delicious products.
            </span>
          </p>
        </div>
      </div>
    );

  return (
    <ul
      className={cn(
        "custom-scrollbar overflow-y-auto px-2 py-6 md:max-h-[calc(100vh-250px)]",
        isGrid && "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
        isList && "flex flex-col gap-3",
        isImage && "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {data.map((item) => (
        <Item
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
          description={item.description}
          price={item.price}
        />
      ))}
    </ul>
  );
}

export default Content;
