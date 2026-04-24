import { IoArrowBackOutline } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useDarkMode from "../../shared/hooks/useDarkMode";

function AdminNav() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="fixed top-0 right-0 left-0 z-90 h-34 px-2 pt-2 backdrop-blur-2xl sm:h-40 md:h-auto md:pb-2">
      <div className="bg-main/90 text-main-dark flex h-14 items-center rounded-2xl border border-white/20 px-4 shadow-lg backdrop-blur-md">
        {/* Back Button */}
        <NavLink
          className="group bg-main-dark/5 text-main-dark hover:bg-main-btn flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-black uppercase italic transition-all hover:text-white"
          to=".."
        >
          <IoArrowBackOutline
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="hidden md:block">Back</span>
        </NavLink>

        {/* Title */}
        <h1 className="flex-1 text-center text-lg font-black tracking-tighter uppercase italic md:text-2xl">
          Studio <span className="text-main-btn">Admin</span>
        </h1>

        {/* Theme Toggle */}
        <button
          className="bg-main-dark/5 hover:bg-main-btn flex h-10 w-10 items-center justify-center rounded-xl shadow-inner transition-all hover:text-white"
          onClick={toggleDarkMode}
        >
          {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default AdminNav;
