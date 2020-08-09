import { useQuery, QueryHookOptions } from "@apollo/client";
import { GET_BOOKING_COMPLETE_QUERY } from "./booking_complete";
import {
  getBookingCompleteQuery,
  getBookingCompleteQueryVariables,
} from "../generated";

export const getBookingComplete = (
  options?: QueryHookOptions<
    getBookingCompleteQuery,
    getBookingCompleteQueryVariables
  >
) =>
  useQuery<getBookingCompleteQuery, getBookingCompleteQueryVariables>(
    GET_BOOKING_COMPLETE_QUERY,
    options
  );
