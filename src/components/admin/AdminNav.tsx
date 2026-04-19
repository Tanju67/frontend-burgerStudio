import { IoArrowBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useDarkMode from "../../shared/hooks/useDarkMode";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function AdminNav() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="top-0 right-2 left-2 z-40 rounded-b-lg md:fixed md:pt-2">
      <div className="bg-main w.full text-text-dark flex rounded-lg px-4 shadow-md md:h-12.5">
        <div className="flex flex-1 items-center justify-center py-2">
          <NavLink
            className="hover:bg-main-dark flex items-center gap-1 rounded-sm p-1 text-sm transition-all duration-300 ease-in-out hover:text-white md:text-base"
            to={".."}
          >
            <IoArrowBackOutline />
            <span className="hidden md:block">Back</span>
          </NavLink>
          <h1 className="flex-1 text-center text-base uppercase md:text-xl">
            Admin Dashboard
          </h1>

          <button
            className="hover:bg-main-btn hover:text-text-light ml-4 rounded-md p-1 transition-all duration-300 ease-in-out"
            onClick={toggleDarkMode}
          >
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
