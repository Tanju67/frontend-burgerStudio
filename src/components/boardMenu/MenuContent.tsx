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
      <div className="bg-main/5 border-main/20 animate-in fade-in zoom-in flex h-[60vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 duration-500">
        <p className="text-main-btn text-center font-black tracking-widest uppercase italic opacity-60">
          The kitchen is empty. <br /> Please add a new menu.
        </p>
      </div>
    );

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
