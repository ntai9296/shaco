import React, { useState } from "react";
import moment from "moment-timezone";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as S from "../../../src/Dashboard/Request/Request.styled";
import { getCurrentUserBookings } from "../../../graphql/User/UserAPI";
import {
  getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes,
  BookingStatusEnum,
  getCurrentUserBookingsQueryVariables,
} from "../../../graphql/generated";
import { ChevronRight, ChevronDown } from "react-feather";
import Link from "next/link";
import Popper from "../../../src/common/Popper";
import { getHumanizeEnum } from "../../../src/common/utility";

export default () => {
  const [openStatusPop, setOpenStatusPop] = useState(false);
  const [openSortPop, setOpenSortPop] = useState(false);
  const [filter, setFilter] = useState<getCurrentUserBookingsQueryVariables>({
    isHost: true,
    statuses: [
      BookingStatusEnum.ACTIVE,
      BookingStatusEnum.REQUESTED,
    ],
    sortBy: "DESC",
  });
  const { data } = getCurrentUserBookings({
    variables: filter,
    ssr: false,
  });

  const bookings = (data?.currentUser?.bookingsConnection.nodes ||
    []) as getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes[];

  return (
    <DashboardLayout noContentPadding>
      <S.Layout>
        <S.LayoutContainer>
          <S.HeadingContainer>
            <S.Heading>Requests</S.Heading>
            <S.HeadingFilter>
              <Popper
                position="bottom"
                onClickOutside={() => setOpenStatusPop(false)}
                isOpen={openStatusPop}
                content={
                  <S.FilterList>
                    <S.FilterItem
                      onClick={() => {
                        setFilter({
                          ...filter,
                          statuses: [
                            BookingStatusEnum.ACTIVE,
                            BookingStatusEnum.REQUESTED,
                          ],
                        });
                        setOpenStatusPop(false);
                      }}
                    >
                      Active
                    </S.FilterItem>
                    <S.FilterItem
                      onClick={() => {
                        setFilter({
                          ...filter,
                          statuses: [BookingStatusEnum.COMPLETED],
                        });
                        setOpenStatusPop(false);
                      }}
                    >
                      Completed
                    </S.FilterItem>
                  </S.FilterList>
                }
              >
                <S.FilterButton onClick={() => setOpenStatusPop(true)}>
                  {filter.statuses?.includes(BookingStatusEnum.ACTIVE)
                    ? "Active"
                    : "Completed"}{" "}
                  <ChevronDown size={16} />
                </S.FilterButton>
              </Popper>

              <Popper
                position="bottom"
                onClickOutside={() => setOpenSortPop(false)}
                isOpen={openSortPop}
                content={
                  <S.FilterList>
                    <S.FilterItem
                      onClick={() => {
                        setFilter({
                          ...filter,
                          sortBy: "DESC",
                        });
                        setOpenSortPop(false);
                      }}
                    >
                      Newest
                    </S.FilterItem>
                    <S.FilterItem
                      onClick={() => {
                        setFilter({
                          ...filter,
                          sortBy: "ASC",
                        });
                        setOpenSortPop(false);
                      }}
                    >
                      Oldest
                    </S.FilterItem>
                  </S.FilterList>
                }
              >
                <S.FilterButton onClick={() => setOpenSortPop(true)}>
                  Sort by: {filter.sortBy === "DESC" ? "Newest" : "Oldest"}{" "}
                  <ChevronDown size={16} />
                </S.FilterButton>
              </Popper>
            </S.HeadingFilter>
          </S.HeadingContainer>
          <S.SectionContainer>
            <S.BookingTable>
              <S.BookingTableHeader>
                <S.HeaderColumn noPadding={true} />
                <S.HeaderColumn flex>Title</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 125 }}>Price</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 150 }}>Status</S.HeaderColumn>
                <S.HeaderColumn style={{ width: 180 }}>
                  Request Date
                </S.HeaderColumn>
              </S.BookingTableHeader>
              <S.BookingTableBody>
                {bookings.length === 0 && (
                  <S.BookingBodyEmpty>
                    You don't have any request at the moment.
                  </S.BookingBodyEmpty>
                )}
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
                                {moment(booking.bookingDate).format("h:mm A")} (
                                {booking?.providable?.duration} mins)
                              </S.ServiceDescription>
                            </>
                          )}
                          {booking.providableType !== "VideoCall" && (
                            <>
                              <S.ServiceName>
                                {booking.service?.name}
                              </S.ServiceName>
                              <S.ServiceDescription>
                                {booking.userFullName} - {booking.userEmail}
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
                          <S.StatusLabel>
                            {getHumanizeEnum(booking.status)}
                          </S.StatusLabel>
                        </S.RequestTableBodyContent>
                        <S.RequestTableBodyContent style={{ width: 180 }}>
                          {moment(booking.createdAt).fromNow()}
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
