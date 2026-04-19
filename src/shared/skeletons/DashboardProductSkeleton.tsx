import { cn } from "../../shared/utils/cn";
import useDashboard from "../../shared/hooks/useDahboard";

interface ProductSkeletonProps {
  count?: number;
}

function DashboardProductSkeleton({ count = 6 }: ProductSkeletonProps) {
  const {
    dashboard: { menuActiveTab },
  } = useDashboard();

  const isGrid = menuActiveTab === 0;
  const isList = menuActiveTab === 1;
  const isImage = menuActiveTab === 2;

  // Görünüm moduna göre liste kapsayıcı sınıfları
  const containerClasses = cn(
    "py-4 animate-pulse",
    isGrid && "grid grid-cols-1 gap-2 min-[465px]:grid-cols-2 xl:grid-cols-3",
    isList && "flex flex-col gap-2",
    isImage && "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  );

  return (
    <ul className={containerClasses}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "bg-gray-200 dark:bg-gray-700",
            !isImage &&
              "flex w-full items-center justify-between gap-4 border border-gray-300 p-1",
            isImage && "relative h-[400px] rounded-md shadow-md",
          )}
        >
          {/* Görsel Alanı Skeleton */}
          <div
            className={cn(
              "bg-gray-300 dark:bg-gray-600",
              isGrid && "h-16 w-60 min-[465px]:h-24 min-[465px]:w-24",
              isList && "h-16 w-24",
              isImage && "h-full w-full rounded-md",
            )}
          />

          {/* Metin Alanları (List ve Grid Modu) */}
          {!isImage && (
            <>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="hidden h-3 w-1/2 rounded bg-gray-300 lg:block dark:bg-gray-600"></div>
              </div>

              {/* Fiyat Alanı */}
              <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>

              {/* Butonlar */}
              <div className="flex flex-col gap-1">
                <div className="h-8 w-10 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-8 w-10 rounded bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </>
          )}

          {/* Metin Alanları (Image Modu - Overlay) */}
          {isImage && (
            <div className="absolute bottom-0 flex w-full items-center justify-between bg-black/20 p-3 backdrop-blur-sm">
              <div className="w-1/2 space-y-2">
                <div className="h-4 rounded bg-gray-400"></div>
                <div className="h-3 w-1/2 rounded bg-gray-400"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-400"></div>
                <div className="h-8 w-8 rounded-full bg-gray-400"></div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DashboardProductSkeleton;
