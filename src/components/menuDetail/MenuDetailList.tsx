import { useState } from "react";

import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import Modal from "../../shared/UIElements/modal/Modal";
import MenuDetailListItem from "./MenuDetailListItem";
import ProductInfo from "./ProductInfo";
import NoProducts from "./NoProduct";

interface MenuDetailListProps {
  data: Product[];
}

function MenuDetailList({ data }: MenuDetailListProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { cart } = useCart();

  if (data.length === 0) return <NoProducts />;

  return (
    <ul className="grid gap-4 py-4 sm:grid-cols-2 md:mt-0 md:min-h-[50vh] lg:grid-cols-3">
      {data.map((item) => (
        <MenuDetailListItem
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
          description={item.description}
          price={item.price}
          setShowModal={setShowModal}
        />
      ))}

      <Modal
        className="bg-bg text-text-dark max-h-[90vh] max-w-[90vw] overflow-y-scroll text-sm md:max-w-1/2 md:text-base lg:max-w-1/3"
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ProductInfo product={cart.selectedProduct!} />
      </Modal>
    </ul>
  );
}

export default MenuDetailList;
