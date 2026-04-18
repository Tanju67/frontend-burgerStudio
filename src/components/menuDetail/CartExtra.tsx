import CartExtraList from "./CartExtraList";

function CartExtra() {
  return (
    <div>
      <h2>Extra</h2>
      <p className="mb-2 text-sm md:text-base">Do you want anything extra?</p>
      <CartExtraList />
    </div>
  );
}

export default CartExtra;
