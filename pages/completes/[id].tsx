import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import * as Main from "../../src/BookingComplete/Main.styled";
import { getBookingComplete } from "../../graphql/BookingComplete/BookingCompleteAPI";
import {
  BookingStatusEnum,
  getBookingCompleteQuery_node_BookingComplete,
} from "../../graphql/generated";
import Button from "../../src/common/Button";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const { data, loading } = getBookingComplete({
    variables: {
      id: router.query?.id as string,
    },
    skip: !router.query?.id,
  });

  if (loading) {
    return null;
  }

  const node = data?.node as getBookingCompleteQuery_node_BookingComplete;

  if (!node) {
    return <div>Booking complete not found</div>;
  }
  return (
    <Main.BookingCompleteContainer>
      <Main.ConfirmationHeader>
        Booking request completed
      </Main.ConfirmationHeader>
      <Main.ConfirmationContainer>
        <Main.HostProfileAvatar
          src={node?.booking?.hostProfile?.profilePhotoUrl}
        />
        <Main.HostProfileName>
          {node?.booking?.hostProfile?.name}
        </Main.HostProfileName>
        <Main.ServiceName>{node?.booking?.service?.name}</Main.ServiceName>
        <Main.BookingMessageContainer>
          {node.message}

          {node.attachments.length > 0 && (
            <Main.AttachmentList>
              <b>Attachments</b>
              {node.attachments.map((link) => {
                return (
                  <div key={link}>
                    <a target="_blank" href={link}>
                      {link}
                    </a>
                  </div>
                );
              })}
            </Main.AttachmentList>
          )}
        </Main.BookingMessageContainer>
      </Main.ConfirmationContainer>
    </Main.BookingCompleteContainer>
  );
};
