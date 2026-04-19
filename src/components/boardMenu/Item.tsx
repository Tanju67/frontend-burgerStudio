import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useDashboard from "../../shared/hooks/useDahboard";
import { useDeleteMenuMutation } from "../../shared/services/menuApi";
import Button from "../../shared/UIElements/button/Button";
import { cn } from "../../shared/utils/cn";
import { toaster } from "../../shared/utils/toaster";
import type { Menu } from "../../shared/schemas/menuSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";

function Item(props: Menu) {
  const { _id, title, image } = props;
  const [deleteMenu, { isLoading }] = useDeleteMenuMutation();
  const { data: user } = useGetCurrentUserQuery();
  const {
    dashboard: { menuActiveTab },
    openMenuModal,
  } = useDashboard();

  const isGrid = menuActiveTab === 0;
  const isImage = menuActiveTab === 2;
  const isTestAdmin = user?.role === "test-admin";

  const deleteMenuHandler = async () => {
    if (isTestAdmin) {
      return toaster("warning", "Test admin cannot delete items.");
    }

    if (!confirm("Are you sure?")) return;

    try {
      await deleteMenu(_id).unwrap();
      toaster("success", "Menu deleted");
    } catch (error) {
      console.log(error);
      toaster("error", "Failed to delete menu");
    }
  };

  const handleEdit = () => {
    openMenuModal(props);
  };

  return (
    <li
      className={cn(
        "transition-all duration-300",
        !isImage &&
          "border-main bg-main-light flex w-full items-center justify-between border p-1 text-sm shadow-sm",
        isImage && "group relative overflow-hidden rounded-md shadow-md",
      )}
    >
      <div
        className={cn(
          !isImage && "flex items-center gap-2",
          isGrid && "flex-col md:flex-row",
        )}
      >
        <img
          src={image}
          alt={title}
          className={cn(
            "object-cover transition-transform duration-500",
            !isImage && "h-16 w-24",
            isImage && "h-60 w-full group-hover:scale-110",
          )}
        />
        {!isImage && <span className="font-medium capitalize">{title}</span>}
      </div>

      <div
        className={cn(
          isImage &&
            "text-text-light absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-black/60 px-3 py-2 backdrop-blur-sm transition-transform group-hover:translate-y-0",
        )}
      >
        {isImage && <span className="font-semibold capitalize">{title}</span>}

        <div
          className={cn(
            !isImage && "flex flex-col gap-1",
            isImage && "flex gap-2",
          )}
        >
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleEdit}
            className={cn(
              "rounded p-2 transition-colors",
              !isImage
                ? "bg-main-btn hover:bg-main-btn-hover text-white"
                : "bg-main-btn hover:bg-main-btn-hover text-white",
            )}
          >
            <FaEdit size={isImage ? 18 : 14} />
          </Button>

          <Button
            type="button"
            onClick={deleteMenuHandler}
            disabled={isLoading}
            className={cn(
              "rounded p-2 transition-colors",
              !isImage
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-600 text-white hover:bg-red-500",
            )}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <MdDeleteForever size={isImage ? 18 : 14} />
            )}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Item;
