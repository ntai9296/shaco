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
import Link from "next/link";

export default () => {
  const router = useRouter();
  const { data, loading } = BookingAPI.getBookingConfirmation({
    variables: {
      id: router.query?.bookingId as string,
    },
    skip: !router.query?.bookingId,
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
      <S.ConfirmationHeader>Your request is complete!</S.ConfirmationHeader>
      <S.ConfirmationSubHeader>
        You requested a {node.description} from {node.hostProfile.name}.
      </S.ConfirmationSubHeader>

      {node.providableType === "VideoCall" ? (
        <S.ConfirmationContainer>
          <S.ProfileName>{node.description}</S.ProfileName>
          <S.BookingDetails>
            {moment
              .tz(node.bookingDate, moment.tz.guess())
              .format("ddd, MMM DD - hh:mm A")}{" "}
            ({node.providable?.duration} mins)
          </S.BookingDetails>
          <S.BookingEmailMessage>
            We sent a confirmation, and a calendar invitation with a link to
            join the video call to {node.userEmail}
          </S.BookingEmailMessage>
          <Link href={`/${node.hostProfile.slug}`}>
            <a>
              <Button>Done</Button>
            </a>
          </Link>
        </S.ConfirmationContainer>
      ) : (
        <S.ConfirmationContainer>
          <S.ProfileName>What's Next?</S.ProfileName>
          <S.BookingEmailMessage>
            <div>1. Your request has been sent to {node.hostProfile.name}!</div>
            <div>
              2. {node.hostProfile.name} has 1 week to fullfill your request.
            </div>
            <div>3. Interact with {node.hostProfile.name} again!</div>
          </S.BookingEmailMessage>
          <Link href={`/${node.hostProfile.slug}`}>
            <a>
              <Button>Done</Button>
            </a>
          </Link>
        </S.ConfirmationContainer>
      )}
    </S.BookingConfirmationContainer>
  );
};
