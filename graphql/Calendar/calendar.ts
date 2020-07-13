import { gql } from "@apollo/client";

export const CREATE_CALENDAR_EVENT_MUTATION = gql`
  mutation createCalendarEventMutation($input: CreateCalendarEventInput!) {
    createCalendarEvent(input: $input) {
      calendarEvent {
        id
        starting
        ending
        availability
        integrationType
        title
      }
    }
  }
`;

export const UPDATE_CALENDAR_EVENT_MUTATION = gql`
  mutation updateCalendarEventMutation($input: UpdateCalendarEventInput!) {
    updateCalendarEvent(input: $input) {
      calendarEvent {
        id
        starting
        ending
        availability
        integrationType
        title
      }
    }
  }
`;

export const DELETE_CALENDAR_EVENT_MUTATION = gql`
  mutation deleteCalendarEventMutation($input: DeleteCalendarEventInput!) {
    deleteCalendarEvent(input: $input) {
      calendarEvent {
        id
        starting
        ending
        availability
        integrationType
        title
      }
    }
  }
`;
