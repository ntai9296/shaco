import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Edit } from "react-feather";
import Link from "next/link";
import * as S from "./Service.styled";
import {
  getPublicProfileQuery_profile_servicesConnection_nodes,
  ServiceProvidableTypeEnum,
  ServicePricingTypeEnum,
  ServiceTypeEnum,
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
  }, [services]);

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

export const ServiceItem = ({
  service,
  editMode,
  previewMode,
}: {
  service: getPublicProfileQuery_profile_servicesConnection_nodes;
  editMode?: boolean;
  previewMode?: boolean;
}) => {
  const [showMore, setShowMore] = useState(false);
  const paragraphRef = useRef<any>(null);
  useEffect(() => {
    if (paragraphRef.current && paragraphRef.current.clientHeight > 120) {
      setShowMore(true);
    }
  }, [paragraphRef.current]);

  const onRenderItemCost = () => {
    if (service.pricingType === ServicePricingTypeEnum.FREE) {
      return "Free";
    } else if (service.pricingType === ServicePricingTypeEnum.FLEXIBLE) {
      return "Name your price";
    }

    return `$${service.price / 100}`;
  };

  const providable = service.providable as any;

  return (
    <S.ServiceItem>
      <S.ServiceContent>
        {editMode && (
          <S.EditHeader>
            <Link
              href="/dashboard/services/[serviceId]"
              as={`/dashboard/services/${service.id}`}
            >
              <Edit size={20} />
            </Link>
          </S.EditHeader>
        )}
        <S.ServiceTitle>{service.name}</S.ServiceTitle>
        <S.ServiceItemImage>
          {service.imageUrl && (
            <S.ServiceItemImageContent src={service.imageUrl} />
          )}
        </S.ServiceItemImage>
        <S.ServiceItemPricing>
          <S.ServiceItemCost>{onRenderItemCost()}</S.ServiceItemCost>
          {service.serviceType === ServiceTypeEnum.VIRTUAL_ONE_ON_ONE && (
            <S.ServiceItemDuration>
              Duration: {providable?.duration} minutes
            </S.ServiceItemDuration>
          )}
          <S.ServiceItemAction>
            {previewMode ? (
              <S.ServiceItemButton>
                {service.buttonText || "Select"}
              </S.ServiceItemButton>
            ) : (
              <Link
                href={`/checkout/[serviceId]`}
                as={`/checkout/${service.id}`}
              >
                <S.ServiceItemButton>
                  {service.buttonText || "Select"}
                </S.ServiceItemButton>
              </Link>
            )}
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
