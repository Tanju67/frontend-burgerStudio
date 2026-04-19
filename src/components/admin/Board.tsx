import { Outlet } from "react-router-dom";

function Board() {
  return (
    <div className="bg-bg text-text-light col-span-4 min-h-[50vh] overflow-scroll rounded-lg p-4 shadow-md md:max-h-screen">
      <Outlet />
    </div>
  );
}

export default Board;
