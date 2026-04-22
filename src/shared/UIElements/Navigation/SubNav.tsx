import { BiFoodMenu } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoArrowBackOutline, IoLogInSharp } from "react-icons/io5";
import { MdDashboardCustomize, MdWorkHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/authApi";
import NavLinkListItem from "./NavLinkListItem";

type SubNavProps = {
  title: string | boolean;
  logout: () => void;
};

function SubNav({ title, logout }: SubNavProps) {
  const { data } = useGetCurrentUserQuery();
  const isAdmin = data?.role === "admin" || data?.role === "test-admin";
  const isUser = data?.role === "user";
  const isLoggedIn = data !== undefined;

  if (typeof title == "string") {
    return (
      <div className="bg-main text-main-dark hidden h-12.5 md:flex">
        <div className="container-box flex w-full items-center justify-between px-4">
          <NavLink
            className="group text-main-dark hover:text-main-btn flex items-center gap-2 text-xs font-black tracking-widest uppercase italic transition-colors"
            to={".."}
          >
            <div className="bg-main-light group-hover:bg-main-btn flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all group-hover:text-white">
              <IoArrowBackOutline size={18} />
            </div>
            <span>Back</span>
          </NavLink>

          <h1 className="text-main-btn text-xl font-black tracking-tighter uppercase italic drop-shadow-sm">
            {title}
          </h1>

          <div className="w-20" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-main text-text-nav hidden h-12.5 items-center md:flex">
      <ul className="container-box flex items-center justify-center gap-8 py-2">
        <NavLinkListItem link="/" title="Home">
          <FaHome size={18} />
        </NavLinkListItem>

        <NavLinkListItem link="/menu" title="Menu">
          <BiFoodMenu size={18} />
        </NavLinkListItem>

        {isAdmin && (
          <NavLinkListItem link="/dashboard/menus" title="Dashboard">
            <MdDashboardCustomize size={18} />
          </NavLinkListItem>
        )}

        {isUser && (
          <NavLinkListItem link="/order-history" title="History">
            <MdWorkHistory size={18} />
          </NavLinkListItem>
        )}

        {!isLoggedIn && (
          <div className="border-main/20 ml-4 flex gap-4 border-l pl-4">
            <NavLinkListItem link="/login" title="Login">
              <IoLogInSharp size={18} />
            </NavLinkListItem>

            <NavLinkListItem link="/register" title="Register">
              <FaPersonCirclePlus size={18} />
            </NavLinkListItem>
          </div>
        )}

        {isLoggedIn && (
          <div className="border-main/20 ml-4 border-l pl-4">
            <NavLinkListItem
              link=""
              title="Logout"
              isButton={true}
              onClick={logout}
            >
              <RiLogoutBoxFill size={18} className="text-rose-500" />
            </NavLinkListItem>
          </div>
        )}
      </ul>
    </div>
  );
}

export default SubNav;
