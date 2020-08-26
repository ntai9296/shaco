import React, { useEffect, useState, useRef } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import * as S from "./ServiceCard.styled";
import {
  serviceFragment,
  ServicePricingTypeEnum,
  ServiceTypeEnum,
} from "../../graphql/generated";
import { Share } from "react-feather";
import Link from "next/link";

interface Props {
  service: serviceFragment;
  isPreview?: boolean;
}

export default ({ service, isPreview }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const paragraphRef = useRef<any>(null);
  useEffect(() => {
    if (paragraphRef.current && paragraphRef.current.clientHeight > 120) {
      setShowMore(true);
    }
  }, [paragraphRef.current]);

  const getPricing = () => {
    if (service.pricingType === ServicePricingTypeEnum.FREE) {
      return "Free";
    } else if (service.pricingType === ServicePricingTypeEnum.FLEXIBLE) {
      return "Name your price";
    }
    return `$${(service.price / 100).toLocaleString()}`;
  };
  const providable = service.providable as any;
  const soldOut = service.limitedQuantity && service.quantity <= 0;
  return (
    <S.Card isPreview={isPreview}>
      <S.CardHero>
        <S.Pricing>{getPricing()}</S.Pricing>
        <CopyToClipboard
          text={`https://tryfireside.com/services/${service.id}`}
          onCopy={() => alert("Link copied")}
        >
          <S.Share>
            <Share size={18} />
          </S.Share>
        </CopyToClipboard>

        <S.CardHeroImage src={service.imageUrl} />
      </S.CardHero>
      <S.CardBody>
        <S.CardTitle>{service.name}</S.CardTitle>
        {service.serviceType === ServiceTypeEnum.VIRTUAL_ONE_ON_ONE && (
          <S.SubTitle>
            <span>Duration: {providable?.duration} minutes</span>
          </S.SubTitle>
        )}

        <S.ButtonContainer>
          {service.limitedQuantity && (
            <S.RemainingText>
              Limited: <b>{service.quantity.toLocaleString()}</b> remaining
            </S.RemainingText>
          )}
          <Link href="/checkout/[serviceId]" as={`/checkout/${service.id}`}>
            <S.Button disabled={soldOut}>
              {soldOut ? "Sold Out" : service.buttonText}
            </S.Button>
          </Link>
        </S.ButtonContainer>
        {service.description && (
          <S.DescriptionContainer maxHeight={showMore}>
            <p ref={paragraphRef}>{service.description}</p>
          </S.DescriptionContainer>
        )}
        {showMore && (
          <S.DescriptionShowMore>
            <a onClick={() => setShowMore(false)}>Show more</a>
          </S.DescriptionShowMore>
        )}
      </S.CardBody>
    </S.Card>
  );
};
