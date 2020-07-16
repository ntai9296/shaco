import React, { useState, useRef, useEffect } from "react";
import * as S from "./Service.styled";
import {
  getPublicProfileQuery_profile_servicesConnection_nodes,
  ServiceProvidableTypeEnum,
} from "../../../graphql/generated";

interface Props {
  services: getPublicProfileQuery_profile_servicesConnection_nodes[];
}

export default ({ services }: Props) => {
  const [capServices, setCapServices] = useState<
    getPublicProfileQuery_profile_servicesConnection_nodes[]
  >([]);

  useEffect(() => {
    if (capServices.length === 0) {
      setCapServices(services.slice(0, 3));
    }
  }, [capServices]);

  return (
    <>
      <S.ServiceList>
        {capServices.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </S.ServiceList>
      {services.length > 3 && capServices.length <= 3 && (
        <S.ShowMoreContent>
          <S.ShowMoreButton onClick={() => setCapServices(services)}>
            See all
          </S.ShowMoreButton>
        </S.ShowMoreContent>
      )}
    </>
  );
};

const ServiceItem = ({
  service,
}: {
  service: getPublicProfileQuery_profile_servicesConnection_nodes;
}) => {
  const [showMore, setShowMore] = useState(false);
  const paragraphRef = useRef<any>(null);
  useEffect(() => {
    if (paragraphRef.current && paragraphRef.current.clientHeight > 120) {
      setShowMore(true);
    }
  }, [paragraphRef.current]);
  return (
    <S.ServiceItem>
      <S.ServiceContent>
        <S.ServiceTitle>{service.name}</S.ServiceTitle>
        <S.ServiceItemImage>
          {service.imageUrl && (
            <S.ServiceItemImageContent src={service.imageUrl} />
          )}
        </S.ServiceItemImage>
        <S.ServiceItemPricing>
          <S.ServiceItemCost>
            {service.price <= 0 ? "Free" : `$${service.price / 100}`}
          </S.ServiceItemCost>
          {service.providableType ===
            ServiceProvidableTypeEnum.VIDEO_CALL_SERVICE && (
            <S.ServiceItemDuration>
              Duration: {service?.providable.duration} minutes
            </S.ServiceItemDuration>
          )}
          <S.ServiceItemAction>
            <S.ServiceItemButton>
              {service.buttonText || "Go"}
            </S.ServiceItemButton>
          </S.ServiceItemAction>
        </S.ServiceItemPricing>
        {service.description && (
          <S.ServiceItemDescriptionBox maxHeight={showMore}>
            <p ref={paragraphRef}>{service.description}</p>
          </S.ServiceItemDescriptionBox>
        )}
        {showMore && (
          <S.ServiceItemDescriptionShowMore>
            <a onClick={() => setShowMore(false)}>Show more</a>
          </S.ServiceItemDescriptionShowMore>
        )}
      </S.ServiceContent>
    </S.ServiceItem>
  );
};
