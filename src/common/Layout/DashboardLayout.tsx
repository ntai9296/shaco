import React from "react";
import Router from "next/router";
import * as S from "./DashboardLayout.styled";
import { ThemeProvider } from "styled-components";
import DashboardSidebar from "../Sidebar/DashboardSidebar";
import { getDefaultStyling } from "../utility";
import * as UserAPI from "../../../graphql/User/UserAPI";

export default ({
  children,
  hideSidebar,
  redirectOnboard = true,
  noContentPadding,
  skipUser,
}: {
  children: any;
  hideSidebar?: boolean;
  redirectOnboard?: boolean;
  noContentPadding?: boolean;
  skipUser?: boolean;
}) => {
  const { data: userData, loading } = UserAPI.getCurrentUser({
    skip: skipUser,
  });

  if (!skipUser) {
    if (loading) {
      return null;
    }

    if (!userData?.currentUser) {
      Router.replace("/login");
      return null;
    }

    if (redirectOnboard && !userData.currentUser.onboarded) {
      Router.replace("/onboarding");
      return null;
    }
  }

  return (
    <ThemeProvider
      theme={{
        ...getDefaultStyling({
          primaryColor: userData?.currentUser?.profile?.brandColor,
        }),
      }}
    >
      <S.Layout>
        {!hideSidebar && <DashboardSidebar />}
        <S.Content
          noContentPadding={noContentPadding}
          hideSidebar={hideSidebar}
        >
          {children}
        </S.Content>
      </S.Layout>
    </ThemeProvider>
  );
};
