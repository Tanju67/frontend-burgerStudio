import { Link } from "react-router-dom";
import noImg from "../../assets/noImg.png";
import type { Menu } from "../../shared/schemas/menuSchemas";

function MenuListItem({ _id, title, image }: Menu) {
  return (
    <li className="group relative h-70 w-full overflow-hidden rounded-2xl shadow-sm md:h-80 lg:h-100">
      <Link to={`${_id}`}>
        <img
          src={image || noImg}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-110"
        />
        <span className="bg-main-btn absolute bottom-4 left-4 w-1/3 py-2 text-center font-bold text-white capitalize opacity-80">
          {title}
        </span>
      </Link>
    </li>
  );
}

export default MenuListItem;
