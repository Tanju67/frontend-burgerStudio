import AdminNav from "./AdminNav";
import DashBoard from "./DashBoard";

function Admin() {
  return (
    <main className="bg-main-light mt-0 p-2 md:-mt-47.5">
      <AdminNav />
      <DashBoard />
    </main>
  );
}

export default Admin;
