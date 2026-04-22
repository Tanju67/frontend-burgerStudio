import Board from "./Board";
import SideBar from "./SideBar";

function DashBoard() {
  return (
    <div className="grid min-h-[50vh] grid-cols-1 gap-y-2 py-4 md:min-h-screen md:grid-cols-6 md:gap-4 lg:grid-cols-5">
      <SideBar />
      <Board />
    </div>
  );
}

export default DashBoard;
