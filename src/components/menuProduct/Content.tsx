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
  const isGrid = menuActiveTab === 0;
  const isList = menuActiveTab === 1;
  const isImage = menuActiveTab === 2;
  if (data.length === 0)
    return (
      <div className="flex min-h-[90vh] justify-center py-10">
        <p className="text-center">
          There is any product. Please add a new product.
        </p>
      </div>
    );
  return (
    <ul
      className={cn(
        "py-4 md:max-h-screen",
        isGrid &&
          "grid auto-rows-min grid-cols-1 gap-2 min-[465px]:grid-cols-2 xl:grid-cols-3",
        isList && "flex flex-col gap-2",
        isImage && "grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-3",
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
