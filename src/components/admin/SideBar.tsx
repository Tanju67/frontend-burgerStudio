import { Link, NavLink } from "react-router-dom";
import { MdMenuBook, MdOutlineBorderColor } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import useDarkMode from "../../shared/hooks/useDarkMode";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const { darkMode } = useDarkMode();

  return (
    <aside className="bg-main border-main/10 fixed top-18 right-2 left-2 z-50 flex h-14 items-center rounded-2xl border py-4 shadow-lg transition-all duration-300 sm:static sm:mt-22 sm:h-auto md:col-span-2 md:mt-0 md:flex-col md:py-10 md:shadow-none lg:col-span-1">
      {/* Logo Section - Only Desktop */}
      <div className="mb-12 hidden px-6 md:block">
        <Link to="/">
          <img
            src={darkMode ? logoDark : logoLight}
            alt="logo"
            className="w-40 object-contain transition-transform hover:scale-105"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex w-full gap-1 px-2 md:flex-col md:gap-4 md:px-4">
        <SidebarItem to="menus" icon={<MdMenuBook />} label="Menus" end />
        <SidebarItem to="products" icon={<FaProductHunt />} label="Products" />
        <SidebarItem
          to="orders"
          icon={<MdOutlineBorderColor />}
          label="Orders"
        />
      </ul>
    </aside>
  );
}

export default Sidebar;
