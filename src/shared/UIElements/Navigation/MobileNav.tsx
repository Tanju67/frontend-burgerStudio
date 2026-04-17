import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";
import MobileMenuList from "./MobileMenuList";
import ToggleButton from "./ToggleButton";

type MobileNavProps = {
  title: string | boolean;
  logout: () => void;
};

function MobileNav({ title, logout }: MobileNavProps) {
  const [hamburger, setHamburger] = useState(false);
  const darkMode = false;

  return (
    <nav className={`bg-bg fixed top-0 z-30 w-full md:hidden`}>
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <div className="">
            <img
              src={darkMode ? logoDark : logoLight}
              alt="logo"
              className={`w-50`}
            />
          </div>
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
      {!title && (
        <div className="text-bpld bg-main px-4 py-2 text-center text-xl uppercase">
          <NavLink to="/menu">
            <h1>Order Online</h1>
          </NavLink>
        </div>
      )}
      {title && (
        <div className="text-bpld bg-main px-4 py-2 text-center text-lg uppercase">
          <div className="flex flex-1 items-center justify-center">
            <NavLink
              className="flex items-center gap-1 rounded-sm p-1 transition-all duration-300 ease-in-out"
              to={".."}
            >
              <IoArrowBackOutline />
            </NavLink>
            <h1 className="flex-1 text-center uppercase">{title}</h1>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MobileNav;
