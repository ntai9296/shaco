import React, { useState, useEffect } from "react";
import { ChevronDown } from "react-feather";
import * as S from "./Service.styled";
import {
  getPublicProfileQuery_profile_servicesConnection_nodes,
} from "../../../graphql/generated";
import ServiceCard from "../../Service/ServiceCard";

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
          <S.ServiceItem>
            <ServiceCard key={service.id} service={service} />
          </S.ServiceItem>
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
