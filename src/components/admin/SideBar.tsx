import { Link, NavLink } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineBorderColor } from "react-icons/md";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";
import useDarkMode from "../../shared/hooks/useDarkMode";

function Sidebar() {
  const { darkMode } = useDarkMode();
  return (
    <nav className="bg-main text-text-dark mb-2 flex w-full flex-col items-center justify-center py-2 shadow-md md:col-span-2 md:justify-start md:gap-4 md:rounded-lg md:pt-20 lg:col-span-1">
      <Link to="/">
        <img
          src={darkMode ? logoDark : logoLight}
          alt="logo"
          className="hidden w-50 md:block"
        />
      </Link>

      <ul className="flex items-start md:w-2/3 md:flex-col md:gap-2 md:text-xl">
        <li className="flex w-full">
          <NavLink
            to={"menus"}
            className={({ isActive }) =>
              `hover:bg-main-dark flex w-full items-center justify-center gap-1 px-2 py-1 transition-colors duration-300 ease-in-out hover:text-white md:px-10 ${isActive ? "bg-main-dark text-white" : ""}`
            }
            end
          >
            <MdMenuBook /> <span className="flex-1">Menu</span>
          </NavLink>
        </li>
        <li className="flex w-full">
          <NavLink
            to={"products"}
            className={({ isActive }) =>
              `hover:bg-main-dark flex w-full items-center justify-center gap-1 px-2 py-1 transition-colors duration-300 ease-in-out hover:text-white md:px-10 ${isActive ? "bg-main-dark text-white" : ""}`
            }
          >
            <FaProductHunt />
            <span className="flex-1">Products</span>
          </NavLink>
        </li>
        <li className="flex w-full">
          <NavLink
            to={"orders"}
            className={({ isActive }) =>
              `hover:bg-main-dark flex w-full items-center justify-center gap-1 px-2 py-1 transition-colors duration-300 ease-in-out hover:text-white md:px-10 ${isActive ? "bg-main-dark text-white" : ""}`
            }
          >
            <MdOutlineBorderColor />
            <span className="flex-1">Orders</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
