import {
  useMutation,
  MutationHookOptions,
  useQuery,
  QueryHookOptions,
  useLazyQuery,
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
  getHostBookingQueryVariables,
  getHostBookingQuery,
  getHostBookingZoomStartUrlQuery,
  getHostBookingZoomStartUrlQueryVariables,
  requestRescheduleBookingMutation,
  requestRescheduleBookingMutationVariables,
  createBookingCompleteMutation,
  createBookingCompleteMutationVariables,
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

export const getHostBooking = (
  options?: QueryHookOptions<getHostBookingQuery, getHostBookingQueryVariables>
) =>
  useQuery<getHostBookingQuery, getHostBookingQueryVariables>(
    Booking.GET_HOST_BOOKING_QUERY,
    options
  );

export const getHostBookingZoomStartURL = (
  options?: QueryHookOptions<
    getHostBookingZoomStartUrlQuery,
    getHostBookingZoomStartUrlQueryVariables
  >
) =>
  useLazyQuery<
    getHostBookingZoomStartUrlQuery,
    getHostBookingZoomStartUrlQueryVariables
  >(Booking.GET_HOST_BOOKING_ZOOM_START_URL_QUERY, options);

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
  options?: MutationHookOptions<
    cancelBookingMutation,
    cancelBookingMutationVariables
  >
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

export const requestRescheduleBooking = (
  options?: MutationHookOptions<
    requestRescheduleBookingMutation,
    requestRescheduleBookingMutationVariables
  >
) =>
  useMutation<
    requestRescheduleBookingMutation,
    requestRescheduleBookingMutationVariables
  >(Booking.REQUEST_RESCHEDULE_BOOKING_MUTATION, options);

export const createBookingComplete = (
  options?: MutationHookOptions<
    createBookingCompleteMutation,
    createBookingCompleteMutationVariables
  >
) =>
  useMutation<
    createBookingCompleteMutation,
    createBookingCompleteMutationVariables
  >(Booking.CREATE_BOOKING_COMPLETE_MUTATION, options);
