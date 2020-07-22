import { useMutation } from "@apollo/client";
import * as Calendar from "./calendar";
import {
  createCalendarEventMutation,
  createCalendarEventMutationVariables,
  updateCalendarEventMutationVariables,
  updateCalendarEventMutation,
  deleteCalendarEventMutationVariables,
  deleteCalendarEventMutation,
} from "../generated";

export const createCalendarEvent = () =>
  useMutation<
    createCalendarEventMutation,
    createCalendarEventMutationVariables
  >(Calendar.CREATE_CALENDAR_EVENT_MUTATION);

export const updateCalendarEvent = () =>
  useMutation<
    updateCalendarEventMutation,
    updateCalendarEventMutationVariables
  >(Calendar.UPDATE_CALENDAR_EVENT_MUTATION);

export const deleteCalendarEvent = () =>
  useMutation<
    deleteCalendarEventMutation,
    deleteCalendarEventMutationVariables
  >(Calendar.DELETE_CALENDAR_EVENT_MUTATION);
