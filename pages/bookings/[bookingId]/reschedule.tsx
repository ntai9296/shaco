import React, { useRef, useState } from "react";
import Calendar from "rc-calendar";
import Router from "next/router";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import * as S from "../../../src/Booking/Booking.styled";
import * as BookingAPI from "../../../graphql/Booking/BookingAPI";
import {
  getBookingConfirmationQuery_node_Booking,
  BookingStatusEnum,
  getBookingRescheduleQuery_node_Booking_service,
  getBookingRescheduleQuery_node_Booking,
} from "../../../graphql/generated";
import Button from "../../../src/common/Button";
import * as VS from "../../../src/Checkout/VideoCall/VideoCallCheckout.styled";

export default () => {
  const router = useRouter();
  const userTimezone = useRef(moment.tz.guess());

  const [bookingSlot, setBookingSlot] = useState<any>();
  const [currentDateTime] = useState(moment.tz(userTimezone.current));
  const [calendarDateTime, setCalendarDateTime] = useState(currentDateTime);
  const [availabilities, setAvailabilities] = useState<{
    [key: string]: any[];
  }>({});

  const [
    rescheduleBooking,
    { loading: rescheduleBookingLoading },
  ] = BookingAPI.rescheduleBooking({
    onCompleted: (data) => {
      if (data.rescheduleBooking?.booking?.id) {
        Router.push(`/bookings/${data.rescheduleBooking?.booking.id}`);
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { data, loading } = BookingAPI.getBookingReschedule({
    skip: !router.query?.bookingId,
    variables: {
      id: (router.query?.bookingId as string) || "",
    },
    onCompleted: (data) => {
      const node = data?.node as getBookingRescheduleQuery_node_Booking;
      const currentPlus15 = currentDateTime.clone().add(15, "minutes");

      if (!node) {
        return;
      }

      const providable = node.providable as any;

      const availableObject = Object.keys(
        node.hostProfile?.availabilities
      ).reduce((availableObject: any, key: string) => {
        const currentDateObj = node.hostProfile?.availabilities[key];
        if (providable?.duration) {
          currentDateObj.slots.map(({ starting, ending }: any) => {
            let momentStarting = moment.tz(starting, userTimezone.current);
            const momentEnding = moment.tz(ending, userTimezone.current);
            let momentStartingWithDuration = momentStarting
              .clone()
              .add(providable.duration, "minutes");

            while (momentStartingWithDuration <= momentEnding) {
              const slotDate = momentStarting.format("MM/DD/YYYY");
              if (!availableObject[slotDate]) {
                availableObject[slotDate] = [];
              }

              if (momentStarting > currentPlus15) {
                availableObject[slotDate] = [
                  ...availableObject[slotDate],
                  {
                    starting: momentStarting,
                    duration: providable.duration,
                    ending: momentStartingWithDuration,
                    format: momentStarting.format("h:mm A"),
                  },
                ];
                momentStarting = momentStartingWithDuration;
                momentStartingWithDuration = momentStartingWithDuration
                  .clone()
                  .add(providable.duration, "minutes");
              } else {
                momentStarting = momentStarting.add(15, "minutes");
                momentStartingWithDuration = momentStarting
                  .clone()
                  .add(providable.duration, "minutes");
              }
            }
          });
        }
        return availableObject;
      }, {});
      setAvailabilities(availableObject);
    },
  });

  if (loading) {
    return null;
  }

  const node = data?.node as getBookingConfirmationQuery_node_Booking;

  if (!node || node?.status === BookingStatusEnum.CANCELLED) {
    return <div>Request not found</div>;
  }

  return (
    <S.BookingConfirmationContainer>
      <S.ConfirmationHeader>
        Reschedule {node.description} ({node.providable?.duration} mins)
      </S.ConfirmationHeader>
      <S.ConfirmationContainer>
        <S.BookingNewDateTime>Select a new date and time</S.BookingNewDateTime>
        <S.CalendarContainer>
          <Calendar
            selectedValue={calendarDateTime}
            onSelect={(e) => setCalendarDateTime(e)}
            disabledDate={(date) => {
              return (
                !date ||
                !(availabilities[date?.format("MM/DD/YYYY")]?.length > 0)
              );
            }}
            showDateInput={false}
            showToday={false}
          />
          <VS.CalendarTimeList>
            <VS.CalendarTimes>
              {availabilities[calendarDateTime.format("MM/DD/YYYY")]?.map(
                (slot, idx) => (
                  <VS.CalendarTime
                    key={idx}
                    active={slot.format === bookingSlot?.format}
                    onClick={() => setBookingSlot(slot)}
                  >
                    {slot.format}
                  </VS.CalendarTime>
                )
              )}
            </VS.CalendarTimes>
          </VS.CalendarTimeList>
        </S.CalendarContainer>
        {bookingSlot && (
          <S.ConfirmRescheduleButtonContainer>
            <Button
              isLoading={rescheduleBookingLoading}
              onClick={() =>
                rescheduleBooking({
                  variables: {
                    input: {
                      bookingId: node.id,
                      bookingDate: bookingSlot.starting.toISOString(),
                    },
                  },
                })
              }
            >
              Confirm
            </Button>
          </S.ConfirmRescheduleButtonContainer>
        )}
      </S.ConfirmationContainer>
    </S.BookingConfirmationContainer>
  );
};
