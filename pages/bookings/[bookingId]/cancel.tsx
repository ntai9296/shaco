import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import * as S from "../../../src/Booking/Booking.styled";
import * as BookingAPI from "../../../graphql/Booking/BookingAPI";
import {
  getBookingConfirmationQuery_node_Booking,
  BookingStatusEnum,
} from "../../../graphql/generated";
import Button from "../../../src/common/Button";

export default () => {
  const router = useRouter();
  const { data, loading } = BookingAPI.getBookingConfirmation({
    variables: {
      id: (router.query?.bookingId as string) || "",
    },
  });
  const [
    cancelBooking,
    { loading: cancelBookingLoading },
  ] = BookingAPI.cancelBooking({
    onCompleted: (data) => {
      console.log(data);
    },
  });

  if (loading) {
    return null;
  }

  const node = data?.node as getBookingConfirmationQuery_node_Booking;

  if (!node) {
    return <div>Booking not found</div>;
  }

  if (node.status === BookingStatusEnum.CANCELLED) {
    return (
      <S.BookingConfirmationContainer>
        <S.ConfirmationContainer>
          <S.ConfirmationHeader>Booking cancelled.</S.ConfirmationHeader>
          <S.BookingEmailMessage>
            You will get a full refund within a few days.
          </S.BookingEmailMessage>
        </S.ConfirmationContainer>
      </S.BookingConfirmationContainer>
    );
  }

  return (
    <S.BookingConfirmationContainer>
      <S.ConfirmationHeader>Cancel Booking</S.ConfirmationHeader>
      <S.ConfirmationContainer>
        {node.hostProfile.profilePhotoUrl && (
          <S.ProfilePicture>
            <img src={node.hostProfile.profilePhotoUrl} />
          </S.ProfilePicture>
        )}
        <S.ProfileName>{node.hostProfile.name}</S.ProfileName>
        <S.BookingDetails>
          {moment
            .tz(node.bookingDate, moment.tz.guess())
            .format("ddd, MMM DD - hh:mm A")}{" "}
          ({node?.providable?.duration} mins)
        </S.BookingDetails>
        <S.BookingEmailMessage>
          We are sorry that you want to cancel your call. You will get a full
          refund within a few days.
        </S.BookingEmailMessage>
        <div>
          <Button
            onClick={() =>
              cancelBooking({
                variables: {
                  input: {
                    bookingId: node.id,
                  },
                },
              })
            }
            isLoading={cancelBookingLoading}
          >
            Cancel booking
          </Button>
        </div>
      </S.ConfirmationContainer>
    </S.BookingConfirmationContainer>
  );
};
