import { useEffect } from "react";
import useDashboard from "../../shared/hooks/useDahboard";
import DashboardNav from "../../shared/UIElements/dashboardNav/DashboardNav";
import NavItem from "../../shared/UIElements/dashboardNav/NavItem";
import { dashboardOrderNavData } from "../../shared/utils/data";
import Content from "./Content";

function AdminOrder() {
  const { setMenuActiveTab } = useDashboard();
  useEffect(() => {
    setMenuActiveTab(0);
  }, [setMenuActiveTab]);
  return (
    <div>
      <DashboardNav title="Orders" rightSection={true}>
        <NavItem data={dashboardOrderNavData} breakPoint={true} />
      </DashboardNav>

      <Content />
    </div>
  );
}

export default AdminOrder;
