import { motion } from "framer-motion";
import MainNav from "../../shared/UIElements/Navigation/MainNav";
import Orders from "./Orders";

function OrderHistory() {
  return (
    <main className="bg-main-light min-h-screen pb-2">
      <MainNav title="Order History" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Orders />
      </motion.div>
    </main>
  );
}

export default OrderHistory;
