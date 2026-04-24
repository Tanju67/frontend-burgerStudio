import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import noImg from "../../assets/noImg.png";
import useDashboard from "../../shared/hooks/useDahboard";
import type { Product } from "../../shared/schemas/productSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { useDeleteProductMutation } from "../../shared/services/productApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { cn } from "../../shared/utils/cn";
import { formatPrice } from "../../shared/utils/helper";
import { toaster } from "../../shared/utils/toaster";

function Item({ _id, title, image, description, price, menu }: Product) {
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
    if (isTestAdmin)
      return toaster("warning", "Test admin cannot delete items.");
    try {
      deleteProduct({
        productId: _id,
        menuId: (menu as { _id: string })._id,
      }).unwrap();
      toaster("success", "Product deleted");
    } catch (error) {
      console.log(error);
      toaster("error", "Failed to delete");
    }
  };

  return (
    <li
      className={cn(
        "bg-main-light overflow-hidden rounded-3xl shadow-sm",
        isList && "flex items-center justify-between gap-4 p-2",
        isGrid && "flex flex-col gap-3 p-4",
        isImage &&
          "group bg-main-light flex flex-col overflow-hidden rounded-3xl shadow-md transition-all hover:shadow-xl",
      )}
    >
      {/* HEADER SECTION (Photo + Title + Price/Buttons) */}
      <div
        className={cn(
          "flex items-center gap-3",
          isGrid && "border-main/10 w-full justify-between border-b-2 pb-3",
          isImage && "h-48 w-full border-0 p-0 sm:h-60 lg:h-72",
          isList && "",
        )}
      >
        {/* Product Image */}
        <div
          className={cn(
            "bg-main/10 shrink-0 overflow-hidden rounded-2xl",
            !isImage && "h-16 w-16",
            isImage && "h-full w-full rounded-none",
          )}
        >
          <img
            src={image || noImg}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Title & Info (Grid Mode) */}
        {isGrid && (
          <div className="flex min-w-0 flex-1 flex-col justify-center md:hidden lg:flex">
            <h3 className="text-main-btn line-clamp-1 text-base font-black tracking-tighter uppercase italic">
              {title}
            </h3>
            <span className="text-main-btn text-sm font-bold italic">
              {formatPrice(price)}
            </span>
          </div>
        )}

        {/* List Mode Title */}
        {isList && (
          <div className="flex-1">
            <h3 className="text-main-btn text-base font-black tracking-tighter uppercase italic">
              {title}
            </h3>
          </div>
        )}

        {/* Actions (Grid Header Right) */}
        {isGrid && (
          <div className="flex gap-1">
            <Button
              type="button"
              onClick={() =>
                openProductModal({ _id, title, description, price })
              }
              className="bg-main-btn rounded-xl p-2 text-white transition-all hover:scale-105 active:scale-95"
            >
              <FaEdit size={14} />
            </Button>
            <Button
              type="button"
              onClick={deleteProductHandler}
              className="rounded-xl bg-red-500/80 p-2 transition-all hover:scale-105 hover:bg-red-600 hover:text-white active:scale-95"
            >
              {isLoading ? <Spinner /> : <MdDeleteForever size={16} />}
            </Button>
          </div>
        )}
      </div>

      {/* CONTENT SECTION (Description) */}
      <div
        className={cn(
          "flex-1",
          isList && "hidden sm:line-clamp-2",
          isImage && "flex flex-col gap-2 p-4",
        )}
      >
        {isImage && (
          <div className="flex items-center justify-between">
            <h3 className="text-main-btn text-base font-black tracking-tight uppercase italic">
              {title}
            </h3>
            <span className="text-main-btn text-sm font-bold italic">
              {formatPrice(price)}
            </span>
          </div>
        )}

        {isGrid && (
          <div className="hidden min-w-0 flex-1 flex-col justify-center md:flex lg:hidden">
            <h3 className="text-main-btn line-clamp-1 text-base font-black tracking-tighter uppercase italic">
              {title}
            </h3>
            <span className="text-main-btn text-sm font-bold italic">
              {formatPrice(price)}
            </span>
          </div>
        )}
        <p
          className={cn(
            "text-xs leading-tight font-medium italic",
            isImage && "text-main-dark opacity-100",
            isGrid && "",
          )}
        >
          {description}
        </p>
      </div>

      {/* FOOTER ACTIONS (Only for List Mode) */}
      {isList && (
        <div className="flex items-center gap-3">
          <span className="bg-main-btn rounded-lg px-3 py-1 text-xs font-black text-white italic">
            {formatPrice(price)}
          </span>
          <div className="flex flex-col gap-1">
            <Button
              type="button"
              onClick={() =>
                openProductModal({ _id, title, description, price })
              }
              className="bg-main-btn rounded-xl p-2 text-white transition-all hover:scale-105 active:scale-95"
            >
              <FaEdit size={14} />
            </Button>
            <Button
              type="button"
              onClick={deleteProductHandler}
              className="rounded-xl bg-red-500/80 p-2 transition-all hover:scale-105 hover:bg-red-600 hover:text-white active:scale-95"
            >
              {isLoading ? <Spinner /> : <MdDeleteForever size={16} />}
            </Button>
          </div>
        </div>
      )}
      {isImage && (
        <div className="flex gap-2 p-4">
          <Button
            type="button"
            onClick={() => openProductModal({ _id, title, description, price })}
            className="bg-main-btn flex-1 rounded-xl p-2 text-white transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-1 font-black tracking-tighter uppercase italic sm:gap-2">
              <FaEdit size={18} />
              <span>Update</span>
            </span>
          </Button>
          <Button
            type="button"
            onClick={deleteProductHandler}
            className="flex-1 rounded-xl bg-red-500/80 p-2 transition-all hover:scale-105 hover:bg-red-600 hover:text-white active:scale-95"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <span className="flex items-center justify-center gap-1 font-black tracking-tighter uppercase italic sm:gap-2">
                <MdDeleteForever size={18} />
                <span>Delete</span>
              </span>
            )}
          </Button>
        </div>
      )}
    </li>
  );
}

export default Item;
