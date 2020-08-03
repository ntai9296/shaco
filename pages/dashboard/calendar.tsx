import React from "react";
import Router from "next/router";
import * as S from "../../src/Calendar/Calendar.styled";
import * as UserAPI from "../../graphql/User/UserAPI";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import dynamic from "next/dynamic";

const ConnectCalendarList = dynamic(
  () => import("../../src/Calendar/ConnectCalendarList"),
  { ssr: false }
);

const Calendar = dynamic(() => import("../../src/Availability/Calendar"), {
  ssr: false,
});

const Availability = () => {
  const { data: userData, loading } = UserAPI.getCurrentUser();

  if (loading) {
    return null;
  }

  if (!userData?.currentUser) {
    Router.replace("/login");
    return null;
  }

  return (
    <DashboardLayout>
      <S.CalendarContainer>
        <S.Heading>Calendar (1:1 Virtual Meet Ups Only)</S.Heading>
        <S.HeadingInfo>
          Connect your calendar to let Fireside know when you're available and
          update your calendar as bookings are scheduled.
        </S.HeadingInfo>
        <ConnectCalendarList />
      </S.CalendarContainer>
      <div>
      <Calendar />
      </div>
    </DashboardLayout>
  );
};

export default Availability;
