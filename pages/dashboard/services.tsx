import React from "react";
import Head from "next/head";
import Router from "next/router";
import DashboardLayout from "../../src/common/Layout/DashboardLayout";
import * as UserAPI from "../../graphql/User/UserAPI";
import * as S from "../../src/Service/Service.styled";
import ServiceList from '../../src/Service/ServiceList';

export default () => {
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
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <S.ServiceContainer>
        <S.Heading>Services</S.Heading>
        <S.HeadingInfo>
          Connect your calendar to let Fireside know when you're available and
          update your calendar as bookings are scheduled.
        </S.HeadingInfo>
        <ServiceList />
      </S.ServiceContainer>
    </DashboardLayout>
  );
};
