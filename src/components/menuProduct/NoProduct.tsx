import { FaPlus } from "react-icons/fa6";
import useDashboard from "../../shared/hooks/useDahboard";
import Button from "../../shared/UIElements/button/Button";

function NoProduct() {
  const { openProductModal } = useDashboard();

  return (
    <div className="animate-in fade-in zoom-in flex min-h-[60vh] items-center justify-center px-4 py-10 duration-500">
      <div className="bg-main/5 border-main/20 w-full max-w-lg rounded-[2.5rem] border-2 border-dashed p-12 text-center">
        <div className="bg-main-light mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-inner">
          👨‍🍳
        </div>

        <div className="space-y-2">
          <h2 className="text-main-btn text-2xl font-black tracking-tighter uppercase italic">
            Kitchen is ready but no products found!
          </h2>
          <p className="text-main-dark/60 text-sm font-bold tracking-normal uppercase">
            Start adding some delicious products to your menu.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => openProductModal(null)}
          className="bg-main-btn hover:bg-main-btn/90 mt-8 inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
        >
          <FaPlus size={18} />
          <span>Add New Product</span>
        </Button>

        <p className="text-main-btn/30 mt-6 text-[10px] font-bold tracking-[0.3em] uppercase italic">
          Database: No Product Found
        </p>
      </div>
    </div>
  );
}

export default NoProduct;
