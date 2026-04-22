import { NavLink } from "react-router-dom";

function SidebarItem({
  to,
  icon,
  label,
  end = false,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}) {
  return (
    <li className="flex-1 md:w-full">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `group flex items-center justify-center gap-3 rounded-xl px-2 py-3 text-sm font-black tracking-tighter uppercase italic transition-all duration-300 sm:px-4 md:justify-start md:py-4 md:text-lg ${
            isActive
              ? "bg-main-btn text-white shadow-lg md:scale-105"
              : "text-main-dark hover:bg-main-dark/5"
          }`
        }
      >
        <span className="text-xl transition-transform group-hover:scale-110">
          {icon}
        </span>
        <span className="">{label}</span>
      </NavLink>
    </li>
  );
}

export default SidebarItem;
