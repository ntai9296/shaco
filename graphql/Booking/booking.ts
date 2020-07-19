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
