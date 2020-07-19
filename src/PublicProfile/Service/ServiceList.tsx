import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "react-feather";
import Link from 'next/link';
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
  >(services);

  useEffect(() => {
    setCapServices(services.slice(0, 6));
  }, []);

  return (
    <>
      <S.ServiceList totalCount={capServices.length}>
        {capServices.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </S.ServiceList>
      {services.length > 6 && capServices.length <= 6 && (
        <S.ShowMoreContent>
          <S.ShowMoreButton invert onClick={() => setCapServices(services)}>
            <div>
              See all {services.length} services <ChevronDown />
            </div>
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
            <Link href={`/checkout/${service.id}`}>
              <S.ServiceItemButton>
                {service.buttonText || "Select"}
              </S.ServiceItemButton>
            </Link>
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
