import MainNav from "../../shared/UIElements/Navigation/MainNav";
import Orders from "./Orders";

function OrderHistory() {
  return (
    <main>
      <MainNav title="Order History" />
      <Orders />
    </main>
  );
}

export default OrderHistory;
