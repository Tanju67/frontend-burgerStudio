import { NavLink } from "react-router-dom";

type NavLinkListItemProps = {
  link: string;
  title: string;
  isButton?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

function NavLinkListItem({
  link,
  title,
  children,
  isButton,
  onClick,
}: NavLinkListItemProps) {
  if (isButton) {
    return (
      <li>
        <button className="navlink font-bold uppercase" onClick={onClick}>
          <span>{children}</span>
          <span> {title}</span>
        </button>
      </li>
    );
  }
  return (
    <li>
      <NavLink className="navlink" to={link}>
        <span>{children}</span>
        <span> {title}</span>
      </NavLink>
    </li>
  );
}

export default NavLinkListItem;
