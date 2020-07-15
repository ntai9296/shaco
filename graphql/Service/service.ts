import { gql } from "@apollo/client";

export const CREATE_SERVICE_MUTATION = gql`
  mutation createServiceMutation($input: CreateServiceInput!) {
    createService(input: $input) {
      service {
        id
        name
        imageUrl
        introVideoUrl
        description
        price
        introVideoUrl
        buttonText
        providableType
        providable {
          ... on VideoCallService {
            id
            duration
          }
        }
      }
    }
  }
`;

export const UPDATE_SERVICE_MUTATION = gql`
  mutation updateServiceMutation($input: UpdateServiceInput!) {
    updateService(input: $input) {
      service {
        id
        name
        imageUrl
        introVideoUrl
        description
        price
        introVideoUrl
        buttonText
        providableType
        providable {
          ... on VideoCallService {
            id
            duration
          }
        }
      }
    }
  }
`;
