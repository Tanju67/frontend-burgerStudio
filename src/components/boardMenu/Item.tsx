import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useDashboard from "../../shared/hooks/useDahboard";
import type { Menu } from "../../shared/schemas/menuSchemas";
import { useGetCurrentUserQuery } from "../../shared/services/authApi";
import { useDeleteMenuMutation } from "../../shared/services/menuApi";
import Button from "../../shared/UIElements/button/Button";
import { cn } from "../../shared/utils/cn";
import { toaster } from "../../shared/utils/toaster";

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
    if (isTestAdmin)
      return toaster("warning", "Test admin cannot delete items.");

    try {
      deleteMenu(_id).unwrap();
      toaster("success", "Menu deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => openMenuModal(props);

  return (
    <li
      className={cn(
        "group transition-all duration-500 ease-out",
        // List ve Grid Görünümü
        !isImage &&
          "bg-main-light hover:ring-main/10 flex w-full items-center justify-between rounded-2xl p-3 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:ring-4",
        // Image (Kart) Görünümü
        isImage &&
          "bg-main border-main-light relative aspect-square overflow-hidden rounded-3xl border-4 shadow-lg",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          isGrid &&
            "flex-row sm:flex-col sm:items-start md:flex-row md:items-center",
          isImage && "h-full w-full",
        )}
      >
        <img
          src={image}
          alt={title}
          className={cn(
            "pointer-events-none object-cover transition-transform duration-1000 ease-in-out",
            !isImage && "h-20 w-20 shrink-0 rounded-xl shadow-inner",
            isImage &&
              "h-full w-full group-hover:scale-110 group-hover:rotate-1",
          )}
        />
        {!isImage && (
          <span className="text-main-btn text-lg leading-tight font-black tracking-tighter uppercase italic">
            {title}
          </span>
        )}
      </div>

      {/* Action Overlay / Container */}
      <div
        className={cn(
          isImage && [
            "absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500",
            "from-main-btn/90 via-main-btn/20 bg-linear-to-t to-transparent",
            "lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
          ],
          !isImage && "flex items-center gap-2 px-2",
        )}
      >
        {isImage && (
          <span className="mb-2 font-black tracking-tighter text-white uppercase italic drop-shadow-lg sm:mb-4 sm:text-xl">
            {title}
          </span>
        )}

        <div className={cn("flex gap-8 sm:gap-3", !isImage && "flex-col")}>
          {/* Edit Button */}
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleEdit}
            className="bg-main-btn hover:bg-main-btn/90 flex-1 rounded-xl p-1 text-white shadow-lg transition-all hover:scale-110 active:scale-95 sm:p-3 lg:flex-none"
          >
            <div className="flex items-center justify-center gap-2">
              <FaEdit size={18} />
              <span
                className={cn(
                  "text-xs font-bold tracking-wider uppercase lg:hidden",
                  isImage && "max-[525px]:hidden",
                )}
              >
                Edit
              </span>
            </div>
          </Button>

          {/* Delete Button */}
          <Button
            type="button"
            onClick={deleteMenuHandler}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-500/80 p-1 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-red-600 active:scale-95 sm:p-3 lg:flex-none"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <>
                  <MdDeleteForever size={20} />
                  <span
                    className={cn(
                      "text-xs font-bold tracking-wider uppercase lg:hidden",
                      isImage && "max-[525px]:hidden",
                    )}
                  >
                    Delete
                  </span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default Item;
