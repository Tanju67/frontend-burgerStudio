import { useSelector } from "react-redux";
import { cn } from "../../shared/utils/cn";
import type { RootState } from "../../shared/store";

function DashboardMenuSkeleton({
  layout,
  length,
}: {
  layout?: string;
  length?: number;
}) {
  const { menuActiveTab } = useSelector((state: RootState) => state.dashboard);

  // Tab mantığını ana component ile eşitledik
  const isGrid = layout ? layout === "grid" : menuActiveTab === 0;
  const isImage = layout ? layout === "image" : menuActiveTab === 2;

  const skeletonItems = Array.from({ length: length || 6 });

  return (
    <div
      className={cn(
        "animate-pulse px-2 py-4",
        isGrid &&
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3",
        !isGrid && !isImage && "flex flex-col gap-3", // List modu
        isImage && "grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4",
      )}
    >
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-gray-200 transition-all duration-500 dark:bg-gray-800",
            // List ve Grid Görünümü Skeleton (Item.tsx ile aynı padding ve yuvarlaklık)
            !isImage &&
              "flex w-full items-center justify-between rounded-2xl border border-gray-100 p-3 shadow-sm dark:border-gray-700",
            // Image Görünümü Skeleton (Item.tsx aspect-square)
            isImage &&
              "relative aspect-square overflow-hidden rounded-3xl border-4 border-gray-100 shadow-lg dark:border-gray-700",
          )}
        >
          {/* İçerik Alanı */}
          <div
            className={cn(
              "flex items-center gap-4",
              isGrid &&
                "flex-row sm:flex-col sm:items-start md:flex-row md:items-center",
              isImage && "h-full w-full",
            )}
          >
            {/* Resim Alanı Skeleton */}
            <div
              className={cn(
                "shrink-0 bg-gray-300 dark:bg-gray-700",
                !isImage && "h-20 w-20 rounded-xl",
                isImage && "h-full w-full",
              )}
            />

            {/* Başlık Alanı (Sadece Resim Modu Değilse) */}
            {!isImage && (
              <div className="h-5 w-32 rounded-lg bg-gray-300 dark:bg-gray-700" />
            )}
          </div>

          {/* Aksiyon Butonları Alanı */}
          <div
            className={cn(
              isImage && "absolute inset-0 flex flex-col justify-end p-6",
              !isImage && "flex flex-col items-center gap-2 px-2",
            )}
          >
            {/* Image modunda alt başlık skeleton */}
            {isImage && (
              <div className="mb-4 h-6 w-3/4 rounded-lg bg-gray-400/50 dark:bg-gray-600/50" />
            )}

            <div className={cn("flex gap-2", isImage ? "w-full" : "flex-col")}>
              {/* Buton Skeletonları */}
              <div
                className={cn(
                  "rounded-xl bg-gray-300 dark:bg-gray-600",
                  isImage ? "h-10 flex-1" : "h-9 w-9",
                )}
              />
              <div
                className={cn(
                  "rounded-xl bg-gray-300 dark:bg-gray-600",
                  isImage ? "h-10 flex-1" : "h-9 w-9",
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardMenuSkeleton;
