import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import useCart from "../../shared/hooks/useCart";
import Address from "./Address";
import CartExtraList from "./CartExtraList";
import CartList from "./CartList";
import CartNav from "./CartNav";
import Info from "./Info";

function Cart() {
  const { cart } = useCart();

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="bg-bg flex h-full flex-col overflow-hidden">
      <CartNav />

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {cart.activeCart === 0 && (
            <motion.div
              key="step0"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <CartList />
              <CartExtraList />
            </motion.div>
          )}

          {cart.activeCart === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Address />
            </motion.div>
          )}

          {cart.activeCart === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Info />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }
      />
    </div>
  );
}

export default Cart;
