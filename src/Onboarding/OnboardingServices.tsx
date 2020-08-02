import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";
import {
  getCurrentUserOnboarding,
  updateUser,
} from "../../graphql/User/UserAPI";
import { getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes } from "../../graphql/generated";
import { ServiceItem } from "../PublicProfile/Service/ServiceList";
import Button from "../common/Button";

const ListContainer = styled.div`
  width: 100%;
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

const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

export default () => {
  const router = useRouter();
  const { data: userData } = getCurrentUserOnboarding({
    onError: () => {},
    onCompleted: () => {},
  });

  const [onUpdateUser, { loading }] = updateUser({
    onCompleted: () => {
      router.replace("/dashboard/mysite");
    },
  });

  const services = (userData?.currentUser?.profile?.servicesConnection?.nodes ||
    []) as getCurrentUserOnboardingQuery_currentUser_profile_servicesConnection_nodes[];

  return (
    <ListContainer>
      <ServiceList>
        {services.map((service) => (
          <ServiceItem key={service.id} service={service} editMode />
        ))}
      </ServiceList>

      {services.length > 0 && (
        <ButtonContainer>
          <Button
            flex={false}
            isLoading={loading}
            onClick={() =>
              onUpdateUser({
                variables: {
                  input: {
                    onboarded: true,
                  },
                },
              })
            }
          >
            I'm done. Take me to my public profile
          </Button>
        </ButtonContainer>
      )}
    </ListContainer>
  );
};
