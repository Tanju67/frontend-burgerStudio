import { motion } from "framer-motion";
import { BiFoodMenu } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoLogInSharp } from "react-icons/io5";
import {
  MdDarkMode,
  MdDashboardCustomize,
  MdLightMode,
  MdWorkHistory,
} from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";

type MobileMenuListProps = {
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileMenuList({ hamburger, setHamburger }: MobileMenuListProps) {
  const navigate = useNavigate();
  const darkMode = false;
  const isAdmin = false;
  const isUser = false;
  const isLoggedIn = false;
  return (
    <motion.div
      className="bg-bg fixed top-0 right-0 z-40 flex h-screen w-full flex-col items-center justify-center gap-2 text-xl capitalize"
      variants={{
        hidden: { height: 0, opacity: 0, width: 0, borderRadius: "100%" },
        show: { height: "100vh", opacity: 1, width: "100%", borderRadius: "0" },
      }}
      initial="hidden"
      animate={hamburger ? "show" : "hidden"}
      transition={{ duration: 0.3 }}
      exit="hidden"
    >
      <ul className="mt-20 flex flex-1 flex-col">
        <li className="mb-20">
          <img className="w-70" src={darkMode ? logoDark : logoLight} alt="" />
        </li>
        <li
          className="border-b-main-btn border-b pb-2"
          onClick={() => setHamburger(false)}
        >
          <NavLink
            className="hover:text-main-btn flex items-center gap-1 transition-all duration-300 ease-in-out"
            to="/"
          >
            <span className="text-main-btn">
              <FaHome />
            </span>
            <span> Home</span>
          </NavLink>
        </li>
        <li
          className="border-b-main-btn border-b py-2"
          onClick={() => setHamburger(false)}
        >
          <NavLink
            className="hover:text-main-btn flex items-center gap-1 transition-all duration-300 ease-in-out"
            to="/menu"
          >
            <span className="text-main-btn">
              <BiFoodMenu />
            </span>
            <span> Menu</span>
          </NavLink>
        </li>
        {isAdmin && (
          <li
            className="border-b-main-btn border-b py-2"
            onClick={() => setHamburger(false)}
          >
            <NavLink
              className="hover:text-main-btn flex items-center gap-1 transition-all duration-300 ease-in-out"
              to="/dashboard/menus"
            >
              <span className="text-main-btn">
                <MdDashboardCustomize />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>
        )}
        {isUser && (
          <li
            className="border-b-main-btn border-b py-2"
            onClick={() => setHamburger(false)}
          >
            <NavLink
              className="hover:text-main-btn flex items-center gap-1 transition-all duration-300 ease-in-out"
              to="/order-history"
            >
              <span className="text-main-btn">
                <MdWorkHistory />
              </span>
              <span>Order History</span>
            </NavLink>
          </li>
        )}
      </ul>
      <ul className="bg-main-btn flex justify-center gap-4 place-self-stretch justify-self-stretch py-4 text-white">
        {isLoggedIn === false && (
          <>
            <li onClick={() => setHamburger(false)}>
              <NavLink
                className="flex items-center gap-1 transition-all duration-300 ease-in-out hover:border-b hover:text-white"
                to="/login"
              >
                <span>
                  <IoLogInSharp />
                </span>
                <span>login</span>
              </NavLink>
            </li>
            |
            <li onClick={() => setHamburger(false)}>
              <NavLink
                className="flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white"
                to="/register"
              >
                <span>
                  <FaPersonCirclePlus />
                </span>
                <span>Register</span>
              </NavLink>
            </li>{" "}
          </>
        )}
        {isLoggedIn && (
          <li
            onClick={() => {
              setHamburger(false);
              navigate(0);
            }}
          >
            <NavLink
              className="flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white"
              to=""
            >
              <span>
                <RiLogoutBoxFill />
              </span>
              <span>Logout</span>
            </NavLink>
          </li>
        )}
        |
        <li onClick={() => setHamburger(false)}>
          <button className="flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white">
            <span>{darkMode ? <MdLightMode /> : <MdDarkMode />}</span>
            <span>{darkMode ? "Light" : "Dark"}</span>
          </button>
        </li>
      </ul>
    </motion.div>
  );
}

export default MobileMenuList;
