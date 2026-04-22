import { useParams } from "react-router-dom";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import CartExtraListItem from "./CartExtraListItem";

function CartExtraList() {
  const { id: urlId } = useParams();
  const { data, isLoading, isError, isFetching } = useGetProductsByMenuQuery(
    urlId!,
    { skip: !urlId },
  );

  if (!urlId) return null;

  // LOADING STATE: Centered spinner for smooth transition
  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center py-10">
        <PageSpinner />
      </div>
    );

  // ERROR STATE: Friendly error message with a burger vibe
  if (isError)
    return (
      <div className="bg-secondary-btn/10 text-secondary-btn border-secondary-btn/20 mt-6 rounded-2xl border p-4 text-center text-sm font-bold uppercase italic">
        Oops! We couldn't fetch the extras right now. 🥤
      </div>
    );

  if (!data) return null;

  return (
    <div className="mt-8">
      {/* SECTION HEADER: Small catchy title for upsells */}
      <div className="mb-4 flex items-center gap-3 px-1">
        <h3 className="text-main-btn text-sm font-black tracking-widest uppercase italic">
          Complete Your Meal
        </h3>
        <div className="bg-main-btn/20 h-px flex-1" />
      </div>

      {/* EXTRAS LIST: Using a slightly different layout than main cart */}
      <ul className="flex flex-col gap-3">
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
    </div>
  );
}

export default CartExtraList;
