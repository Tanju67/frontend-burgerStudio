import useDashboard from "../../shared/hooks/useDahboard";
import type { Menu } from "../../shared/schemas/menuSchemas";
import { cn } from "../../shared/utils/cn";
import Item from "./Item";
import NoMenu from "./NoMenu";

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

  if (data.length === 0) return <NoMenu />;

  return (
    <ul
      className={cn(
        "text-text-dark custom-scrollbar overflow-y-auto px-2 py-4 md:max-h-[calc(100vh-200px)]",
        isGrid &&
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3",
        isList && "flex flex-col gap-3",
        isImage && "grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4",
      )}
    >
      {data.map((item) => (
        <Item key={item._id} {...item} />
      ))}
    </ul>
  );
}

export default MenuContent;
