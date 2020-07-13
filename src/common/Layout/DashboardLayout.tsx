import React from "react";
import * as S from "./DashboardLayout.styled";
import DashboardSidebar from "../Sidebar/DashboardSidebar";

export default ({ children }: { children: any }) => {
  return (
    <S.Layout>
      <DashboardSidebar />
      <S.Content>{children}</S.Content>
    </S.Layout>
  );
};
