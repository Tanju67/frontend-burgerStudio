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
};

function NavItem({ data, isBtnVisible, btnTitle }: NavItemProps) {
  const {
    dashboard: { menuActiveTab },
    setMenuActiveTab,
    openMenuModal,
    openProductModal,
  } = useDashboard();

  console.log(menuActiveTab);

  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div>
      <ul className="hidden items-center justify-center gap-2 text-sm lg:flex xl:text-base">
        {data.map((item) => {
          const Icon = item.icon;

          const isActive = menuActiveTab === Number(item.id);

          return (
            <li key={item.id}>
              <Button
                type="button"
                onClick={() => setMenuActiveTab?.(Number(item.id))}
                className={
                  "hover:bg-main-dark flex items-center justify-center gap-1 px-2 py-1 hover:text-white! " +
                  (isActive ? "bg-main-dark text-white" : "text-text-dark!")
                }
              >
                <span>
                  <Icon />
                </span>
                <span className="capitalize">{item.title}</span>
              </Button>
            </li>
          );
        })}

        {isBtnVisible && (
          <li className="flex items-center justify-center gap-1">
            <Button
              type="button"
              onClick={() => {
                if (btnTitle === "Add Menu") {
                  openMenuModal(null);
                } else {
                  openProductModal(null);
                }
              }}
              className="bg-main-btn hover:bg-main-btn-hover flex items-center justify-center gap-1 px-2 py-1"
            >
              <span>
                <FaPlus />
              </span>
              <span>{btnTitle}</span>
            </Button>
          </li>
        )}
      </ul>

      {isNavOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      <div className="relative">
        <MdOutlineMenuOpen
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-lg lg:hidden"
        />
        <AnimatePresence>
          {isNavOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-bg absolute right-0 z-50 flex h-20 w-60 flex-col items-start gap-1 p-2 pl-4 shadow-lg"
            >
              {data.map((item) => {
                const Icon = item.icon;

                const isActive = menuActiveTab === Number(item.id);

                return (
                  <>
                    <li key={item.id}>
                      <Button
                        type="button"
                        onClick={() => {
                          setMenuActiveTab?.(Number(item.id));
                          setIsNavOpen(false);
                        }}
                        className={
                          "hover:bg-main-dark flex items-center justify-center gap-1 px-2 py-1 hover:text-white " +
                          (isActive
                            ? "bg-main-dark text-white"
                            : " text-text-dark!")
                        }
                      >
                        <span>
                          <Icon />
                        </span>
                        <span className="capitalize">{item.title}</span>
                      </Button>
                    </li>
                  </>
                );
              })}
              {isBtnVisible && (
                <li className="flex items-center justify-center gap-1">
                  <Button
                    type="button"
                    onClick={() => {
                      if (btnTitle === "Add Menu") {
                        openMenuModal(null);
                      } else {
                        openProductModal(null);
                      }

                      setIsNavOpen(false);
                    }}
                    className="bg-main-btn hover:bg-main-btn-hover flex items-center justify-center gap-1 px-2 py-1 text-white"
                  >
                    <span>
                      <FaPlus />
                    </span>
                    <span>{btnTitle}</span>
                  </Button>
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NavItem;
