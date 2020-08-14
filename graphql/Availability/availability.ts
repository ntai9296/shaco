import { gql } from "@apollo/client";

export const AVAILABILITY_FRAGMENT = gql`
  fragment availabilityFragment on Availability {
    id
    starting
    ending
    day
  }
`;

export const UPDATE_AVAILABILITY_MUTATION = gql`
  mutation updateAvailabilityMutation($input: UpdateAvailabilityInput!) {
    updateAvailability(input: $input) {
      availability {
        ...availabilityFragment
      }
    }
  }
  ${AVAILABILITY_FRAGMENT}
`;

export const DELETE_AVAILABILITY_MUTATION = gql`
  mutation deleteAvailabilityMutation($input: DeleteAvailabilityInput!) {
    deleteAvailability(input: $input) {
      availability {
        ...availabilityFragment
      }
    }
  }
  ${AVAILABILITY_FRAGMENT}
`;

export const CREATE_AVAILABILITY_MUTATION = gql`
  mutation createAvailabilityMutation($input: CreateAvailabilityInput!) {
    createAvailability(input: $input) {
      availability {
        ...availabilityFragment
      }
    }
  }
  ${AVAILABILITY_FRAGMENT}
`;
