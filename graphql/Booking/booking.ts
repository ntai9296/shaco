import { gql } from "@apollo/client";

const BOOKING_FRAGMENT = gql`
  fragment bookingFragment on Booking {
    id
    status
    updatedAt
  }
`;

const HOST_BOOKING_FRAGMENT = gql`
  fragment hostBookingFragment on Booking {
    price
    bookingDate
    userEmail
    userFullName
    providableType
    providable {
      ... on VideoCall {
        id
        duration
      }
    }
    service {
      id
      name
    }
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

export const CANCEL_BOOKING_MUTATION = gql`
  mutation cancelBookingMutation($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      booking {
        ...bookingFragment
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const RESCHEDULE_BOOKING_MUTATION = gql`
  mutation rescheduleBookingMutation($input: RescheduleBookingInput!) {
    rescheduleBooking(input: $input) {
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
        providableType
        providable {
          ... on VideoCall {
            id
            duration
          }
        }
        hostProfile {
          id
          name
          profilePhotoUrl
          slug
        }
        service {
          id
          name
          imageUrl
          description
        }
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const GET_BOOKING_RESCHEDULE_QUERY = gql`
  query getBookingRescheduleQuery($id: ID!, $atOrAfterStarting: DateTime) {
    node(id: $id) {
      ... on Booking {
        ...bookingFragment
        price
        bookingDate
        userEmail
        providableType
        providable {
          ... on VideoCall {
            id
            duration
          }
        }
        hostProfile {
          id
          name
          profilePhotoUrl
          slug
          availabilities(atOrAfterStarting: $atOrAfterStarting)
        }
        service {
          id
          providable {
            ... on VideoCallService {
              id
              duration
            }
          }
        }
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const GET_CURRENT_USER_BOOKINGS_QUERY = gql`
  query getCurrentUserBookingsQuery($isHost: Boolean) {
    currentUser {
      id
      bookingsConnection(isHost: $isHost) {
        nodes {
          ...bookingFragment
          ...hostBookingFragment
        }
      }
    }
  }
  ${BOOKING_FRAGMENT}
  ${HOST_BOOKING_FRAGMENT}
`;

export const GET_HOST_BOOKING_QUERY = gql`
  query getHostBookingQuery($id: ID!) {
    node(id: $id) {
      ... on Booking {
        ...bookingFragment
        ...hostBookingFragment
      }
    }
  }
  ${BOOKING_FRAGMENT}
  ${HOST_BOOKING_FRAGMENT}
`;