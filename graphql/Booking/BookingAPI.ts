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
