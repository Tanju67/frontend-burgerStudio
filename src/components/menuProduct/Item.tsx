import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import noImg from "../../assets/noImg.png";
import useDashboard from "../../shared/hooks/useDahboard";
import { useDeleteProductMutation } from "../../shared/services/productApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { cn } from "../../shared/utils/cn";
import { formatPrice } from "../../shared/utils/helper";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { toaster } from "../../shared/utils/toaster";

function Item({ _id, title, image, description, price }: Product) {
  const { data: user } = useGetCurrentUserQuery();
  const {
    dashboard: { menuActiveTab },
    openProductModal,
  } = useDashboard();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const isGrid = menuActiveTab === 0;
  const isList = menuActiveTab === 1;
  const isImage = menuActiveTab === 2;

  const isTestAdmin = user?.role === "test-admin";

  const deleteProductHandler = async () => {
    if (isTestAdmin) {
      return toaster("warning", "Test admin cannot delete items.");
    }

    if (!confirm("Are you sure?")) return;

    try {
      await deleteProduct(_id).unwrap();
      toaster("success", "Menu deleted");
    } catch (error) {
      console.log(error);
      toaster("error", "Failed to delete menu");
    }
  };

  const handleEdit = () => {
    openProductModal({ _id, title, description, price });
  };

  return (
    <li
      className={cn(
        "text-xs sm:text-sm md:text-base",
        !isImage &&
          "border-main bg-main-light flex w-full items-center justify-between gap-4 border p-1",
        isImage && "bg-main-light relative shadow-md",
      )}
    >
      <div
        className={cn(
          isGrid &&
            "flex w-60 items-center gap-1 text-sm max-[465px]:flex-row min-[465px]:w-24 min-[465px]:flex-col",
          isList && "flex w-60 items-center gap-1 text-sm",
          isImage && "w-full",
        )}
      >
        <img
          src={image || noImg}
          alt={title}
          className={cn(
            "object-cover object-center",
            !isImage && "min-h-16 w-24",
            isImage && "h-80 w-full",
          )}
        />
        {!isImage && (
          <span className={cn(!isImage && "line-clamp-1 font-bold capitalize")}>
            {title}
          </span>
        )}
      </div>
      <div className={cn(!isImage && "flex-1", isImage && "p-2")}>
        <span
          className={cn("text-sm italic", !isImage && "hidden lg:line-clamp-1")}
        >
          {description}
        </span>
      </div>
      {!isImage && (
        <div className="flex w-20">
          <span
            className={cn(
              !isImage &&
                "bg-main-dark flex-1 rounded-sm p-1 text-center text-white",
            )}
          >
            {formatPrice(price)}
          </span>
        </div>
      )}
      <div
        className={cn(
          isImage &&
            "bg-main-btn/70 absolute top-70 flex w-full justify-between p-1 text-white",
        )}
      >
        {isImage && (
          <div className="flex gap-4">
            <span className="font-bold capitalize">{title}</span>
            <span>{formatPrice(price)}</span>
          </div>
        )}
        <div
          className={cn(
            !isImage && "flex h-full flex-col justify-between gap-1 text-white",
            isImage && "flex gap-4",
          )}
        >
          <Button
            type="button"
            disabled={isLoading}
            className={cn(
              !isImage &&
                "group bg-main-btn hover:bg-main-btn-hover flex flex-1 items-center justify-center p-2",
              isImage &&
                "hover:text-main-btn will-change-colors flex items-center justify-center p-1 transition-colors duration-300 ease-in-out hover:bg-white",
            )}
            onClick={() => handleEdit()}
          >
            <FaEdit />
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={deleteProductHandler}
            className={cn(
              !isImage &&
                "group bg-main-btn hover:bg-main-btn-hover flex flex-1 items-center justify-center p-2",
              isImage &&
                "hover:text-main-btn will-change-colors flex items-center justify-center p-1 transition-colors duration-300 ease-in-out hover:bg-white",
            )}
          >
            {isLoading ? <Spinner /> : <MdDeleteForever />}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Item;
