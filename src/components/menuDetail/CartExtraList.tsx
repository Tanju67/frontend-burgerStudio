import { useParams } from "react-router-dom";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import CartExtraListItem from "./CartExtraListItem";

function CartExtraList() {
  const { id } = useParams();
  const { data, isLoading, isError, isFetching } = useGetProductsByMenuQuery(
    id!,
  );

  if (isError)
    return (
      <div className="mt-4 text-center text-sm md:text-base">
        Something went wrong. Please try again later.
      </div>
    );

  if (isLoading || isFetching) return <PageSpinner />;

  if (!data) return null;
  return (
    <ul className="flex flex-col gap-2">
      {data.map((item: Product) => (
        <CartExtraListItem
          key={item._id}
          _id={item._id}
          title={item.title}
          image={item.image}
          price={item.price}
        />
      ))}
    </ul>
  );
}

export default CartExtraList;
