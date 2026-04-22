import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import noImg from "../../assets/noImg.png";
import Button from "../../shared/UIElements/button/Button";
import useCart from "../../shared/hooks/useCart";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { toaster } from "../../shared/utils/toaster";
import useDarkMode from "../../shared/hooks/useDarkMode";

function MenuDetailListItem({
  _id,
  title,
  image,
  description,
  price,
  setShowModal,
}: Product & { setShowModal: (isOpen: boolean) => void }) {
  const { setCartModal, setProduct, addToCart, setActiveCart } = useCart();
  const { darkMode } = useDarkMode();
  const { data: user } = useGetCurrentUserQuery();
  const navigate = useNavigate();

  const product: Product & { amount: number } = {
    _id,
    title,
    image,
    price,
    description,
    amount: 1,
  };

  const handleSelectProduct = () => {
    if (user === undefined) {
      navigate("/login");
      return;
    }

    if (user?.role === "test-admin" || user?.role === "admin") {
      toaster("warning", "Admin is not allowed to add to cart.");
      return;
    }
    setCartModal(true);
    setActiveCart(0);
    setProduct(product);
    addToCart(product);
  };

  return (
    <li className="group bg-bg hover:border-main/20 self-start overflow-hidden rounded-4xl border border-transparent shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          className="h-56 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 min-[411px]:h-64 lg:h-56"
          src={image || noImg}
          alt={title}
        />

        <div className="text-main-btn absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 font-bold shadow-sm backdrop-blur-sm dark:bg-black/60 dark:text-white">
          ${price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-text-dark mb-2 text-xl font-black tracking-tighter uppercase italic">
          {title}
        </h3>

        <p className="text-text-dark/70 line-clamp-2 min-h-12 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 px-5 pb-5">
        <button
          type="button"
          onClick={() => {
            setShowModal(true);
            setProduct(product);
          }}
          className="text-text-dark/70 hover:text-main-btn flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
        >
          <BsInfoCircle className="text-lg" />
          <span className="hidden sm:inline">Info</span>
        </button>

        <Button
          type="button"
          onClick={handleSelectProduct}
          className="bg-main-btn hover:bg-main-btn-hover rounded-full px-6 py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-lg transition-all active:scale-95"
        >
          Choose
        </Button>
      </div>
    </li>
  );
}

export default MenuDetailListItem;
