function Footer() {
  return (
    <footer className="border-t-main-btn text-text-dark border-t-4">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="bg-red w-40">
            <h2 className="text-main-btn mb-4 uppercase">contact</h2>
            <p className="text-sm">
              42 Baker Street, London, NW1 6XE, United Kingdom
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-main-btn mb-4 uppercase">Burger Studio</h2>
            <p className="text-sm">
              Our delivery service brings the finest American cuisine straight
              to your door across London and nearby areas. We serve freshly
              prepared burgers and signature menus made with top-quality
              ingredients. We deliver to London, Croydon, Kingston, Richmond,
              Wimbledon, and Ealing, ensuring every meal is packed with flavor
              and satisfaction. Choose Burger Studio for your next meal and
              enjoy freshly made American favorites, crafted with care and
              delivered fast, wherever you are in London and the surrounding
              neighborhoods.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-main-btn mb-4 uppercase">Quality</h2>
            <p className="text-sm">
              Quality is our top priority! We don’t cut corners. From London to
              Croydon, Kingston, Richmond, Wimbledon, and Ealing, we deliver the
              tastiest burgers and complete burger menus. Every dish, made with
              freshly selected ingredients and authentic American flavors, is
              prepared quickly and arrives hot, offering a true delight for
              lovers of international cuisine. Fast, delicious, and crafted with
              care — that’s our promise. Enjoy the best quality meals
              conveniently online and savor them offline at your own pace.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-main-btn p-4">
        <p className="text-center text-sm text-white">
          &copy; 2026 Burger Studio. All rights reserved. This project was
          created for educational purposes only.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
