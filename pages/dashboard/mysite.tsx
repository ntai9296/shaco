import React from "react";
import styled from "styled-components";
import Router from "next/router";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import * as UserAPI from "../../graphql/User/UserAPI";

const IFrame = styled.iframe`
  border: none;
  width: 100%;
  min-height: 100vh;
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
    <DashboardLayout noContentPadding>
      <div>
        <IFrame src={`/${userData.currentUser.profile?.slug}`} />
      </div>
    </DashboardLayout>
  );
};
