import { useNavigate } from "react-router-dom";
import useDashboard from "../../shared/hooks/useDahboard";

function NoMenu({ isLink }: { isLink?: boolean }) {
  const { openMenuModal } = useDashboard();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLink) {
      openMenuModal(null);
    } else {
      navigate("/dashboard/menus");
    }
  };
  return (
    <div className="bg-main/5 border-main/20 animate-in fade-in zoom-in mx-auto flex min-h-125 w-full max-w-2xl flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed p-8 duration-500 md:p-12">
      {/* İkon Bölümü */}
      <div className="bg-main-light mb-6 flex h-24 w-24 items-center justify-center rounded-4xl text-5xl shadow-inner shadow-black/5">
        <span className="drop-shadow-sm">👨‍🍳</span>
      </div>

      {/* Metin İçeriği */}
      <div className="space-y-3 text-center">
        <h3 className="text-text-dark text-2xl font-black tracking-tighter uppercase italic md:text-3xl">
          The kitchen is empty
        </h3>
        <p className="text-main-dark/60 mx-auto max-w-75 text-xs leading-relaxed font-bold tracking-[0.15em] uppercase md:text-sm">
          It's a bit quiet here. <br /> Time to spice things up!
        </p>
      </div>

      {/* Aksiyon Butonu */}
      <button
        onClick={handleClick}
        className="bg-main-btn hover:bg-main-btn/90 shadow-main-btn/20 mt-10 flex cursor-pointer items-center gap-3 rounded-2xl px-10 py-4 text-sm font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
      >
        <span className="text-xl leading-none">+</span>
        <span>{isLink ? "Go To Menus" : "Add First Menu Item"}</span>
      </button>

      {/* Alt Bilgi Süslemesi */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="bg-main-btn/20 h-1 w-12 rounded-full" />
        <p className="text-main-btn/30 text-[10px] font-bold tracking-[0.4em] uppercase italic">
          Database: No Menu Found
        </p>
      </div>
    </div>
  );
}

export default NoMenu;
