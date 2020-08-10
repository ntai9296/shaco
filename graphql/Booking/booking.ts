import { gql } from "@apollo/client";
import { BOOKING_COMPLETE_FRAGMENT } from "../BookingComplete/booking_complete";

const BOOKING_FRAGMENT = gql`
  fragment bookingFragment on Booking {
    id
    status
    description
    createdAt
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
    bookingQuestionsConnection {
      nodes {
        id
        question
        answer
      }
    }
    service {
      id
      name
      serviceType
    }
    bookingComplete {
      ...bookingCompleteFragment
    }
  }
  ${BOOKING_COMPLETE_FRAGMENT}
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
  query getCurrentUserBookingsQuery(
    $isHost: Boolean
    $sortBy: String
    $statuses: [BookingStatusEnum!]
  ) {
    currentUser {
      id
      bookingsConnection(isHost: $isHost, sortBy: $sortBy, statuses: $statuses) {
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

export const GET_HOST_BOOKING_ZOOM_START_URL_QUERY = gql`
  query getHostBookingZoomStartUrlQuery($id: ID!) {
    node(id: $id) {
      ... on Booking {
        ...bookingFragment
        providable {
          ... on VideoCall {
            id
            duration
            zoomStartUrl
          }
        }
      }
    }
  }
  ${BOOKING_FRAGMENT}
`;

export const REQUEST_RESCHEDULE_BOOKING_MUTATION = gql`
  mutation requestRescheduleBookingMutation(
    $input: RequestRescheduleBookingInput!
  ) {
    requestRescheduleBooking(input: $input) {
      booking {
        ...bookingFragment
        ...hostBookingFragment
      }
    }
  }
  ${BOOKING_FRAGMENT}
  ${HOST_BOOKING_FRAGMENT}
`;

export const CREATE_BOOKING_COMPLETE_MUTATION = gql`
  mutation createBookingCompleteMutation($input: CreateBookingCompleteInput!) {
    createBookingComplete(input: $input) {
      booking {
        ...bookingFragment
        ...hostBookingFragment
      }
      bookingComplete {
        ...bookingCompleteFragment
      }
    }
  }
  ${BOOKING_FRAGMENT}
  ${HOST_BOOKING_FRAGMENT}
  ${BOOKING_COMPLETE_FRAGMENT}
`;
