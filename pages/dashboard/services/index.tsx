import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Plus } from "react-feather";
import { mediaBreakpointDown } from "../../../src/common/utility";
import * as UserAPI from "../../../graphql/User/UserAPI";
import { getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes } from "../../../graphql/generated";
import { ServiceItem } from "../../../src/PublicProfile/Service/ServiceList";
import withDashboard from "../../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../../src/common/Layout/DashboardPageContent";
import Button from "../../../src/common/Button";

const NewButton = styled(Button)`
  border-radius: 25px;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 5px;
  }
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

const App = () => {
  const { data, loading } = UserAPI.getCurrentUserProfileServices();

  if (loading) {
    return null;
  }

  const services = (data?.currentUser?.profile?.servicesConnection?.nodes ||
    []) as getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes[];

  return (
    <DashboardPageContent
      title="Services"
      filter={
        <Link href="/dashboard/services/new">
          <NewButton>
            <Plus /> Service
          </NewButton>
        </Link>
      }
    >
      <ServiceList>
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} editMode />
        ))}
      </ServiceList>
    </DashboardPageContent>
  );
};

export default withDashboard({})(App);
