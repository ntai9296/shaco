import React, { useState, useRef, useEffect } from "react";
import Calendar from "rc-calendar";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/router";
import CheckoutLayout from "../CheckoutLayout";
import CheckoutSummary from "../CheckoutSummary";
import {
  getServiceQuery_node_Service,
  getServiceAvailabilityQuery_node_Service,
  CreateBookingInput,
  BookingQuestionInput,
} from "../../../graphql/generated";
import * as S from "./VideoCallCheckout.styled";
import { getServiceAvailabilityById } from "../../../graphql/Service/ServiceAPI";
import * as BookingAPI from "../../../graphql/Booking/BookingAPI";
import dynamic from "next/dynamic";

const PaymentCheckout = dynamic(() => import("../Payment/PaymentCheckout"), {
  ssr: false,
});

interface Props {
  service: getServiceQuery_node_Service;
}

export default ({ service }: Props) => {
  const router = useRouter();
  const userTimezone = useRef(moment.tz.guess());
  const [loading, setLoading] = useState(false);
  const [
    createBooking,
    { error: createBookingError },
  ] = BookingAPI.createBooking({
    onCompleted: (data) => {
      router.push(`/bookings/${data.createBooking?.booking?.id}`);
    },
    onError: () => {
      setLoading(false);
    },
  });

  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    if (createBookingError) {
      setErrors([createBookingError.message]);
    }
  }, [createBookingError]);

  const [form, setForm] = useState<CreateBookingInput>({
    serviceId: service.id,
    firstName: "",
    lastName: "",
    email: "",
    tokenId: "",
    bookingDate: "",
    phoneNumber: "",
    timezone: userTimezone.current,
    bookingQuestions: (service.serviceQuestionsConnection.nodes || []).map(
      (node) => ({
        question: node?.question,
        answer: "",
        serviceQuestionId: node?.id,
      })
    ) as BookingQuestionInput[],
  });

  const [currentDateTime] = useState(moment.tz(userTimezone.current));
  const [calendarDateTime, setCalendarDateTime] = useState(currentDateTime);
  const [availabilities, setAvailabilities] = useState<{
    [key: string]: any[];
  }>({});

  const providable = service.providable as any;

  const { data } = getServiceAvailabilityById({
    variables: {
      id: service.id,
      atOrAfterStarting: currentDateTime.clone().subtract("1", "day"),
    },
    onCompleted: (data) => {
      const node = data?.node as getServiceAvailabilityQuery_node_Service;
      const currentPlus15 = currentDateTime.clone().add(15, "minutes");
      const availableObject = Object.keys(node.profile?.availabilities).reduce(
        (availableObject: any, key: string) => {
          const currentDateObj = node.profile?.availabilities[key];
          if (providable.duration) {
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
        },
        {}
      );
      setAvailabilities(availableObject);
    },
  });

  const onSubmitPaymentCheckout = (tokenId: string = "") => {
    // Validate data
    if (!form.firstName) {
      return setErrors(["Missing first name"]);
    }
    if (!form.lastName) {
      return setErrors(["Missing last name"]);
    }
    if (!form.email) {
      return setErrors(["Missing email"]);
    }
    if ((form.bookingQuestions?.filter((q) => !q.answer) || []).length > 0) {
      return setErrors(["Please fill out the text field"]);
    }
    setLoading(true);
    createBooking({
      variables: {
        input: {
          ...form,
          tokenId,
        },
      },
    });
  };

  const payment = router.asPath.includes("payment=true");

  const node = data?.node as
    | getServiceAvailabilityQuery_node_Service
    | undefined;

  if (!node) {
    return null;
  }

  return (
    <CheckoutLayout
      info={
        <CheckoutSummary
          title={service.name || ""}
          price={service.price}
          currency="$"
          description={`Duration: ${providable.duration} mins`}
          img={service.imageUrl}
          pricingType={service.pricingType}
        >
          {form.bookingDate && payment && (
            <div>
              <S.BookingDate>
                {moment
                  .tz(form.bookingDate, userTimezone.current)
                  .format("MM/DD/YYYY - h:mm A")}{" "}
                <span>
                  <a onClick={() => setForm({ ...form, bookingDate: "" })}>
                    Change
                  </a>
                </span>
              </S.BookingDate>
            </div>
          )}
        </CheckoutSummary>
      }
      action={
        <S.CheckoutContainer>
          {payment && form.bookingDate ? (
            <PaymentCheckout
              onSubmit={onSubmitPaymentCheckout}
              form={form}
              onChangeForm={(newForm: any) => setForm(newForm)}
              title="Provide booking details"
              loading={loading}
              errors={errors}
              showPayment={service.price > 0}
              price={service.price}
              pricingType={service.pricingType}
            />
          ) : (
            <>
              <S.CheckoutDate>Select a Date & Time</S.CheckoutDate>
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
                <S.CalendarTimeList>
                  <S.CalendarTimes>
                    {availabilities[calendarDateTime.format("MM/DD/YYYY")]?.map(
                      (slot, idx) => (
                        <Link
                          key={idx}
                          href="/checkout/[serviceId]"
                          as={`/checkout/${service.id}?payment=true`}
                          shallow
                        >
                          <S.CalendarTime
                            onClick={() =>
                              setForm({
                                ...form,
                                bookingDate: slot.starting.toISOString(),
                              })
                            }
                          >
                            {slot.format}
                          </S.CalendarTime>
                        </Link>
                      )
                    )}
                  </S.CalendarTimes>
                </S.CalendarTimeList>
              </S.CalendarContainer>
            </>
          )}
        </S.CheckoutContainer>
      }
    />
  );
};
