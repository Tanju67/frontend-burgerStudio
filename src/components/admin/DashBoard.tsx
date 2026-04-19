import Board from "./Board";
import SideBar from "./SideBar";

function DashBoard() {
  return (
    <div className="min-h-[50vh] gap-y-2 py-4 md:mt-12.5 md:grid md:min-h-screen md:grid-cols-6 md:gap-4 lg:grid-cols-5">
      <SideBar />
      <Board />
    </div>
  );
}

export default DashBoard;
