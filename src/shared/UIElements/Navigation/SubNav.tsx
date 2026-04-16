import { BiFoodMenu } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoArrowBackOutline, IoLogInSharp } from "react-icons/io5";
import { MdDashboardCustomize, MdWorkHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import NavLinkListItem from "./NavLinkListItem";
import { NavLink, useNavigate } from "react-router-dom";
import type { MainNavProps } from "./MainNav";

function SubNav({ title }: MainNavProps) {
  const isAdmin = false;
  const isUser = false;
  const isLoggedIn = false;
  const navigate = useNavigate();
  if (typeof title == "string") {
    return (
      <div className="bg-main text-main-dark hidden h-12.5 md:flex">
        <div className="container-box flex-1 items-center justify-center md:flex">
          <NavLink
            className="hover:bg-main-dark hover:text-text-light flex items-center gap-1 rounded-sm p-1 transition-all duration-300 ease-in-out"
            to={".."}
          >
            <IoArrowBackOutline />
            <span>Back</span>
          </NavLink>
          <h1 className="flex-1 text-center uppercase">{title}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-main text-text-nav hidden h-12.5 items-center md:flex">
      <ul className="container-box flex justify-center gap-4 py-2 uppercase">
        <NavLinkListItem link="/" title="Home">
          <FaHome />
        </NavLinkListItem>

        <NavLinkListItem link="/menu" title="Menu">
          <BiFoodMenu />
        </NavLinkListItem>

        {isAdmin && (
          <NavLinkListItem link="/dashboard/menus" title="Dashboard">
            <MdDashboardCustomize />
          </NavLinkListItem>
        )}

        {isUser && (
          <NavLinkListItem link="/order-history" title="Order History">
            <MdWorkHistory />
          </NavLinkListItem>
        )}

        {isLoggedIn === false && (
          <>
            <NavLinkListItem link="/login" title="Login">
              <IoLogInSharp />
            </NavLinkListItem>

            <NavLinkListItem link="/register" title="Register">
              <FaPersonCirclePlus />
            </NavLinkListItem>
          </>
        )}
        {isLoggedIn && (
          <NavLinkListItem
            link=""
            title="Logout"
            isButton={true}
            onClick={() => {
              navigate(0);
            }}
          >
            <RiLogoutBoxFill />
          </NavLinkListItem>
        )}
      </ul>
    </div>
  );
}

export default SubNav;
