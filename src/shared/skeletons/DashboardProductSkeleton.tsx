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

  const containerClasses = cn(
    "py-6 animate-pulse px-2",
    isGrid && "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
    isList && "flex flex-col gap-3",
    isImage && "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  );

  return (
    <ul className={containerClasses}>
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className={cn(
            "overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-800",
            isList && "flex items-center justify-between gap-4 p-2",
            isGrid && "flex flex-col gap-3 p-4",
            isImage && "flex flex-col shadow-md",
          )}
        >
          {/* HEADER SECTION (Photo + Title Info) */}
          <div
            className={cn(
              "flex items-center gap-3",
              isGrid &&
                "w-full justify-between border-b-2 border-gray-200 pb-3 dark:border-gray-700",
              isImage && "h-48 w-full sm:h-60 lg:h-72",
              isList && "",
            )}
          >
            {/* Product Image Skeleton */}
            <div
              className={cn(
                "shrink-0 bg-gray-300 dark:bg-gray-700",
                !isImage && "h-16 w-16 rounded-2xl",
                isImage && "h-full w-full",
              )}
            />

            {/* Grid & List Mode Title Skeleton */}
            {(isGrid || isList) && (
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                {isGrid && (
                  <div className="h-3 w-1/4 rounded bg-gray-300 dark:bg-gray-700"></div>
                )}
              </div>
            )}

            {/* Grid Mode Actions Skeleton (Header Right) */}
            {isGrid && (
              <div className="flex gap-1">
                <div className="h-8 w-8 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-8 w-8 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
              </div>
            )}
          </div>

          {/* CONTENT SECTION (Description & Image Mode Info) */}
          <div
            className={cn(
              "flex-1",
              isList && "hidden sm:block sm:w-1/3",
              isImage && "flex flex-col gap-3 p-4",
            )}
          >
            {isImage && (
              <div className="flex items-center justify-between">
                <div className="h-5 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            )}

            {/* Description Lines */}
            <div className="space-y-1">
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>

          {/* FOOTER ACTIONS (List & Image Mode) */}
          {isList && (
            <div className="flex items-center gap-3">
              <div className="h-6 w-16 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-1">
                <div className="h-8 w-10 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-8 w-10 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          )}

          {isImage && (
            <div className="flex gap-2 border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="h-10 flex-1 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 flex-1 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DashboardProductSkeleton;
