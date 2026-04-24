interface MenuDetailSkeletonProps {
  count?: number;
}

function MenuDetailSkeleton({ count = 6 }: MenuDetailSkeletonProps) {
  // İçerideki tekil kart yapısı (Sub-component)
  const SkeletonCard = () => (
    <div className="bg-bg flex animate-pulse flex-col self-start overflow-hidden rounded-lg border border-gray-100 shadow-md dark:border-gray-800">
      {/* Resim Alanı Skeleton - Senin img sınıflarınla birebir aynı */}
      <div className="h-50 w-full bg-gray-300 min-[411px]:h-70 min-[521px]:h-90 lg:h-70 dark:bg-gray-700" />

      <div className="space-y-4 p-4">
        {/* Başlık (Title) */}
        <div className="mx-auto h-6 w-3/4 rounded-md bg-gray-300 dark:bg-gray-700" />

        {/* Açıklama (Description) - 2 satır */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* Fiyat ve Buton Alanı */}
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="h-6 w-12 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-9 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>

      {/* Product Info Alt Kısmı */}
      <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-box grid gap-4 py-4 sm:grid-cols-2 md:min-h-[50vh] lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default MenuDetailSkeleton;
