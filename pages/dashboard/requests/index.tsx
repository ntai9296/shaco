import React from "react";
import moment from "moment-timezone";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as S from "../../../src/Dashboard/Request/Request.styled";
import { getCurrentUserBookings } from "../../../graphql/User/UserAPI";
import { getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes } from "../../../graphql/generated";
import { ChevronRight } from "react-feather";
import Link from "next/link";

export default () => {
  const { data } = getCurrentUserBookings({
    variables: {
      isHost: true,
    },
  });

  const bookings = (data?.currentUser?.bookingsConnection.nodes ||
    []) as getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes[];
  return (
    <DashboardLayout noContentPadding>
      <S.Layout>
        <S.LayoutContainer>
          <S.HeadingContainer>
            <S.Heading>Requests</S.Heading>
          </S.HeadingContainer>
          <S.SectionContainer>
            <S.BookingTable>
              <S.BookingTableHeader>
                <S.HeaderColumn noPadding={true} />
                <S.HeaderColumn flex>Title</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 125 }}>Price</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 150 }}>Status</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 180 }}>
                  Last Update
                </S.HeaderColumn>
              </S.BookingTableHeader>
              <S.BookingTableBody>
                {bookings.map((booking) => {
                  return (
                    <Link
                      key={booking.id}
                      href="/dashboard/requests/[id]"
                      as={`/dashboard/requests/${booking.id}`}
                    >
                      <S.BookingTableBodyRow>
                        <S.RequestTableBodyContent noPadding />
                        <S.RequestTableBodyContent flex>
                          {booking.providableType === "VideoCall" && (
                            <>
                              <S.ServiceName>
                                {booking.service?.name}
                              </S.ServiceName>
                              <S.ServiceDescription>
                                {booking.userFullName} -{" "}
                                {moment(booking.bookingDate).format(
                                  "ddd, MMM D"
                                )}{" "}
                                at{" "}
                                {moment(booking.bookingDate).format("hh:mm A")}{" "}
                                ({booking?.providable?.duration} mins)
                              </S.ServiceDescription>
                            </>
                          )}
                        </S.RequestTableBodyContent>
                        <S.RequestTableBodyContent style={{ width: 125 }}>
                          {booking.price > 0
                            ? `$${booking.price / 100}`
                            : `Free`}
                        </S.RequestTableBodyContent>
                        <S.RequestTableBodyContent style={{ width: 150 }}>
                          <S.StatusLabel>{booking.status}</S.StatusLabel>
                        </S.RequestTableBodyContent>
                        <S.RequestTableBodyContent style={{ width: 180 }}>
                          {moment(booking.updatedAt).fromNow()}
                        </S.RequestTableBodyContent>
                        <ChevronRight
                          size={17}
                          style={{ position: "absolute", right: 10 }}
                        />
                      </S.BookingTableBodyRow>
                    </Link>
                  );
                })}
              </S.BookingTableBody>
            </S.BookingTable>
          </S.SectionContainer>
        </S.LayoutContainer>
      </S.Layout>
    </DashboardLayout>
  );
};
