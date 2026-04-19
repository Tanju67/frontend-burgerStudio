import { Link } from "react-router-dom";
import type { Menu } from "../../shared/schemas/menuSchemas";

function Item({ _id, title, image }: Menu) {
  return (
    <li className="group relative">
      <Link to={`${_id}?title=${title}`}>
        <div className="h-60 w-full overflow-hidden sm:h-50">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-110"
          />
        </div>
        <div className="bg-main-btn/70 absolute bottom-2 w-full text-center text-white">
          <span className="capitalize">{title}</span>
        </div>
      </Link>
    </li>
  );
}

export default Item;
