import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment-timezone";
import update from "immutability-helper";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as CalendarAPI from "../../graphql/Calendar/CalendarAPI";
import {
  CalendarEventIntegrationTypeEnum,
  CalendarEventAvailabilityEnum,
  getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node,
} from "../../graphql/generated";
import { findSameDay } from "./utils";

interface Event {
  id: string;
  start: string;
  end: string;
  title: string;
  selectable: boolean;
  editable: boolean;
  backgroundColor?: string | boolean;
  borderColor?: string | boolean;
  durationEditable: boolean;
  resourceEditable: boolean;
  priority: number;
}

export default () => {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [timeRange, setTimeRange] = useState<
    { start: moment.Moment; end: moment.Moment } | undefined
  >(undefined);
  const [timezone, setTimezone] = useState("");

  const { data: userData } = UserAPI.getCurrentUser();
  const [createCalendarEvent] = CalendarAPI.createCalendarEvent();
  const [updateCalendarEvent] = CalendarAPI.updateCalendarEvent();
  const [deleteCalendarEvent] = CalendarAPI.deleteCalendarEvent();

  const nodeToEvent = (
    event: getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node
  ): Event => {
    const start = moment.tz(
      event.starting || moment().startOf("day"),
      timezone
    );
    const end = moment.tz(
      event.ending || moment.tz(event.starting, timezone).endOf("day"),
      timezone
    );
    const duration = moment.duration(start.diff(end));
    const ending = duration.asMinutes() > 30 ? start.add(30, "minutes") : end;
    const isInternal =
      event.integrationType === CalendarEventIntegrationTypeEnum.INTERNAL;

    return {
      id: event.id,
      start: start.format(),
      end: ending.format(),
      title: event.title || "",
      selectable: isInternal,
      editable: isInternal,
      resourceEditable: isInternal,
      backgroundColor: !isInternal && "rgb(51, 182, 121)",
      borderColor: !isInternal && "rgb(51, 182, 121)",
      durationEditable: isInternal,
      priority: isInternal ? 0 : 100,
    };
  };

  const [getCalendarEvents] = UserAPI.getCurrentUserCalendarEventsLazy({
    onCompleted: (data: any) => {
      let events = [];
      if (data?.currentUser?.calendarEventsConnection?.edges) {
        events = data.currentUser.calendarEventsConnection.edges.map(
          (edge: any) => nodeToEvent(edge.node)
        );
      }
      if (data?.currentUser?.googleCalendarEvents) {
        events = [
          ...events,
          ...data?.currentUser?.googleCalendarEvents.map((e: any) =>
            nodeToEvent(e)
          ),
        ];
      }
      setEvents(events);
    },
  });

  useEffect(() => {
    if (timeRange) {
      getCalendarEvents({
        variables: {
          // atOrAfterStarting: timeRange.start.toISOString(),
          // beforeEnding: timeRange.end.toISOString(),
        },
      });
    }
  }, [timeRange]);

  useEffect(() => {
    setEvents(
      events.map((e) => ({
        ...e,
        start: moment.tz(e.start, timezone).format(),
        end: moment.tz(e.end, timezone).format(),
      }))
    );
  }, [timezone]);

  useEffect(() => {
    if (userData?.currentUser) {
      setTimezone(userData.currentUser.timezone);
      const range = {
        // start: moment.tz(userData.currentUser.timezone).startOf("isoWeek"),
        // end: moment.tz(userData.currentUser.timezone).endOf("isoWeek"),
      };
      // console.log(range)
      // setTimeRange(range);
      getCalendarEvents({
        variables: {
          // atOrAfterStarting: range.start.toISOString(),
          // beforeEnding: range.end.toISOString(),
        },
      });
    }
  }, [userData]);

  const onCalendarSelect = async (info: any) => {
    const { start, end, deleteIds } = findSameDay(
      "",
      moment.tz(info.startStr, timezone),
      moment.tz(info.endStr, timezone),
      events,
      timezone
    );

    let currEvents = events;

    // Delete all events in combined
    deleteIds.forEach((id: string) => {
      deleteCalendarEvent({
        variables: {
          input: {
            calendarEventId: id,
          },
        },
      });
    });
    currEvents = currEvents.filter((event) => !deleteIds.includes(event.id));
    setEvents(currEvents);

    try {
      const result = await createCalendarEvent({
        variables: {
          input: {
            starting: start.toISOString(),
            ending: end.toISOString(),
            availability: CalendarEventAvailabilityEnum.FREE,
            integrationType: CalendarEventIntegrationTypeEnum.INTERNAL,
            title: "Available",
          },
        },
      });
      if (result?.data?.createCalendarEvent?.calendarEvent) {
        setEvents([
          ...currEvents,
          nodeToEvent(result.data.createCalendarEvent.calendarEvent),
        ]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      calendarRef.current?.getApi().unselect();
    }
  };

  const onCalendarEventChange = async (event: any) => {
    const { start, end, deleteIds } = findSameDay(
      event.event.id,
      moment.tz(event.event.start, timezone),
      moment.tz(event.event.end, timezone),
      events,
      timezone
    );

    let currEvents = events;

    // Delete all events in combined
    deleteIds.forEach((id: string) => {
      deleteCalendarEvent({
        variables: {
          input: {
            calendarEventId: id,
          },
        },
      });
    });
    currEvents = currEvents.filter((event) => !deleteIds.includes(event.id));
    const eventIndex = currEvents.findIndex((e) => e.id === event.event.id);
    setEvents(
      update(currEvents, {
        [eventIndex]: {
          start: {
            $set: start.format(),
          },
          end: {
            $set: end.format(),
          },
        },
      })
    );

    try {
      await updateCalendarEvent({
        variables: {
          input: {
            calendarEventId: event.event.id,
            starting: start.toISOString(),
            ending: end.toISOString(),
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteEventClick = async (eventId: string) => {
    const event = events.find((e) => e.id === eventId);

    if (event?.editable && confirm("Do you want to delete this date?")) {
      try {
        await deleteCalendarEvent({
          variables: {
            input: {
              calendarEventId: eventId,
            },
          },
        });

        const eventIndex = events.findIndex((e) => e.id === eventId);
        setEvents(
          update(events, {
            $splice: [[eventIndex, 1]],
          })
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <FullCalendar
      eventOrder="priority"
      customButtons={{
        next: {
          text: "",
          click: () => {
            if (timeRange) {
              calendarRef.current.getApi().next();
              setTimeRange({
                start: timeRange.start.add(7, "days"),
                end: timeRange.end.add(7, "days"),
              });
            }
            calendarRef.current.getApi().next();
          },
        },
        prev: {
          text: "",
          click: () => {
            if (timeRange) {
              setTimeRange({
                start: timeRange.start.subtract(7, "days"),
                end: timeRange.end.subtract(7, "days"),
              });
            }
            calendarRef.current.getApi().prev();
          },
        },
        today: {
          text: "Today",
          click: () => {
            setTimeRange({
              start: moment.tz(timezone).startOf("isoWeek"),
              end: moment.tz(timezone).endOf("isoWeek"),
            });
            calendarRef.current.getApi().today();
          },
        },
      }}
      // firstDay={1}
      timeZone={timezone}
      ref={calendarRef}
      eventClick={({ event }) => {
        onDeleteEventClick(event.id);
      }}
      editable
      selectMirror
      selectOverlap={true}
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
      slotEventOverlap
      eventDrop={onCalendarEventChange}
      eventResize={onCalendarEventChange}
      slotDuration="00:30:00"
      allDaySlot={false}
      nowIndicator
      height="parent"
      selectable
      slotLabelFormat={{
        hour: "numeric",
      }}
      eventTimeFormat={{
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
      }}
      selectConstraint={{
        startTime: "00:00",
        endTime: "24:00",
      }}
      eventConstraint={{
        startTime: "00:00",
        endTime: "24:00",
      }}
      select={onCalendarSelect}
      buttonText={{
        today: "Today",
        month: "month",
        week: "week",
        day: "day",
        list: "list",
      }}
      events={events}
    />
  );
};
