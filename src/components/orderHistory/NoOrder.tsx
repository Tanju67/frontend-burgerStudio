import { useNavigate } from "react-router-dom";
import Button from "../../shared/UIElements/button/Button";

function NoOrder() {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center py-20 text-center duration-500">
      <div className="bg-main-light mb-6 flex h-24 w-24 items-center justify-center rounded-full text-6xl shadow-inner">
        🍔
      </div>

      <h2 className="text-text-dark text-2xl font-black tracking-tighter uppercase italic">
        Your Cravings are waiting!
      </h2>
      <p className="text-main-dark/70 mt-2 max-w-62.5 text-sm font-medium">
        It looks like you haven't ordered anything yet. Let's fix that!
      </p>

      <Button
        type="button"
        onClick={() => navigate("/menu")}
        className="bg-main-btn hover:bg-main-btn-hover mt-8 rounded-full px-10 py-3 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
      >
        Go to Menu 🍟
      </Button>
    </div>
  );
}

export default NoOrder;
