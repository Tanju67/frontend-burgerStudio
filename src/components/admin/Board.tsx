import { Outlet } from "react-router-dom";

function Board() {
  return (
    <div className="bg-bg text-text-dark border-main/10 col-span-4 mt-15 min-h-[60vh] overflow-hidden rounded-2xl border shadow-xl transition-colors duration-300 sm:mt-0 md:min-h-full">
      <div className="bg-main/20 border-main/10 flex items-center justify-between border-b px-6 py-3">
        <span className="text-main-btn text-[10px] font-black tracking-[0.2em] uppercase italic">
          Studio Management Console
        </span>
        <div className="flex gap-1">
          <div className="bg-main-btn/40 h-2 w-2 rounded-full" />
          <div className="bg-main/40 h-2 w-2 rounded-full" />
        </div>
      </div>

      <div className="p-2 lg:p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Board;
