import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";
import MobileMenuList from "./MobileMenuList";
import ToggleButton from "./ToggleButton";
import useDarkMode from "../../hooks/useDarkMode";

type MobileNavProps = {
  title: string | boolean;
  logout: () => void;
};

function MobileNav({ title, logout }: MobileNavProps) {
  const [hamburger, setHamburger] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <nav className={`bg-bg fixed top-0 z-30 w-full md:hidden`}>
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <NavLink to="/" onClick={() => setHamburger(false)}>
            <img
              src={darkMode ? logoDark : logoLight}
              alt="logo"
              className="w-32 object-contain transition-transform active:scale-95"
            />
          </NavLink>
        </div>
        <div>
          <ToggleButton hamburger={hamburger} setHamburger={setHamburger} />
        </div>
        <MobileMenuList
          hamburger={hamburger}
          setHamburger={setHamburger}
          logout={logout}
        />
      </div>
      <div className="relative overflow-hidden">
        {!title || location.pathname === "/" ? (
          <NavLink
            to="/menu"
            className="bg-main-btn block transform px-4 py-3 shadow-lg transition-transform active:translate-y-1"
          >
            <h1 className="animate-pulse text-center text-sm font-black tracking-widest text-white uppercase italic">
              🔥 Order Online Now 🔥
            </h1>
          </NavLink>
        ) : (
          <div className="bg-main flex items-center px-4 py-2.5 shadow-md">
            <NavLink
              className="text-main-dark flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all active:scale-90"
              to=".."
            >
              <IoArrowBackOutline size={20} />
            </NavLink>
            <h1 className="text-main-dark flex-1 pr-8 text-center text-sm font-black tracking-tighter uppercase italic">
              {title}
            </h1>
          </div>
        )}
      </div>
    </nav>
  );
}

export default MobileNav;
