import { useNavigate } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";

function NoProducts() {
  const navigate = useNavigate();

  return (
    <div className="bg-main/5 border-main/20 animate-in fade-in slide-in-from-bottom-4 mx-auto mt-4 flex min-h-100 w-full flex-col items-center justify-center rounded-4xl border-2 border-dashed p-6 duration-700">
      {/* Icon with subtle pulse animation */}
      <div className="bg-main/10 mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-lg shadow-black/10">
        <MdOutlineSearchOff className="text-main animate-pulse" />
      </div>

      {/* Content */}
      <div className="space-y-2 text-center">
        <h4 className="text-text-dark text-xl font-extrabold tracking-tight uppercase italic md:text-2xl">
          No items found
        </h4>
        <p className="text-main-dark/50 mx-auto max-w-62.5 text-[10px] leading-relaxed font-bold tracking-[0.2em] uppercase">
          This category is temporarily empty. <br />
          Try exploring other flavors!
        </p>
      </div>

      {/* Navigation Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-main-btn hover:bg-main-btn/90 shadow-main-btn/20 mt-8 flex cursor-pointer items-center gap-2 rounded-xl px-8 py-3 text-xs font-black tracking-widest text-white uppercase shadow-lg transition-all active:scale-95"
      >
        <BiArrowBack className="text-lg" />
        <span>Go Back</span>
      </button>

      {/* Micro-Copy */}
      <span className="text-main-dark/20 mt-6 text-[8px] font-bold tracking-[0.3em] uppercase">
        Product Query: 0 Results
      </span>
    </div>
  );
}

export default NoProducts;
