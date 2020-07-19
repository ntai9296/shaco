import { useMutation, MutationHookOptions } from "@apollo/client";
import * as Booking from "./booking";
import {
  createBookingMutation,
  createBookingMutationVariables,
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
