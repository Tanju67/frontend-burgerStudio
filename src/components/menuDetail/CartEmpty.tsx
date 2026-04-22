import Button from "../../shared/UIElements/button/Button";

type CartEmptyProps = {
  setCartModal: (isOpen: boolean) => void;
};

function CartEmpty({ setCartModal }: CartEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-4 animate-bounce text-6xl">🛒</div>
      <h3 className="text-text-dark text-xl font-black uppercase italic">
        Your cart is lonely!
      </h3>
      <p className="text-main-dark mb-6 text-sm">
        Start adding some delicious items to make it happy.
      </p>
      <Button
        type="button"
        onClick={() => setCartModal(false)}
        className="bg-secondary-btn hover:bg-secondary-btn-hover rounded-full px-8 py-3 font-bold text-white shadow-lg transition-all active:scale-95"
      >
        Return to Menu
      </Button>
    </div>
  );
}

export default CartEmpty;
