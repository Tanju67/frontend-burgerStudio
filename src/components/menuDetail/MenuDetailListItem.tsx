import { BsInfoCircle } from "react-icons/bs";
import useCart from "../../shared/hooks/useCart";
import { useNavigate } from "react-router-dom";
import noImg from "../../assets/noImg.png";
import Button from "../../shared/UIElements/button/Button";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";

function MenuDetailListItem({
  _id,
  title,
  image,
  description,
  price,
  setShowModal,
}: Product & { setShowModal: (isOpen: boolean) => void }) {
  const { setCartModal, setProduct, addToCart, setActiveCart } = useCart();
  const { data: user } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  console.log(user);

  const product: Product & { amount: number } = {
    _id,
    title,
    image,
    price,
    description,
    amount: 1,
  };

  const handleSelectProduct = () => {
    if (user === undefined || user?.role === "admin") {
      navigate("/login");
      return;
    }
    setCartModal(true);
    setActiveCart(0);
    setProduct(product);
    addToCart(product);
  };
  return (
    <li className="bg-bg self-start overflow-hidden rounded-lg shadow-md">
      <div>
        <img
          className="h-50 w-full object-cover object-center min-[411px]:h-70 min-[521px]:h-90 lg:h-70"
          src={image || noImg}
          alt={title}
        />
      </div>
      <div className="p-4">
        <h2 className="text-main-btn text-center uppercase">{title}</h2>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-lg font-semibold">${price}</span>

        <Button
          type="button"
          onClick={handleSelectProduct}
          className="bg-main-btn hover:bg-main-btn-hover px-4 py-2 text-sm font-semibold"
        >
          Choose
        </Button>
      </div>

      <div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 px-4 py-2 text-sm transition-all duration-300 hover:underline"
        >
          <span>
            <BsInfoCircle />
          </span>
          <span
            onClick={() => {
              setShowModal(true);
              setProduct(product);
            }}
          >
            Product Info
          </span>
        </button>
      </div>
    </li>
  );
}

export default MenuDetailListItem;
