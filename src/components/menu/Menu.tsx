import { useGetMenusQuery } from "../../shared/services/menuApi";
import MenuSkeleton from "../../shared/skeletons/MenuSkeleton";
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

  if (isError)
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
