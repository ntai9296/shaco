import React from "react";
import Router from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { PlusCircle } from "react-feather";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import { mediaBreakpointDown } from "../../../src/common/utility";
import * as UserAPI from "../../../graphql/User/UserAPI";
import { getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes } from "../../../graphql/generated";
import { ServiceItem } from "../../../src/PublicProfile/Service/ServiceList";

const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin-top: 0;
  > a {
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #444;
  }
`;

export const HeadingInfo = styled.p`
  font-weight: 500;
`;

const ServiceList = styled.div`
  display: flex;
  margin: 0 -10px;
  flex-wrap: wrap;

  ${mediaBreakpointDown("lg")} {
    > div {
      flex-basis: 50%;
    }
  }
  ${mediaBreakpointDown("md")} {
    > div {
      flex-basis: 100%;
    }
  }
`;

export default () => {
  const { data, loading } = UserAPI.getCurrentUserProfileServices();

  if (loading) {
    return null;
  }

  if (!data?.currentUser) {
    Router.replace("/login");
    return null;
  }

  const services = (data?.currentUser?.profile?.servicesConnection?.nodes ||
    []) as getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes[];

  return (
    <DashboardLayout>
      <Heading>
        Services
        <Link href="/dashboard/services/new">
          <a>
            <PlusCircle size={30} />
          </a>
        </Link>
      </Heading>
      <HeadingInfo>All the services you are offering.</HeadingInfo>
      <ServiceList>
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} editMode />
        ))}
      </ServiceList>
    </DashboardLayout>
  );
};
