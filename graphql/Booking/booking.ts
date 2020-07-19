import { gql } from "@apollo/client";

const BOOKING_FRAGMENT = gql`
  fragment bookingFragment on Booking {
    id
  }
`;

export const CREATE_BOOKING_MUTATION = gql`
  mutation createBookingMutation($input: CreateBookingInput!) {
    createBooking(input: $input) {
      booking {
        ...bookingFragment
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const GET_BOOKING_CONFIRMATION_QUERY = gql`
  query getBookingConfirmationQuery($id: ID!) {
    node(id: $id) {
      ... on Booking {
        ...bookingFragment
        price
        bookingDate
        userEmail
        hostProfile {
          id
          name
          profilePhotoUrl
          slug
        }
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;
