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

  if (!node || node?.status === BookingStatusEnum.Cancelled) {
    return <div>Booking not found</div>;
  }
  return (
    <S.BookingConfirmationContainer>
      <S.ConfirmationHeader>
        {node.status === BookingStatusEnum.Requested
          ? "Booking requested!"
          : "Booking confirmed!"}
      </S.ConfirmationHeader>

      {node.providableType === "VideoCall" ? (
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
          {node?.service?.imageUrl && (
            <S.ServiceImage>
              <img src={node?.service?.imageUrl} />
            </S.ServiceImage>
          )}
          <S.ProfileName>{node?.service?.name}</S.ProfileName>
          <S.BookingEmailMessage>
            We sent a confirmation to {node.userEmail}. We will email you when there's an update.
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
