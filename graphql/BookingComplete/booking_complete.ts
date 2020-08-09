import { gql } from "@apollo/client";

export const BOOKING_COMPLETE_FRAGMENT = gql`
  fragment bookingCompleteFragment on BookingComplete {
    id
    message
    attachments
  }
`;

export const GET_BOOKING_COMPLETE_QUERY = gql`
  query getBookingCompleteQuery($id: ID!) {
    node(id: $id) {
      ... on BookingComplete {
        ...bookingCompleteFragment
        booking {
          id
          service {
            id
            name
            imageUrl
          }
          hostProfile {
            id
            name
            profilePhotoUrl
          }
        }
      }
    }
  }
  ${BOOKING_COMPLETE_FRAGMENT}
`;
