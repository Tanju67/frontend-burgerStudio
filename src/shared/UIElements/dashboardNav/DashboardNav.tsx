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
    <div className="bg-main text-main-btn border-main-btn/5 flex items-center justify-between rounded-t-2xl border-b px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        {isRedirect && (
          <Link
            to=".."
            className="bg-main-btn/10 hover:bg-main-btn group flex items-center gap-2 rounded-lg px-3 py-1 transition-all hover:text-white"
          >
            <IoArrowBackOutline className="transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-black tracking-tighter uppercase italic">
              Back
            </span>
          </Link>
        )}
        <h2
          className={`text-xl font-black tracking-tighter uppercase italic ${!isRedirect && "py-1"}`}
        >
          {title}
        </h2>
      </div>

      {rightSection && (
        <div className="flex items-center gap-4">{children}</div>
      )}
    </div>
  );
}

export default DashboardNav;
