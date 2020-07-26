import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Head from "next/head";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import * as UserAPI from "../../graphql/User/UserAPI";
import Profile from "../../src/Dashboard/Profile/Profile";

const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin-top: 0;
`;

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
    <DashboardLayout>
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <Heading>Edit Profile</Heading>
      <div>
        <Profile />
      </div>
    </DashboardLayout>
  );
};
