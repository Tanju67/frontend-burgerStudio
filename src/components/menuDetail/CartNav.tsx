import { BsInfoCircle } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import useCart from "../../shared/hooks/useCart";

function CartNav() {
  const {
    cart: { activeCart },
  } = useCart();

  const getStepClass = (stepIndex: number) => {
    const isActive = activeCart === stepIndex;
    const baseClass =
      "flex items-center justify-center gap-2 py-3 transition-all duration-500 font-black uppercase italic text-xs md:text-sm tracking-tighter";

    return isActive
      ? `${baseClass} bg-main-btn text-white shadow-inner`
      : `${baseClass} bg-main-light text-main-dark/50 opacity-80`;
  };

  return (
    <nav className="text-text-dark grid w-full grid-cols-3 overflow-hidden">
      {/* Step 1: Cart */}
      <div className="relative">
        <h1
          className={`${getStepClass(0)} [clip-path:polygon(0_0,100%_0,92%_100%,0%_100%)]`}
        >
          <FaCartPlus className={activeCart === 0 ? "animate-pulse" : ""} />
          <span className="hidden md:block">Cart</span>
        </h1>
      </div>

      {/* Step 2: Address */}
      <div className="relative -ml-2">
        {/* Negative margin for overlapping effect */}
        <h1
          className={`${getStepClass(1)} [clip-path:polygon(8%_0,100%_0,92%_100%,0%_100%)]`}
        >
          <FaLocationDot className={activeCart === 1 ? "animate-bounce" : ""} />
          <span className="hidden md:block">Address</span>
        </h1>
      </div>

      {/* Step 3: Info */}
      <div className="relative -ml-2">
        <h1
          className={`${getStepClass(2)} [clip-path:polygon(8%_0,100%_0,100%_100%,0%_100%)]`}
        >
          <BsInfoCircle className={activeCart === 2 ? "rotate-12" : ""} />
          <span className="hidden md:block">Status</span>
        </h1>
      </div>
    </nav>
  );
}

export default CartNav;
