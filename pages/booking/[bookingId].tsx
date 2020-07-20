import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import * as S from "../../src/Booking/Booking.styled";
import * as BookingAPI from "../../graphql/Booking/BookingAPI";
import { getBookingConfirmationQuery_node_Booking } from "../../graphql/generated";
import Button from "../../src/common/Button";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const { data, loading } = BookingAPI.getBookingConfirmation({
    variables: {
      id: (router.query?.bookingId as string) || "",
    },
  });

  if (loading) {
    return null;
  }

  const node = data?.node as getBookingConfirmationQuery_node_Booking;

  if (!node) {
    return <div>Booking not found</div>;
  }
  return (
    <S.BookingConfirmationContainer>
      <S.ConfirmationHeader>Booking confirmed!</S.ConfirmationHeader>
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
            .format("ddd, MMM DD - hh:mm A")}
        </S.BookingDetails>
        <S.BookingEmailMessage>
          We sent a confirmation, and a calendar invitation with a link to join
          the video call to {node.userEmail}
        </S.BookingEmailMessage>
        <Link href={`/${node.hostProfile.slug}`}>
          <a>
            <Button>Done</Button>
          </a>
        </Link>
      </S.ConfirmationContainer>
    </S.BookingConfirmationContainer>
  );
};
