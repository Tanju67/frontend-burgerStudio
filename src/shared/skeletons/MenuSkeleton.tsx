function MenuSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="container-box grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="relative h-70 w-full animate-pulse overflow-hidden rounded-2xl bg-gray-200 md:h-80 lg:h-100 dark:bg-neutral-800"
        >
          <div className="h-full w-full bg-gray-300 dark:bg-neutral-700" />

          <div className="absolute bottom-4 left-4 h-8 w-1/3 rounded bg-gray-400 opacity-50 dark:bg-neutral-600" />
        </div>
      ))}
    </div>
  );
}

export default MenuSkeleton;
