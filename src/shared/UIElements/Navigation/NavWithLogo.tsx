import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";
import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import useDarkMode from "../../hooks/useDarkMode";
import { selectTotalPrice } from "../../store/CartSlice";
import { formatPrice } from "../../utils/helper";

function NavWithLogo({ scrolled }: { scrolled: boolean }) {
  const { cart, setCartModal } = useCart();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const totalPrice = useSelector(selectTotalPrice);
  return (
    <motion.div
      animate={{ padding: scrolled ? 0 : 35 }}
      transition={{ duration: 0.3 }}
      className={`bg-bg flex items-center`}
    >
      <div className="container-box text-text-nav flex flex-1 items-center justify-between px-4 py-4">
        <div className="hidden items-center gap-2 overflow-hidden md:flex">
          <motion.div
            animate={{ x: scrolled ? -150 : 0, opacity: scrolled ? 0 : 1 }}
            className="text-main-dark/70 flex items-center gap-2 text-xs font-bold tracking-widest uppercase"
          >
            <FaLocationDot className="text-main-btn" />
            <span>Store: London</span>
          </motion.div>
        </div>
        <div className="flex justify-center">
          <Link to="/" className="flex items-center justify-center">
            <motion.img
              animate={{
                scale: scrolled ? 1.25 : 2.5,
              }}
              transition={{ duration: 0.4 }}
              src={darkMode ? logoDark : logoLight}
              alt="logo"
              className="w-32 object-contain md:w-24 lg:w-40"
            />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2 md:gap-4">
          {cart.cartData.length === 0 ? (
            <NavLink
              to="/menu"
              className="group bg-main-btn relative hidden items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 transition-all hover:pr-8 active:scale-95 md:flex"
            >
              <span className="text-[10px] font-black tracking-widest text-white uppercase italic">
                Order Online
              </span>
              <FaCartPlus
                className="text-white transition-transform group-hover:translate-x-1"
                size={14}
              />
            </NavLink>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setCartModal(true)}
              className="bg-main-light/50 border-main/10 hover:bg-main-light flex cursor-pointer items-center gap-3 rounded-full border p-1.5 pl-4 shadow-sm transition-all active:scale-95"
            >
              <div className="hidden sm:block">
                <p className="text-main-dark/50 text-[9px] leading-none font-black uppercase italic">
                  Your Bag
                </p>
                <p className="text-text-dark mt-1 text-sm leading-none font-black tracking-tighter italic">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <div className="bg-main-btn flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md">
                <FaCartPlus size={16} />
              </div>
            </motion.div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="bg-main-light/50 text-text-dark hover:bg-main-btn border-main/5 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all hover:text-white active:scale-90"
          >
            {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default NavWithLogo;
