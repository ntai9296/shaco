import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
import Link from "next/link";
import moment from "moment-timezone";
import * as S from "../../src/Availability/Availability.styled";
import * as UserAPI from "../../graphql/User/UserAPI";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";

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
      <S.Layout>
        <S.Heading>Availability</S.Heading>
        <S.TimezoneInfo>
          We only allow bookings within your availability that you set below.
        </S.TimezoneInfo>
        <S.Timezone>
          Your timezone: {userData.currentUser.timezone}{" "}
          {moment.tz(userData.currentUser.timezone).format("(h:mm A)")}{" "}
          <Link href="/dashboard/setting">
            <a>Change</a>
          </Link>
        </S.Timezone>
        <S.Calendar>
          <Calendar />
        </S.Calendar>
      </S.Layout>
    </DashboardLayout>
  );
};

export default Availability;
