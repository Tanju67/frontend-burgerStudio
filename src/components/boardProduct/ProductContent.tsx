import type { Menu } from "../../shared/schemas/menuSchemas";
import Item from "./Item";

type ProductContentProps = {
  data: Menu[];
};
function ProductContent({ data }: ProductContentProps) {
  if (data.length === 0)
    return (
      <div className="flex h-[90vh] justify-center py-10">
        <p className="text-center text-sm md:text-base">
          There is any menu. In order to add a new product, please first add to
          the menu.
        </p>
      </div>
    );
  return (
    <ul className="grid gap-2 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

export default ProductContent;
