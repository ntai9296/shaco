import React, { useEffect } from "react";
import Router from "next/router";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as Utility from "../../src/common/utility";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import Calls from "./Calls";

const Dashboard = () => {
  const { data: userData, loading: userLoading } = UserAPI.getCurrentUser();

  useEffect(() => {
    if (userLoading) {
      Utility.showWorkingOverlay();
    } else {
      Utility.hideWorkingOverlay();
    }
  }, [userLoading]);

  if (userLoading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  return (
    <DashboardLayout>
      <Calls />
    </DashboardLayout>
  );
};

export default Dashboard;
