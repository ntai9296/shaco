import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Head from "next/head";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import * as UserAPI from "../../graphql/User/UserAPI";
import Profile from "../../src/Dashboard/Profile/Profile";

export default () => {
  const { data: userData, loading } = UserAPI.getCurrentUser();

  if (loading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }
  return (
    <DashboardLayout noContentPadding>
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <div>
        <Profile />
      </div>
    </DashboardLayout>
  );
};
