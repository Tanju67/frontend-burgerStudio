import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/UIElements/button/Button";
import useCart from "../../shared/hooks/useCart";

function Info() {
  const navigate = useNavigate();
  const { setCartModal } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-8 flex flex-col items-center justify-center px-4 pb-8 text-center"
    >
      {/* Animated Success Icon */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        className="mb-6 text-7xl"
      >
        🎉
      </motion.div>

      {/* Success Heading */}
      <h2 className="text-main-btn mb-4 text-4xl font-black tracking-tighter uppercase italic drop-shadow-sm">
        Thank you!
      </h2>

      {/* Success Description */}
      <div className="mb-10 max-w-sm space-y-4">
        <p className="text-text-dark text-base leading-snug font-bold">
          Your order has been successfully placed!
        </p>
        <p className="text-main-dark text-sm leading-relaxed font-medium">
          We are now preparing your delicious meal with care. You can track
          every step of the journey in your account.
        </p>
      </div>

      {/* Post-Order Actions */}
      <div className="flex w-full flex-col gap-3">
        <Button
          type="button"
          onClick={() => {
            setCartModal(false);
            navigate("/order-history"); // Navigates to order tracking
          }}
          className="bg-main-btn hover:bg-main-btn-hover rounded-2xl py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
        >
          Track My Order 🚀
        </Button>

        <button
          type="button"
          onClick={() => {
            setCartModal(false);
            navigate("/menu"); //  Returns to home/menu
          }}
          className="text-main-dark hover:text-main-btn py-2 text-xs font-bold tracking-widest uppercase transition-colors"
        >
          Return to Menu
        </button>
      </div>

      {/* Decorative Brand Element */}
      <div className="bg-main/20 mt-8 h-1 w-12 rounded-full" />
    </motion.div>
  );
}

export default Info;
