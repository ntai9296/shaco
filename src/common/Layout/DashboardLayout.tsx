import React from "react";
import Router from 'next/router';
import * as S from "./DashboardLayout.styled";
import { ThemeProvider } from "styled-components";
import DashboardSidebar from "../Sidebar/DashboardSidebar";
import * as UserAPI from "../../../graphql/User/UserAPI";

export default ({ children }: { children: any }) => {
  const { data: userData, loading } = UserAPI.getCurrentUser();

  if (loading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  return (
    <ThemeProvider
      theme={{ primaryColor: userData?.currentUser?.profile?.brandColor }}
    >
      <S.Layout>
        <DashboardSidebar />
        <S.Content>{children}</S.Content>
      </S.Layout>
    </ThemeProvider>
  );
};
