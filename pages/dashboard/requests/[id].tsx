import React from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as S from "../../../src/Dashboard/Request/EditRequest.styled";
import {
  getHostBookingQuery_node_Booking,
  getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes,
} from "../../../graphql/generated";
import {
  ChevronRight,
  MoreVertical,
  User,
  Calendar,
  Clock,
} from "react-feather";
import Link from "next/link";
import { getHostBooking } from "../../../graphql/Booking/BookingAPI";
import Button from "../../../src/common/Button";
import Input from "../../../src/common/Input";
import Textarea from "../../../src/common/Textarea";

export default () => {
  const router = useRouter();

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

  const bookingQuestions = (node.bookingQuestionsConnection.nodes ||
    []) as getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes[];

  return (
    <DashboardLayout noContentPadding>
      <S.Layout>
        <S.LayoutContainer>
          <S.HeadingContainer>
            <S.Heading>
              <Link href="/dashboard/requests">
                <span style={{ cursor: "pointer" }}>Requests</span>
              </Link>
              <ChevronRight />
              <span>{node.service?.name}</span>
            </S.Heading>
            <S.BookingSubHeading>
              <S.SubHeadingLeft>
                <div>
                  <S.StatusLabel>{node.status}</S.StatusLabel>
                </div>
                <div>
                  <User size={20} /> Tai Nguyen
                </div>
                {node.providableType === "VideoCall" && (
                  <>
                    <div>
                      <Calendar size={20} />{" "}
                      {moment(node.bookingDate).format("ddd, MMM D")}
                    </div>
                    <div>
                      <Clock size={20} />
                      {moment(node.bookingDate).format("h:mm A")}{" > "}
                      {moment(node.bookingDate)
                        .add(node?.providable?.duration, "minutes")
                        .format("h:mm A")}{" "}
                      ({node?.providable?.duration} mins)
                    </div>
                  </>
                )}
              </S.SubHeadingLeft>
              <S.SubHeadingRight>
                <S.MoreButton>
                  <MoreVertical size={20} />
                </S.MoreButton>
                <Button>Start Call</Button>
              </S.SubHeadingRight>
            </S.BookingSubHeading>
          </S.HeadingContainer>

          <S.SectionContainer>
            <S.ContentContainer>
              <S.ContentBox>
                {bookingQuestions.map((bookingQuestion) => {
                  return (
                    <S.Row key={bookingQuestion.id}>
                      <Textarea
                        readOnly
                        rows={3}
                        label={bookingQuestion.question}
                        value={bookingQuestion.answer}
                      />
                    </S.Row>
                  );
                })}
              </S.ContentBox>
            </S.ContentContainer>
          </S.SectionContainer>
        </S.LayoutContainer>
      </S.Layout>
    </DashboardLayout>
  );
};
