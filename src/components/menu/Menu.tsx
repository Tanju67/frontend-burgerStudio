import { useGetMenusQuery } from "../../shared/services/menuApi";
import MenuSkeleton from "../../shared/skeletons/MenuSkeleton";
import Button from "../../shared/UIElements/button/Button";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import MenuList from "./MenuList";

function Menu() {
  const { data, isLoading, isError } = useGetMenusQuery();

  if (isLoading)
    return (
      <main className="bg-main-light">
        <MainNav title="Menu" />
        <MenuSkeleton />
      </main>
    );

  if (isError) {
    return (
      <main className="bg-main-light text-text-dark min-h-screen">
        <MainNav title="Error" />
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <h2 className="text-xl font-bold">Oops! Something went wrong.</h2>
          <p className="text-gray-500">We couldn't load the menu.</p>
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

  if (data?.length === 0)
    return (
      <main className="bg-main-light text-text-dark min-h-screen pt-4 text-center">
        <MainNav title="Menu" />
        <p>No menu found</p>
      </main>
    );

  return (
    <main className="bg-main-light">
      <MainNav title="Menu" />
      <MenuList menuData={data ?? []} />
    </main>
  );
}

export default Menu;
