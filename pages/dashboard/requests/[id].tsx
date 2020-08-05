import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as SBooking from "../../../src/Dashboard/Request/Request.styled";
import * as S from "../../../src/Dashboard/Request/EditRequest.styled";
import { getCurrentUserBookings } from "../../../graphql/User/UserAPI";
import { getHostBookingQuery_node_Booking } from "../../../graphql/generated";
import { ChevronRight } from "react-feather";
import Link from "next/link";
import { getHostBooking } from "../../../graphql/Booking/BookingAPI";
import Button from "../../../src/common/Button";
import Input from "../../../src/common/Input";

export default () => {
  const router = useRouter();
  console.log(router.query);

  const { data } = getHostBooking({
    skip: !router.query.id,
    variables: {
      id: router.query.id as string,
    },
  });

  console.log(data);

  const node = data?.node as getHostBookingQuery_node_Booking | null;

  if (!node) {
    return null;
  }

  return (
    <DashboardLayout noContentPadding>
      <SBooking.Layout>
        <SBooking.LayoutContainer>
          <SBooking.HeadingContainer>
            <SBooking.Heading>
              <Link href="/dashboard/requests">
                <span style={{ cursor: "pointer" }}>Requests</span>
              </Link>
              <ChevronRight />
              <span>{node.service?.name}</span>
            </SBooking.Heading>
            <div>
              <Button flex={false}>Start call</Button>
            </div>
          </SBooking.HeadingContainer>
          <SBooking.SectionContainer>
            <S.ContentContainer>
              <S.ContentTitle>Basic Details</S.ContentTitle>
              <S.ContentBox>
                <S.Row>
                  <Input label="When" />
                </S.Row>
                <S.Row>
                  <Input label="Who" />
                </S.Row>
                <S.Row>
                  <Input label="Who" />
                </S.Row>
              </S.ContentBox>
            </S.ContentContainer>
          </SBooking.SectionContainer>
        </SBooking.LayoutContainer>
      </SBooking.Layout>
    </DashboardLayout>
  );
};
