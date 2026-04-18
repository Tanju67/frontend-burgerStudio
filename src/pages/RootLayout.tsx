import { Outlet } from "react-router-dom";
import Footer from "../shared/UIElements/footer/Footer";
import Modal from "../shared/UIElements/modal/Modal";
import useCart from "../shared/hooks/useCart";
import Cart from "../components/menuDetail/Cart";

function RootLayout() {
  const { cart, setCartModal } = useCart();
  return (
    <div>
      <main className="font-primary flex min-h-screen flex-col scroll-smooth">
        <div className="flex-1 antialiased md:pt-47.5">
          <Outlet />
        </div>
        <Footer />
      </main>
      <Modal
        className="bg-bg text-text-dark h-[70vh] w-[90vw] text-sm md:max-w-150 md:text-base lg:h-110"
        open={cart.cartModal}
        onClose={() => setCartModal(false)}
      >
        <Cart />
      </Modal>
    </div>
  );
}

export default RootLayout;
