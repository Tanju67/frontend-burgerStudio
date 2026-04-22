import { Link } from "react-router-dom";
import noImg from "../../assets/noImg.png";
import type { Menu } from "../../shared/schemas/menuSchemas";

function MenuListItem({ _id, title, image }: Menu) {
  return (
    <li className="group bg-main-light relative h-72 w-full overflow-hidden rounded-3xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:h-80 lg:h-100">
      <Link to={`${_id}`} className="block h-full w-full">
        {/* Image Container */}
        <div className="h-full w-full overflow-hidden">
          <img
            src={image || noImg}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
          <div className="flex items-center justify-between">
            <div className="transform transition-transform duration-300 group-hover:translate-x-2">
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                {title}
              </h3>
              <div className="bg-main-btn mt-1 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full" />
            </div>

            <div className="text-main-btn flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default MenuListItem;
