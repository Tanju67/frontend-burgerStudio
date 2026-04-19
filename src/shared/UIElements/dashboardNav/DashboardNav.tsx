import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function DashboardNav({
  title,
  rightSection,
  children,
  isRedirect,
}: {
  title: string;
  rightSection: boolean;
  children?: React.ReactNode;
  isRedirect?: boolean;
}) {
  return (
    <div className="bg-main text-text-dark flex items-center justify-between px-4 py-2">
      <div>
        {isRedirect && (
          <Link to=".." className="flex items-center justify-center gap-1">
            <IoArrowBackOutline />
            <span className="py-1 font-bold capitalize">{title}</span>
          </Link>
        )}
        {!isRedirect && <span className="py-1 font-bold">{title}</span>}
      </div>

      {rightSection && <div>{children}</div>}
    </div>
  );
}

export default DashboardNav;
