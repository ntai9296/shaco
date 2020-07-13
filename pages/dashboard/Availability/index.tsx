import React, { useRef, useState, useEffect } from "react";
import FullCalendar, { DateSelectArg, EventChangeArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { X } from "react-feather";
import moment from "moment-timezone";
import update from "immutability-helper";
import * as S from "./Availability.styled";
import * as UserAPI from "../../../graphql/User/UserAPI";
import * as CalendarAPI from "../../../graphql/Calendar/CalendarAPI";
import {
  CalendarEventIntegrationTypeEnum,
  CalendarEventAvailabilityEnum,
  getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node,
} from "../../../graphql/generated";
import Select from "../../common/Select";
import Link from "../../common/Link";

export default () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [timeRange, setTimeRange] = useState<{ start: moment.Moment; end: moment.Moment }>(
    undefined,
  );
  const [timezone, setTimezone] = useState(undefined);

  const { data: userData } = UserAPI.getCurrentUser();
  const [createCalendarEvent] = CalendarAPI.createCalendarEvent();
  const [updateCalendarEvent] = CalendarAPI.updateCalendarEvent();
  const [deleteCalendarEvent] = CalendarAPI.deleteCalendarEvent();

  const nodeToEvent = (
    event: getCurrentUserCalendarEventsQuery_currentUser_calendarEventsConnection_edges_node,
  ) => {
    const start = moment.tz(event.starting, timezone);
    const end = moment.tz(event.ending, timezone);
    const duration = moment.duration(start.diff(end));
    const ending = duration.asMinutes() > 30 ? start.add(30, "minutes") : end;
    const isInternal = event.integrationType === CalendarEventIntegrationTypeEnum.INTERNAL;

    return {
      id: event.id,
      start: start.format(),
      end: ending.format(),
      title: event.title || "",
      selectable: isInternal,
      editable: isInternal,
      backgroundColor: !isInternal && "rgb(51, 182, 121)",
      borderColor: !isInternal && "rgb(51, 182, 121)",
      durationEditable: isInternal,
      priority: isInternal ? 0 : 100,
    };
  };

  const [getCalendarEvents] = UserAPI.getCurrentUserCalendarEventsLazy({
    onCompleted: (data) => {
      if (data?.currentUser?.calendarEventsConnection?.edges) {
        setEvents(
          data.currentUser.calendarEventsConnection.edges.map((edge) => nodeToEvent(edge.node)),
        );
      }
    },
  });

  useEffect(() => {
    if (timeRange) {
      getCalendarEvents({
        variables: {
          atOrAfterStarting: timeRange.start.toISOString(),
          beforeEnding: timeRange.end.toISOString(),
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
      })),
    );
  }, [timezone]);

  useEffect(() => {
    if (userData?.currentUser) {
      setTimezone(userData.currentUser.timezone);
      const range = {
        start: moment.tz(userData.currentUser.timezone).startOf("isoWeek"),
        end: moment.tz(userData.currentUser.timezone).endOf("isoWeek"),
      };
      setTimeRange(range);
      getCalendarEvents({
        variables: {
          atOrAfterStarting: range.start.toISOString(),
          beforeEnding: range.end.toISOString(),
        },
      });
    }
  }, [userData]);

  const onCalendarSelect = async (info: DateSelectArg) => {
    try {
      const result = await createCalendarEvent({
        variables: {
          input: {
            starting: moment.tz(info.startStr, timezone).toISOString(),
            ending: moment.tz(info.endStr, timezone).toISOString(),
            availability: CalendarEventAvailabilityEnum.FREE,
            integrationType: CalendarEventIntegrationTypeEnum.INTERNAL,
            title: "Available",
          },
        },
      });
      setEvents([...events, nodeToEvent(result.data.createCalendarEvent.calendarEvent)]);
    } catch (err) {
      console.log(err);
    } finally {
      calendarRef.current.getApi().unselect();
    }
  };

  const onCalendarEventChange = async (event: EventChangeArg) => {
    try {
      const result = await updateCalendarEvent({
        variables: {
          input: {
            calendarEventId: event.event.id,
            starting: moment(event.event.startStr).toISOString(),
            ending: moment(event.event.endStr).toISOString(),
          },
        },
      });

      const eventIndex = events.findIndex((e) => e.id === event.event.id);
      setEvents(
        update(events, {
          [eventIndex]: {
            $set: nodeToEvent(result.data.updateCalendarEvent.calendarEvent),
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteEventClick = async (eventId: string) => {
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
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Layout>
      <S.Heading>Availability</S.Heading>
      {/* <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        <option value="America/Los_Angeles">Pacific</option>
        <option value="America/New_York">East</option>
      </Select> */}
      <S.TimezoneInfo>
        We only allow bookings within your availability that you set below.
      </S.TimezoneInfo>
      <S.Timezone>
        Your timezone: {timezone} {moment.tz(timezone).format("(h:mm A)")}{" "}
        <Link to="/dashboard/settings">Change</Link>
      </S.Timezone>

      <S.Calendar>
        <FullCalendar
          eventOrder="priority"
          customButtons={{
            next: {
              click: () => {
                calendarRef.current.getApi().next();
                setTimeRange({
                  start: timeRange.start.add(7, "days"),
                  end: timeRange.end.add(7, "days"),
                });
              },
            },
            prev: {
              click: () => {
                setTimeRange({
                  start: timeRange.start.subtract(7, "days"),
                  end: timeRange.end.subtract(7, "days"),
                });
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
          firstDay={1}
          timeZone={timezone}
          ref={calendarRef}
          editable
          selectMirror
          selectOverlap={true}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          slotEventOverlap
          eventChange={onCalendarEventChange}
          slotDuration="00:30:00"
          allDaySlot={false}
          nowIndicator
          height="100%"
          selectable
          slotLabelFormat={{
            hour: "numeric",
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventContent={(eventInfo) => (
            <S.Event>
              <S.EventTime>
                <b>{eventInfo.event.title}</b>
                {eventInfo.event.durationEditable && (
                  <S.EventDelete>
                    <X
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEventClick(eventInfo.event.id);
                      }}
                      width={16}
                      height={16}
                    />
                  </S.EventDelete>
                )}
              </S.EventTime>
              <S.EventTitle>{eventInfo.timeText}</S.EventTitle>
            </S.Event>
          )}
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
          headerToolbar={{
            right: "today prev,next",
          }}
          events={events}
        />
      </S.Calendar>
    </S.Layout>
  );
};
