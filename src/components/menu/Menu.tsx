import { useGetMenusQuery } from "../../shared/services/menuApi";
import MenuSkeleton from "../../shared/skeletons/MenuSkeleton";
import IsError from "../../shared/UIElements/isError/IsError";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import MenuList from "./MenuList";
import { motion } from "framer-motion";

function Menu() {
  const { data, isLoading, isError } = useGetMenusQuery();

  let content;

  if (isLoading) {
    content = <MenuSkeleton />;
  } else if (isError) {
    content = <IsError />;
  } else {
    content = <MenuList menuData={data ?? []} />;
  }

  return (
    <main className="min-h-screen transition-colors duration-300">
      <MainNav title="Menu" />
      <motion.div
        key={isError ? "error" : isLoading ? "loading" : "content"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container-box"
      >
        {content}
      </motion.div>
    </main>
  );
}

export default Menu;
