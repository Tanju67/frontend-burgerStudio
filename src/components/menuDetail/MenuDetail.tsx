import { useParams } from "react-router-dom";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import MenuDetailSkeleton from "../../shared/skeletons/MenuDetailSkeleton";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import MenuDetailList from "./MenuDetailList";
import Button from "../../shared/UIElements/button/Button";

function MenuDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductsByMenuQuery(id!);

  const title = data?.[0]?.menu?.title ?? "Menu";

  if (isLoading)
    return (
      <main className="bg-main-light text-text-dark">
        <MainNav title={title} />
        <MenuDetailSkeleton />
      </main>
    );

  if (isError) {
    return (
      <main className="bg-main-light text-text-dark min-h-screen">
        <MainNav title="Error" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Oops! Something went wrong.</h2>
          <p className="text-gray-500">We couldn't load the menu products.</p>
          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-main-btn mt-2 px-2 py-1"
          >
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  if (!data || data?.length === 0)
    return (
      <main className="bg-main-light text-text-dark">
        <MainNav title={title} />
        <p className="flex min-h-[50vh] items-center justify-center pt-4 text-center text-sm md:block md:text-base">
          There is not any product in this menu!
        </p>
      </main>
    );

  return (
    <main className="bg-main-light text-text-dark">
      <MainNav title={title} />
      <MenuDetailList data={data ?? []} />
    </main>
  );
}

export default MenuDetail;
