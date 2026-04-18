import type { Menu } from "../../shared/schemas/menuSchemas";
import MenuListItem from "./MenuListItem";

type MenuListProps = {
  menuData: Menu[];
};

function MenuList({ menuData }: MenuListProps) {
  return (
    <ul className="container-box mt-28 grid grid-cols-1 gap-4 py-4 md:mt-0 md:min-h-[90vh] md:grid-cols-2">
      {menuData.map((item) => (
        <MenuListItem
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
        />
      ))}
    </ul>
  );
}

export default MenuList;
