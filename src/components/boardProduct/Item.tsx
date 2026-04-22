import { Link } from "react-router-dom";
import type { Menu } from "../../shared/schemas/menuSchemas";

function Item({ _id, title, image }: Menu) {
  return (
    <li className="group relative list-none">
      <Link
        to={`${_id}?title=${title}`}
        className="border-main bg-main relative block overflow-hidden rounded-4xl border-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
      >
        <div className="h-64 w-full overflow-hidden sm:h-56">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-2"
          />
        </div>

        <div className="from-main-btn via-main-btn/80 absolute inset-x-0 bottom-0 translate-y-2 transform bg-linear-to-t to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex flex-col items-center">
            <span className="text-center text-lg leading-none font-black tracking-tighter text-white uppercase italic">
              {title}
            </span>
            <span className="text-main mt-1 text-[10px] font-black tracking-[0.2em] uppercase opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0">
              Manage Products
            </span>
          </div>
        </div>

        <div className="bg-main text-main-btn absolute top-3 right-3 scale-100 rounded-lg px-2 py-1 text-[10px] font-black uppercase italic opacity-100 transition-all group-hover:scale-100 group-hover:opacity-100 sm:scale-50 sm:opacity-0">
          Select
        </div>
      </Link>
    </li>
  );
}

export default Item;
