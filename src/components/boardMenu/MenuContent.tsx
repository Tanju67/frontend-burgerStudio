import useDashboard from "../../shared/hooks/useDahboard";
import type { Menu } from "../../shared/schemas/menuSchemas";
import { cn } from "../../shared/utils/cn";
import Item from "./Item";

type MenuContentProps = {
  data: Menu[];
};

function MenuContent({ data }: MenuContentProps) {
  const {
    dashboard: { menuActiveTab },
  } = useDashboard();
  const isGrid = menuActiveTab === 0;
  const isList = menuActiveTab === 1;
  const isImage = menuActiveTab === 2;
  if (data.length === 0)
    return (
      <div className="flex h-[90vh] justify-center py-10">
        <p className="text-text-dark text-center">
          There is any menu. Please add a new menu.
        </p>
      </div>
    );
  return (
    <ul
      className={cn(
        "text-text-dark py-4 md:max-h-screen",
        isGrid && "grid auto-rows-min grid-cols-2 gap-2 lg:grid-cols-3",
        isList && "flex flex-col gap-2",
        isImage &&
          "grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {data.map((item) => (
        <Item
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
        />
      ))}
    </ul>
  );
}

export default MenuContent;
