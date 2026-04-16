import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";

import Button from "../button/Button";

function NavWithLogo({ scrolled }: { scrolled: boolean }) {
  const darkMode = false;
  return (
    <motion.div
      animate={{ height: scrolled ? 60 : 140 }}
      transition={{ duration: 0.3 }}
      className={`bg-bg flex`}
    >
      <div className="container-box text-text-nav flex flex-1 items-center justify-between px-4 py-4">
        <div className="hidden items-center gap-1 md:flex">
          <span className={`${scrolled ? "hidden" : ""}`}>
            <FaLocationDot />
          </span>
          <span className={`${scrolled ? "hidden" : ""}`}>Store: London</span>
        </div>
        <div>
          <Link to="/">
            <motion.img
              animate={{
                scale: scrolled ? 0.4 : 1,
              }}
              src={darkMode ? logoDark : logoLight}
              alt="logo"
              className="w-140"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          {[].length === 0 && (
            <NavLink
              to="/menu"
              className="hover:bg-main-btn-hover bg-main-btn text-text-light flex items-center gap-1 px-4 py-2 font-light! transition-all duration-300 ease-in-out"
            >
              <span>
                <FaCartPlus />
              </span>
              <span> Order Online</span>
            </NavLink>
          )}
          {[].length > 0 && (
            <div className="hover:bg-main-btn flex items-center gap-1 px-4 py-2 font-light! transition-all duration-300 ease-in-out hover:text-white">
              <span>
                <FaCartPlus />
              </span>
              <span> Cart</span>
              <span className="bg-main-btn rounded-sm p-1 text-white">x</span>
            </div>
          )}

          <Button
            type="button"
            className="hover:bg-main-btn hover:text-text-light! text-text-dark! ml-4 p-1"
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default NavWithLogo;
