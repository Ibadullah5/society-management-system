import React from "react";
import UserBillTabs from "./UserBillsTab";
import HelloUser from "./HelloUser";
import AdminBillDashboard from "./AdminBillTab";
import CardRow from "./CardRow";
import GenerateBillDialog from "./GenerateBillDialog";
import { useSelector } from "react-redux";
import NotFound from "@/NotFound";

const Dashboard = () => {
  // if (localStorage.getItem("token") === null) {
  //   window.location.href = "/login";
  // }
  const name = localStorage.getItem("name");

  const role = localStorage.getItem("role");

  if (role === "Resident") {
    return (
      <div className="mt-16 px-8">
        <HelloUser username={name} />
        <UserBillTabs />
      </div>
    );
  } else if (role === "Admin") {
    return (
      <div className="mt-16 px-8">
        <div className="flex justify-between">
          <HelloUser username={name} />
          <GenerateBillDialog />
        </div>
        <CardRow />
        <AdminBillDashboard />
      </div>
    );
  } else {
    return (
      <div className="mt-16 px-8">
        <NotFound />
      </div>
    );
  }
};

export default Dashboard;
