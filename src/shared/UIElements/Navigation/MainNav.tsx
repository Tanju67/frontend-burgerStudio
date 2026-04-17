import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseApi } from "../../services/baseApi";
import { useAppDispatch } from "../../store/hooks";
import MobileNav from "./MobileNav";
import NavWithLogo from "./NavWithLogo";
import SubNav from "./SubNav";

export type MainNavProps = {
  title: string | boolean;
  admin?: boolean;
};

function MainNav({ title, admin }: MainNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(baseApi.util.resetApiState());
    navigate("/login");
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={`fixed top-0 z-40 hidden w-full transition-all duration-300 md:block ${
          scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : ""
        }`}
      >
        {!admin && <NavWithLogo scrolled={scrolled} />}
        <SubNav title={title} logout={logout} />
      </nav>
      <MobileNav logout={logout} title={title} />
    </>
  );
}

export default MainNav;
