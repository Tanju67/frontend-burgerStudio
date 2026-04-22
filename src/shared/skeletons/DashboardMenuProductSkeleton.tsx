function DashboardMenuProductSkeleton({ length = 8 }: { length?: number }) {
  const skeletonItems = Array.from({ length });

  return (
    <div className="grid animate-pulse grid-cols-1 gap-2 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skeletonItems.map((_, index) => (
        <div key={index} className="list-none px-1">
          {/* Ana Kart Gövdesi - Item.tsx'deki border-4 ve rounded-4xl yapısı */}
          <div className="relative overflow-hidden rounded-4xl border-4 border-gray-100 bg-gray-200 shadow-md dark:border-gray-800 dark:bg-gray-800">
            {/* Resim Alanı - h-64 yapısı */}
            <div className="h-64 w-full bg-gray-300 sm:h-56 dark:bg-gray-700" />

            {/* Alt Overlay Alanı */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-gray-400/50 to-transparent p-4 pt-10 dark:from-black/40">
              <div className="flex flex-col items-center gap-2">
                {/* Başlık (Title) Skeleton */}
                <div className="h-5 w-3/4 rounded-md bg-gray-100/80 dark:bg-gray-600" />

                {/* Alt Yazı (Manage Products) Skeleton */}
                <div className="h-3 w-1/2 rounded-md bg-gray-100/50 dark:bg-gray-600/30" />
              </div>
            </div>

            {/* Sağ Üstteki "Select" Etiketi Skeleton */}
            <div className="absolute top-3 right-3 h-6 w-12 rounded-lg bg-gray-100/80 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardMenuProductSkeleton;
