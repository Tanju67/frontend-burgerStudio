import { useNavigate } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";

interface NoMenuProps {
  customMessage?: string;
}

const NoMenu: React.FC<NoMenuProps> = ({ customMessage }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="bg-main/5 border-main/20 animate-in fade-in zoom-in mx-auto mt-4 flex min-h-125 w-full max-w-2xl flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed p-8 duration-500 md:p-12">
      {/* Visual Section - Glow effect for Dark Mode */}
      <div className="bg-main-light/10 ring-main/20 mb-6 flex h-28 w-28 items-center justify-center rounded-[2.5rem] text-5xl shadow-xl ring-1 shadow-black/20">
        <IoFastFoodOutline className="text-main drop-shadow-[0_0_15px_rgba(var(--main-rgb),0.5)]" />
      </div>

      {/* Content Section */}
      <div className="space-y-3 text-center">
        <h3 className="text-text-dark text-3xl font-black tracking-tighter uppercase italic md:text-4xl">
          Kitchen is Resting
        </h3>
        <p className="text-main-dark/60 mx-auto max-w-75 text-xs leading-relaxed font-bold tracking-[0.15em] uppercase md:text-sm">
          {customMessage ||
            "We are currently updating our delicious recipes. Check back very soon!"}
        </p>
      </div>

      {/* Primary Action */}
      <button
        onClick={handleNavigate}
        className="bg-main-btn hover:bg-main-btn/90 shadow-main-btn/30 mt-10 flex cursor-pointer items-center gap-3 rounded-2xl px-12 py-4 text-sm font-black tracking-widest text-white uppercase shadow-2xl transition-all active:scale-95"
      >
        <BiHomeAlt className="text-xl" />
        <span>Return to Home</span>
      </button>

      {/* Decorative Footer */}
      <div className="mt-10 flex flex-col items-center gap-3 opacity-40">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-main-btn h-1.5 w-1.5 rounded-full" />
          ))}
        </div>
        <p className="text-main-btn text-[9px] font-bold tracking-[0.5em] uppercase">
          Menu Status: Syncing
        </p>
      </div>
    </div>
  );
};

export default NoMenu;
