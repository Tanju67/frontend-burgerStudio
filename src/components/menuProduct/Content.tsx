import useDashboard from "../../shared/hooks/useDahboard";
import type { Product } from "../../shared/schemas/productSchemas";
import { cn } from "../../shared/utils/cn";
import Item from "./Item";
import NoProduct from "./NoProduct";

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

  if (data.length === 0) return <NoProduct />;

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
          menu={item.menu}
        />
      ))}
    </ul>
  );
}

export default Content;
