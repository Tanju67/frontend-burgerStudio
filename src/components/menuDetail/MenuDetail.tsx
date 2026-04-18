import { useParams } from "react-router-dom";
import { ErrorPage } from "../../pages";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import PageSpinner from "../../shared/UIElements/spinner/PageSpinner";
import MenuDetailList from "./MenuDetailList";

function MenuDetail() {
  const { id } = useParams();
  const { data, isLoading, isError, isFetching } = useGetProductsByMenuQuery(
    id!,
  );

  const title = data?.[0]?.menu?.title ?? "Menu";

  if (isError) return <ErrorPage />;

  return (
    <main className="bg-main-light text-text-dark">
      <MainNav title={title} />
      {isLoading || (isFetching && <PageSpinner />)}
      {data?.length === 0 && (
        <p className="flex min-h-[50vh] items-center justify-center pt-4 text-center text-sm md:block md:text-base">
          There is not any product in this menu!
        </p>
      )}
      <MenuDetailList data={data ?? []} />
    </main>
  );
}

export default MenuDetail;
