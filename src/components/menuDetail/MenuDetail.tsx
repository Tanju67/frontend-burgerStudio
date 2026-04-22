import { useParams } from "react-router-dom";
import { useGetProductsByMenuQuery } from "../../shared/services/productApi";
import MenuDetailSkeleton from "../../shared/skeletons/MenuDetailSkeleton";
import IsError from "../../shared/UIElements/isError/IsError";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import MenuDetailList from "./MenuDetailList";
import type { Menu } from "../../shared/schemas/menuSchemas";
import { motion } from "framer-motion";

function MenuDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductsByMenuQuery(id!);

  const title = (data?.[0]?.menu as Menu)?.title ?? "Menu";

  let content;

  if (isLoading) {
    content = <MenuDetailSkeleton />;
  } else if (isError) {
    content = <IsError />;
  } else {
    content = <MenuDetailList data={data ?? []} />;
  }

  return (
    <main className="bg-main-light bg-dashboard-pattern min-h-screen transition-colors duration-300">
      <MainNav title={title} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container-box"
      >
        {content}
      </motion.div>
    </main>
  );
}

export default MenuDetail;
