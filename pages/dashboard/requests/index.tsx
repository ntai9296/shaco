import React, { useState } from "react";
import moment from "moment-timezone";
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
import withDashboard from "../../../src/common/Layout/withDashboard";
import DashboardPageContent from "../../../src/common/Layout/DashboardPageContent";
import Table, * as TableComponent from "../../../src/common/Table/Table";

const App = () => {
  const [openSortPop, setOpenSortPop] = useState(false);
  const [filter, setFilter] = useState<getCurrentUserBookingsQueryVariables>({
    isHost: true,
    statuses: [BookingStatusEnum.ACTIVE, BookingStatusEnum.REQUESTED],
    sortBy: "DESC",
  });
  const { data } = getCurrentUserBookings({
    variables: filter,
    ssr: false,
  });

  const bookings = (data?.currentUser?.bookingsConnection.nodes ||
    []) as getCurrentUserBookingsQuery_currentUser_bookingsConnection_nodes[];

  return (
    <DashboardPageContent title="Requests">
      <S.SectionContainer>
        <S.TableHeader>
          <S.Tab>
            <S.TabItem>
              <S.TabButton
                onClick={() => {
                  setFilter({
                    ...filter,
                    statuses: [
                      BookingStatusEnum.ACTIVE,
                      BookingStatusEnum.REQUESTED,
                    ],
                  });
                }}
                active={filter.statuses?.includes(BookingStatusEnum.ACTIVE)}
              >
                Active
              </S.TabButton>
            </S.TabItem>
            <S.TabItem>
              <S.TabButton
                onClick={() => {
                  setFilter({
                    ...filter,
                    statuses: [
                      BookingStatusEnum.COMPLETED,
                      BookingStatusEnum.CANCELLED,
                      BookingStatusEnum.RESCHEDULE_REQUESTED,
                    ],
                  });
                }}
                active={!filter.statuses?.includes(BookingStatusEnum.ACTIVE)}
              >
                Completed
              </S.TabButton>
            </S.TabItem>
          </S.Tab>
          <S.TableHeaderFilter>
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
          </S.TableHeaderFilter>
        </S.TableHeader>
        <Table>
          <TableComponent.TableHeader>
            <TableComponent.TableHeaderColumn flex>
              Title
            </TableComponent.TableHeaderColumn>
            <TableComponent.TableHeaderColumn width={125}>
              Price
            </TableComponent.TableHeaderColumn>
            <TableComponent.TableHeaderColumn width={150}>
              Status
            </TableComponent.TableHeaderColumn>
            <TableComponent.TableHeaderColumn width={180}>
              Expire In
            </TableComponent.TableHeaderColumn>
          </TableComponent.TableHeader>
          <TableComponent.TableBody>
            {bookings.length === 0 && (
              <TableComponent.TableBodyEmpty>
                You don't have any request at the moment.
              </TableComponent.TableBodyEmpty>
            )}
            {bookings.map((booking) => {
              return (
                <Link
                  key={booking.id}
                  href="/dashboard/requests/[id]"
                  as={`/dashboard/requests/${booking.id}`}
                >
                  <div>
                    <TableComponent.TableBodyRow key={booking.id}>
                      <TableComponent.TableBodyRowContent flex>
                        {booking.providableType === "VideoCall" && (
                          <>
                            <S.ServiceName>
                              {booking.service?.name}
                            </S.ServiceName>
                            <S.ServiceDescription>
                              {booking.userFullName} -{" "}
                              {moment(booking.bookingDate).format("ddd, MMM D")}{" "}
                              at {moment(booking.bookingDate).format("h:mm A")}{" "}
                              ({booking?.providable?.duration} mins)
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
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent width={125}>
                        {booking.price > 0 ? `$${booking.price / 100}` : `Free`}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent width={150}>
                        {getHumanizeEnum(booking.status)}
                      </TableComponent.TableBodyRowContent>
                      <TableComponent.TableBodyRowContent width={180}>
                        {moment(booking.createdAt).add(7, "days").fromNow()}
                      </TableComponent.TableBodyRowContent>
                      <ChevronRight
                        size={17}
                        style={{ position: "absolute", right: 10 }}
                      />
                    </TableComponent.TableBodyRow>
                  </div>
                </Link>
              );
            })}
          </TableComponent.TableBody>
        </Table>
      </S.SectionContainer>
    </DashboardPageContent>
  );
};

export default withDashboard({})(App);
