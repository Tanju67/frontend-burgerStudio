import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineMenuOpen } from "react-icons/md";
import useDashboard from "../../hooks/useDahboard";
import { type dashboardMenuNavData } from "../../utils/data";
import Button from "../button/Button";

type NavItemProps = {
  data: dashboardMenuNavData[];
  isLink?: boolean;
  isBtnVisible?: boolean;
  btnTitle?: string;
  breakPoint?: boolean;
};

function NavItem({ data, isBtnVisible, btnTitle, breakPoint }: NavItemProps) {
  const {
    dashboard: { menuActiveTab },
    setMenuActiveTab,
    openMenuModal,
    openProductModal,
  } = useDashboard();

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <ul
        className={`hidden items-center gap-3 text-sm ${breakPoint ? `min-[1510px]:flex` : "lg:flex"}`}
      >
        {data.map((item) => {
          const Icon = item.icon;
          const isActive = menuActiveTab === Number(item.id);

          return (
            <li key={item.id}>
              <Button
                type="button"
                onClick={() => setMenuActiveTab?.(Number(item.id))}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 font-black tracking-tighter uppercase italic shadow-sm transition-all ${
                  isActive
                    ? "bg-main-btn scale-105"
                    : "hover:bg-main-btn/10 text-main-btn! bg-white/50 dark:text-black!"
                }`}
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </Button>
            </li>
          );
        })}

        {isBtnVisible && (
          <li className="border-main-btn/20 ml-4 border-l pl-4">
            <Button
              type="button"
              onClick={() => {
                if (btnTitle === "Add Menu") {
                  openMenuModal(null);
                } else {
                  openProductModal(null);
                }
              }}
              className="bg-main-btn hover:bg-main-btn/90 flex items-center gap-2 rounded-xl px-6 py-2 font-black tracking-widest text-white uppercase italic shadow-lg transition-all hover:rotate-1"
            >
              <FaPlus />
              <span>{btnTitle}</span>
            </Button>
          </li>
        )}
      </ul>

      {/* Mobile Menu Trigger */}
      <div
        className={`flex items-center gap-3 ${breakPoint ? `min-[1510px]:hidden` : "lg:hidden"}`}
      >
        {isBtnVisible && (
          <button
            onClick={() =>
              btnTitle === "Add Menu"
                ? openMenuModal(null)
                : openProductModal(null)
            }
            className="bg-main-btn rounded-lg p-2 text-white shadow-md"
          >
            <FaPlus size={18} />
          </button>
        )}
        <MdOutlineMenuOpen
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-main-btn cursor-pointer text-3xl transition-transform hover:scale-110"
        />
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-main-dark/20 fixed inset-0 z-100 backdrop-blur-sm"
              onClick={() => setIsNavOpen(false)}
            />
            <motion.ul
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-bg border-main absolute top-12 right-0 z-110 flex w-60 flex-col gap-2 rounded-2xl border-2 p-3 shadow-2xl"
            >
              {data.map((item) => {
                const Icon = item.icon;
                const isActive = menuActiveTab === Number(item.id);
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setMenuActiveTab?.(Number(item.id));
                        setIsNavOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-black tracking-tighter uppercase italic transition-all ${isActive ? "bg-main text-main-btn" : "text-text-dark hover:bg-main/10"}`}
                    >
                      <Icon size={20} />
                      <span>{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NavItem;
