import { cn } from "../../shared/utils/cn";

function OrderTableSkeleton({ count = 5 }: { count?: number }) {
  const skeletonItems = Array.from({ length: count });

  return (
    <div className="w-full animate-pulse py-4">
      <table className="w-full border-separate border-spacing-y-3">
        {/* Desktop Header Skeleton */}
        <thead className="hidden md:table-header-group">
          <tr className="px-4 py-2">
            {["#", "Customer", "Address", "Status", "Total", "Actions"].map(
              (h) => (
                <th key={h} className="px-4 py-2">
                  <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                </th>
              ),
            )}
          </tr>
        </thead>

        {/* Body - Responsive (Mobile: Flex, Desktop: Table-Row) */}
        <tbody className="flex flex-col gap-4 md:table-row-group">
          {skeletonItems.map((_, i) => (
            <tr
              key={i}
              className={cn(
                "flex flex-col overflow-hidden rounded-4xl border-2 border-transparent bg-gray-100 md:table-row md:rounded-none dark:bg-gray-800/50",
              )}
            >
              {/* Index (#) - Desktop Only */}
              <td className="hidden px-4 py-4 md:table-cell">
                <div className="h-6 w-4 rounded bg-gray-300 dark:bg-gray-700" />
              </td>

              {/* Customer & Date */}
              <td className="px-6 py-4 md:px-4">
                <div className="flex flex-col gap-2">
                  <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </td>

              {/* Address */}
              <td className="px-6 py-1 md:px-4 md:py-4">
                <div className="h-4 w-40 rounded bg-gray-200 italic dark:bg-gray-700" />
              </td>

              {/* Mobile Separator Line */}
              <td className="px-6 py-2 md:hidden">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </td>

              {/* Status Section */}
              <td className="px-6 py-2 md:px-4 md:py-4">
                <div className="flex items-center justify-between gap-3 md:justify-start">
                  <div className="h-3 w-10 rounded bg-gray-200 md:hidden dark:bg-gray-700" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div className="h-8 w-8 rounded-xl bg-gray-300 dark:bg-gray-700" />
                  </div>
                </div>
              </td>

              {/* Total Price */}
              <td className="px-6 py-2 md:px-4 md:py-4">
                <div className="flex items-center justify-between md:justify-start">
                  <div className="h-3 w-16 rounded bg-gray-200 md:hidden dark:bg-gray-700" />
                  <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700" />
                </div>
              </td>

              {/* View Order Button */}
              <td className="px-6 py-4 text-center md:px-4">
                <div className="mx-auto h-10 w-full rounded-xl bg-gray-300 md:mx-0 md:w-32 dark:bg-gray-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTableSkeleton;
