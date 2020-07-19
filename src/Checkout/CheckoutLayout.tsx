import React from "react";
import * as S from "./CheckoutLayout.styled";

export default ({ info, action }: any) => {
  return (
    <S.Layout>
      <S.Main>
        <S.LayoutInfo>{info}</S.LayoutInfo>
        <S.LayoutAction>{action}</S.LayoutAction>
      </S.Main>
    </S.Layout>
  );
};
