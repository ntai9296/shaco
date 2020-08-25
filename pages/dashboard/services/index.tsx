import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Plus } from "react-feather";
import * as UserAPI from "../../../graphql/User/UserAPI";
import { getCurrentUserProfileServicesQuery_currentUser_profile_servicesConnection_nodes } from "../../../graphql/generated";
import withDashboard from "../../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../../src/common/Layout/DashboardPageContent";
import Button from "../../../src/common/Button";
import ServiceList from "../../../src/Dashboard/Service/ServiceList";

const NewButton = styled(Button)`
  border-radius: 25px;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 5px;
  }
`;

const App = () => {
  return (
    <DashboardPageContent
      title="Services"
      filter={
        <Link href="/dashboard/services/new">
          <div>
            <NewButton>
              <Plus /> Service
            </NewButton>
          </div>
        </Link>
      }
    >
      <ServiceList />
    </DashboardPageContent>
  );
};

export default withDashboard({})(App);
