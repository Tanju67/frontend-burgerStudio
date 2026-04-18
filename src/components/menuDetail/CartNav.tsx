import { BsInfoCircle } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import useCart from "../../shared/hooks/useCart";

function CartNav() {
  const {
    cart: { activeCart },
  } = useCart();
  return (
    <div className="text-text-dark grid grid-cols-3">
      <div>
        <h1
          className={`flex items-center justify-center gap-1 py-1 [clip-path:polygon(0_0,25%_0%,100%_0%,95%_100%,0%_100%)] ${activeCart === 0 ? "bg-main-btn text-white" : "bg-main"}`}
        >
          <span>
            <FaCartPlus />
          </span>
          <span className="hidden md:block">Cart</span>
        </h1>
      </div>
      <div>
        <h1
          className={`flex items-center justify-center gap-1 py-1 [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)] ${activeCart === 1 ? "bg-main-btn text-white" : "bg-main"}`}
        >
          <span>
            <FaLocationDot />
          </span>
          <span className="hidden md:block">Your Address</span>
        </h1>
      </div>
      <div>
        <h1
          className={`flex items-center justify-center gap-1 py-1 [clip-path:polygon(5%_0%,100%_0%,100%_0%,100%_100%,0%_100%)] ${activeCart === 2 ? "bg-main-btn text-white" : "bg-main"}`}
        >
          <span>
            <BsInfoCircle />
          </span>
          <span className="hidden md:block">Info</span>
        </h1>
      </div>
    </div>
  );
}

export default CartNav;
