import { gql } from "@apollo/client";

const SERVICE_FRAGMENT = gql`
  fragment serviceFragment on Service {
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
`;

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

export const DELETE_SERVICE_MUTATION = gql`
  mutation deleteServiceMutation($input: DeleteServiceInput!) {
    deleteService(input: $input) {
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

export const GET_SERVICE_QUERY = gql`
  query getServiceQuery($id: ID!) {
    node(id: $id) {
      ... on Service {
        ...serviceFragment
        serviceQuestionsConnection {
          nodes {
            id
            question
          }
        }
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const GET_SERVICE_AVAILABILITY_QUERY = gql`
  query getServiceAvailabilityQuery($id: ID!, $atOrAfterStarting: DateTime) {
    node(id: $id) {
      ... on Service {
        id
        profile {
          id
          availabilities(atOrAfterStarting: $atOrAfterStarting)
        }
      }
    }
  }
`;
