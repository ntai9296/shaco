import { gql } from "@apollo/client";
import { SERVICE_QUESTION_FRAGMENT } from '../ServiceQuestion/service_question';

export const SERVICE_FRAGMENT = gql`
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
    serviceType
    pricingType
    providable {
      ... on VideoCallService {
        id
        duration
      }
      ... on GeneralService {
        id
      }
    }
  }
`;

export const CREATE_SERVICE_MUTATION = gql`
  mutation createServiceMutation($input: CreateServiceInput!) {
    createService(input: $input) {
      service {
        ...serviceFragment
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const UPDATE_SERVICE_MUTATION = gql`
  mutation updateServiceMutation($input: UpdateServiceInput!) {
    updateService(input: $input) {
      service {
        ...serviceFragment
      }
    }
  }
  ${SERVICE_FRAGMENT}
`;

export const DELETE_SERVICE_MUTATION = gql`
  mutation deleteServiceMutation($input: DeleteServiceInput!) {
    deleteService(input: $input) {
      service {
        id
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
            ...serviceQuestionFragment
          }
        }
      }
    }
  }
  ${SERVICE_FRAGMENT}
  ${SERVICE_QUESTION_FRAGMENT}
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
