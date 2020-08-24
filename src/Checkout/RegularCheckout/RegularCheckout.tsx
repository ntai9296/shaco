import React, { useState, useRef, useEffect } from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import CheckoutLayout from "../CheckoutLayout";
import CheckoutSummary from "../CheckoutSummary";
import {
  getServiceQuery_node_Service,
  CreateBookingInput,
  BookingQuestionInput,
  ServicePricingTypeEnum,
} from "../../../graphql/generated";
import * as S from "./RegularCheckout.styled";
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
    price: 0,
    timezone: userTimezone.current,
    bookingQuestions: (service.serviceQuestionsConnection.nodes || []).map(
      (node) => ({
        question: node?.question,
        answer: "",
        serviceQuestionId: node?.id,
      })
    ) as BookingQuestionInput[],
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
    if (
      service.pricingType === ServicePricingTypeEnum.FLEXIBLE &&
      !form.price
    ) {
      return setErrors(["Name your price is missing"]);
    }
    if ((form.bookingQuestions?.filter((q) => !q.answer) || []).length > 0) {
      return setErrors(["Please fill out all fields"]);
    }
    if (
      service.pricingType === ServicePricingTypeEnum.FLEXIBLE &&
      Math.round((form.price || 0) * 100) < 50
    ) {
      return setErrors([
        "Name your price must be greater or equal to 50 cents",
      ]);
    }

    setLoading(true);
    createBooking({
      variables: {
        input: {
          ...form,
          tokenId,
          price: Math.round((form.price || 0) * 100),
          bookingDate: moment.tz(moment.tz.guess()).toISOString(),
        },
      },
    });
  };

  return (
    <CheckoutLayout
      info={
        <CheckoutSummary
          title={`${service.profile.name} - ${service.name}`}
          price={service.price}
          currency="$"
          description={service.description || ""}
          img={service.imageUrl}
          pricingType={service.pricingType}
        />
      }
      action={
        <S.CheckoutContainer>
          <PaymentCheckout
            onSubmit={onSubmitPaymentCheckout}
            form={form}
            onChangeForm={(newForm: any) => setForm(newForm)}
            title="Provide your details"
            loading={loading}
            errors={errors}
            showPayment={service.price > 0}
            price={service.price}
            pricingType={service.pricingType}
          />
        </S.CheckoutContainer>
      }
    />
  );
};
