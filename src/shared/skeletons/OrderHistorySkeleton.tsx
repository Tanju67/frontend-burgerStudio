function OrderHistorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="container-box grid grid-cols-1 items-start gap-8 pt-4 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-bg border-main/10 animate-pulse overflow-hidden rounded-4xl border p-6 shadow-sm"
        >
          {/* Üst Kısım: İkon ve Başlık */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-main-light h-12 w-12 rounded-2xl" />
              <div className="space-y-2">
                <div className="bg-main-light h-3 w-16 rounded-md" />
                <div className="bg-main-light h-5 w-32 rounded-md" />
              </div>
            </div>
            <div className="bg-main-light h-6 w-20 rounded-full" />
          </div>

          {/* Orta Kısım: Çizgi ve Bilgiler */}
          <div className="border-main/20 mt-6 flex items-end justify-between border-t border-dashed pt-4">
            <div className="space-y-2">
              <div className="bg-main-light h-3 w-10 rounded-md" />
              <div className="bg-main-light h-6 w-20 rounded-md" />
            </div>
            <div className="space-y-2">
              <div className="bg-main-light h-3 w-14 rounded-md" />
              <div className="bg-main-light h-8 w-24 rounded-md" />
            </div>
          </div>

          {/* Alt Kısım: Detay Butonu */}
          <div className="bg-main-light/50 mt-4 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export default OrderHistorySkeleton;
