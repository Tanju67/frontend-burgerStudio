import { AnimatePresence, motion, type Variants } from "framer-motion";
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
import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";
import useDarkMode from "../../hooks/useDarkMode";
import { useGetCurrentUserQuery } from "../../services/authApi";

type MobileMenuListProps = {
  hamburger: boolean;
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

function MobileMenuList({
  hamburger,
  setHamburger,
  logout,
}: MobileMenuListProps) {
  const { data } = useGetCurrentUserQuery();

  const { darkMode, toggleDarkMode } = useDarkMode();
  const isAdmin = data?.role === "admin" || data?.role === "test-admin";
  const isUser = data?.role === "user";
  const isLoggedIn = data !== undefined;

  // Stagger effect for menu items
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, borderRadius: "100%" },
    show: {
      opacity: 1,
      scale: 1,
      borderRadius: "0%",
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.4,
        ease: "circOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };
  return (
    <AnimatePresence>
      {hamburger && (
        <motion.div
          className="bg-bg fixed inset-0 z-60 flex flex-col items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {/* Top Section: Logo & Close Hint */}
          <div className="mt-12 flex w-full flex-col items-center px-6">
            <motion.img
              variants={itemVariants}
              className="mb-4 w-48 drop-shadow-md"
              src={darkMode ? logoDark : logoLight}
              alt="Logo"
            />
            <div className="bg-main-btn/20 h-1 w-12 rounded-full" />
          </div>

          {/* Middle Section: Main Links */}
          <nav className="flex w-full flex-col items-center gap-2 px-10">
            <MenuLink
              to="/"
              icon={<FaHome />}
              label="Home"
              onClick={() => setHamburger(false)}
              variants={itemVariants}
            />
            <MenuLink
              to="/menu"
              icon={<BiFoodMenu />}
              label="Menu"
              onClick={() => setHamburger(false)}
              variants={itemVariants}
            />

            {isAdmin && (
              <MenuLink
                to="/dashboard/menus"
                icon={<MdDashboardCustomize />}
                label="Admin Panel"
                onClick={() => setHamburger(false)}
                variants={itemVariants}
              />
            )}

            {isUser && (
              <MenuLink
                to="/order-history"
                icon={<MdWorkHistory />}
                label="My Orders"
                onClick={() => setHamburger(false)}
                variants={itemVariants}
              />
            )}
          </nav>

          {/* Bottom Section: Auth & Settings */}
          <motion.div
            variants={itemVariants}
            className="bg-main-btn w-full rounded-t-[3rem] p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-6 text-sm font-black tracking-widest text-white/90 uppercase italic">
                {!isLoggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setHamburger(false)}
                      className="flex items-center gap-2"
                    >
                      <IoLogInSharp size={20} /> Login
                    </NavLink>
                    <span className="opacity-30">|</span>
                    <NavLink
                      to="/register"
                      onClick={() => setHamburger(false)}
                      className="flex items-center gap-2"
                    >
                      <FaPersonCirclePlus size={20} /> Join Us
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setHamburger(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <RiLogoutBoxFill size={20} /> Logout
                  </button>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 py-4 text-white transition-all hover:bg-white/20"
              >
                {darkMode ? (
                  <MdLightMode size={24} />
                ) : (
                  <MdDarkMode size={24} />
                )}
                <span className="font-bold tracking-tighter uppercase italic">
                  Switch to {darkMode ? "Light" : "Dark"} Mode
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuLink({ to, icon, label, onClick, variants }: any) {
  return (
    <motion.div variants={variants} className="w-full">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `flex w-full items-center justify-between rounded-2xl px-6 py-5 transition-all ${
            isActive
              ? "bg-main text-main-btn scale-105 shadow-sm"
              : "text-text-dark/70 hover:bg-main-light"
          }`
        }
      >
        <span className="text-2xl font-black tracking-tighter uppercase italic">
          {label}
        </span>
        <span className="text-main-btn text-2xl">{icon}</span>
      </NavLink>
    </motion.div>
  );
}
export default MobileMenuList;
