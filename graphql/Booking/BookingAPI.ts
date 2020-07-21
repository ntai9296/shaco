import {
  useMutation,
  MutationHookOptions,
  useQuery,
  QueryHookOptions,
} from "@apollo/client";
import * as Booking from "./booking";
import {
  createBookingMutation,
  createBookingMutationVariables,
  getBookingConfirmationQuery,
  getBookingConfirmationQueryVariables,
  cancelBookingMutation,
  cancelBookingMutationVariables,
  getBookingRescheduleQuery,
  getBookingRescheduleQueryVariables,
  rescheduleBookingMutation,
  rescheduleBookingMutationVariables,
} from "../generated";

export const createBooking = (
  options?:
    | MutationHookOptions<createBookingMutation, createBookingMutationVariables>
    | undefined
) =>
  useMutation<createBookingMutation, createBookingMutationVariables>(
    Booking.CREATE_BOOKING_MUTATION,
    options
  );

export const getBookingConfirmation = (
  options?:
    | QueryHookOptions<
        getBookingConfirmationQuery,
        getBookingConfirmationQueryVariables
      >
    | undefined
) =>
  useQuery<getBookingConfirmationQuery, getBookingConfirmationQueryVariables>(
    Booking.GET_BOOKING_CONFIRMATION_QUERY,
    options
  );

export const getBookingReschedule = (
  options?:
    | QueryHookOptions<
        getBookingRescheduleQuery,
        getBookingRescheduleQueryVariables
      >
    | undefined
) =>
  useQuery<getBookingRescheduleQuery, getBookingRescheduleQueryVariables>(
    Booking.GET_BOOKING_RESCHEDULE_QUERY,
    options
  );

export const cancelBooking = (
  options?:
    | MutationHookOptions<cancelBookingMutation, cancelBookingMutationVariables>
    | undefined
) =>
  useMutation<cancelBookingMutation, cancelBookingMutationVariables>(
    Booking.CANCEL_BOOKING_MUTATION,
    options
  );

export const rescheduleBooking = (
  options?:
    | MutationHookOptions<
        rescheduleBookingMutation,
        rescheduleBookingMutationVariables
      >
    | undefined
) =>
  useMutation<rescheduleBookingMutation, rescheduleBookingMutationVariables>(
    Booking.RESCHEDULE_BOOKING_MUTATION,
    options
  );
