import React from "react";
import Router from "next/router";
import { ArrowLeft } from "react-feather";
import * as S from "./CheckoutSummary.styled";
import { ServicePricingTypeEnum } from "../../graphql/generated";

interface Props {
  title: string;
  price: number;
  currency: string;
  description: string;
  img?: string | null;
  children?: any;
  pricingType: ServicePricingTypeEnum;
}

export default ({
  title,
  price,
  description,
  img,
  currency,
  children,
  pricingType,
}: Props) => {
  const getPricingText = () => {
    switch (pricingType) {
      case ServicePricingTypeEnum.SIMPLE:
        return (
          <>
            {currency}
            {price / 100}
          </>
        );
      case ServicePricingTypeEnum.FREE:
        return "Free";
      case ServicePricingTypeEnum.FLEXIBLE:
        return "Name your price";
    }
  };
  return (
    <S.ProductSummaryContainer>
      <S.BackButtonContainer>
        <a onClick={() => Router.back()}>
          <S.BackButton>
            <ArrowLeft size={16} />
            Back
          </S.BackButton>
        </a>
      </S.BackButtonContainer>
      <S.ProductSummaryInfoContainer>
        <S.Title>{title}</S.Title>
        <S.Price>{getPricingText()}</S.Price>
        <S.Description>{description}</S.Description>
        {children && <S.MoreData>{children}</S.MoreData>}
      </S.ProductSummaryInfoContainer>

      {img && (
        <S.ProductImageContainer>
          <img src={img} />
        </S.ProductImageContainer>
      )}
    </S.ProductSummaryContainer>
  );
};
