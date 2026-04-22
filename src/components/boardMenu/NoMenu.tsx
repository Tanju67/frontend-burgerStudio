import useCart from "../../shared/hooks/useCart";
import useDashboard from "../../shared/hooks/useDahboard";

function NoMenu() {
  const { openMenuModal } = useDashboard();
  return (
    <div className="bg-main/5 border-main/20 animate-in fade-in zoom-in flex h-[60vh] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed p-8 duration-500">
      <div className="bg-main-light mb-6 flex h-20 w-20 items-center justify-center rounded-3xl text-4xl italic shadow-inner">
        👨‍🍳
      </div>

      <div className="space-y-2 text-center">
        <h3 className="text-text-dark text-xl font-black tracking-tighter uppercase italic">
          The kitchen is empty
        </h3>
        <p className="text-main-dark/60 text-sm font-medium tracking-widest uppercase">
          Time to spice things up!
        </p>
      </div>

      <button
        onClick={() => openMenuModal(null)}
        className="bg-main-btn hover:bg-main-btn-hover mt-8 flex items-center gap-2 rounded-2xl px-8 py-3 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
      >
        <span>+ Add First Menu Item</span>
      </button>

      {/* Arka plan süslemesi (isteğe bağlı) */}
      <p className="text-main-btn/30 mt-6 text-[10px] font-bold tracking-[0.3em] uppercase italic">
        No recipes found in the database
      </p>
    </div>
  );
}

export default NoMenu;
