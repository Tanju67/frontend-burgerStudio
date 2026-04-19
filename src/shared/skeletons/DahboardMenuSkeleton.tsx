import { useSelector } from "react-redux";
import { cn } from "../../shared/utils/cn";
import type { RootState } from "../../shared/store";

function DashboardMenuSkeleton({
  layout,
  lenght,
}: {
  layout?: string;
  lenght?: number;
}) {
  const { menuActiveTab } = useSelector((state: RootState) => state.dashboard);

  const isGrid = layout ? layout === "grid" : menuActiveTab === 0;
  const isList = layout ? layout === "list" : menuActiveTab === 1;
  const isImage = layout ? layout === "image" : menuActiveTab === 2;

  const skeletonItems = Array.from({ length: lenght || 6 });

  return (
    <div
      className={cn(
        "animate-pulse py-4",
        isGrid && "grid grid-cols-2 gap-2 lg:grid-cols-3",
        isList && "flex flex-col gap-2",
        isImage && "grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-gray-200 dark:bg-gray-700",
            !isImage &&
              "flex h-20 w-full items-center justify-between border border-gray-300 p-1",
            isImage && "relative h-60 w-full rounded-sm",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2",
              isGrid && "w-full flex-col md:w-auto md:flex-row",
            )}
          >
            {/* Resim Skeleton */}
            <div
              className={cn(
                "bg-gray-300 dark:bg-gray-600",
                !isImage && "h-16 w-24",
                isImage && "h-full w-full",
              )}
            />

            {!isImage && (
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
            )}
          </div>

          <div
            className={cn(
              isImage &&
                "absolute bottom-2 left-0 flex w-full items-center justify-between px-2",
              !isImage && "flex flex-col gap-1",
            )}
          >
            {/* Image modunda başlık skeleton */}
            {isImage && <div className="h-4 w-24 rounded bg-gray-400" />}

            <div className="flex gap-2">
              <div className="h-8 w-8 rounded bg-gray-400 shadow-sm" />
              <div className="h-8 w-8 rounded bg-gray-400 shadow-sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardMenuSkeleton;
