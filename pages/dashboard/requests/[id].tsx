import React from "react";
import Head from "next/head";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DashboardLayout from "../../../src/common/Layout/DashboardLayout";
import * as S from "../../../src/Dashboard/Request/EditRequest.styled";
import {
  getHostBookingQuery_node_Booking,
  getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes,
  ServiceTypeEnum,
  BookingStatusEnum,
} from "../../../graphql/generated";
import { ChevronRight, Calendar, Clock, CreditCard } from "react-feather";
import Link from "next/link";
import { getHostBooking } from "../../../graphql/Booking/BookingAPI";
import Textarea from "../../../src/common/Textarea";
import Input from "../../../src/common/Input";
import VirtualOneOnOne from "../../../src/Dashboard/Request/ActionBody/VirtualOneOnOne";
import Custom from "../../../src/Dashboard/Request/ActionBody/Custom";
import CustomCompleteResult from "../../../src/Dashboard/Request/CompleteBody/Custom";
import Notification from "../../../src/common/Notification";
import { getHumanizeEnum } from "../../../src/common/utility";

export default () => {
  const router = useRouter();

  const { data } = getHostBooking({
    skip: !router.query.id,
    variables: {
      id: router.query.id as string,
    },
  });

  const node = data?.node as getHostBookingQuery_node_Booking | null;

  if (!node) {
    return null;
  }

  const renderActionBody = () => {
    switch (node.service?.serviceType) {
      case ServiceTypeEnum.VIRTUAL_ONE_ON_ONE:
        return <VirtualOneOnOne node={node} />;
      default:
        return <Custom node={node} />;
    }
  };

  const renderSubHeading = () => {
    switch (node.service?.serviceType) {
      case ServiceTypeEnum.VIRTUAL_ONE_ON_ONE:
        return (
          <>
            {node.status !== BookingStatusEnum.CANCELLED && (
              <div>
                <CreditCard size={20} />{" "}
                {node.price > 0 ? `$${node.price / 100}` : "Free"}
              </div>
            )}
            {node.status === BookingStatusEnum.RESCHEDULE_REQUESTED && (
              <div>
                <Calendar size={20} /> Reschedule requested
              </div>
            )}
            {[BookingStatusEnum.ACTIVE, BookingStatusEnum.COMPLETED].includes(
              node.status
            ) && (
              <>
                <div>
                  <Calendar size={20} />{" "}
                  {moment(node.bookingDate).format("ddd, MMM D")}
                </div>
                <div>
                  <Clock size={20} />
                  {moment(node.bookingDate).format("h:mm A")}
                  {" > "}
                  {moment(node.bookingDate)
                    .add(node?.providable?.duration, "minutes")
                    .format("h:mm A")}{" "}
                  ({node?.providable?.duration} mins)
                </div>
              </>
            )}
          </>
        );
      default:
        return (
          <>
            {node.status !== BookingStatusEnum.CANCELLED && (
              <div>
                <CreditCard size={20} />{" "}
                {node.price > 0 ? `$${node.price / 100}` : "Free"}
              </div>
            )}
          </>
        );
    }
  };

  const renderResultsBody = () => {
    switch (node.service?.serviceType) {
      case ServiceTypeEnum.VIRTUAL_ONE_ON_ONE:
        return null;
      default:
        return <CustomCompleteResult node={node} />;
    }
  };

  const bookingQuestions = (node.bookingQuestionsConnection.nodes ||
    []) as getHostBookingQuery_node_Booking_bookingQuestionsConnection_nodes[];

  return (
    <DashboardLayout noContentPadding>
      <Head>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.713.0.min.js"></script>
      </Head>
      <S.Layout>
        <S.LayoutContainer>
          <S.HeadingContainer>
            <S.Heading>
              <Link href="/dashboard/requests">
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Requests
                </span>
              </Link>
              <ChevronRight />
              <span>{node.service?.name} </span>
              <S.StatusLabel>{getHumanizeEnum(node.status)}</S.StatusLabel>
            </S.Heading>
            <S.BookingSubHeading>
              <S.SubHeadingLeft>{renderSubHeading()}</S.SubHeadingLeft>
            </S.BookingSubHeading>
          </S.HeadingContainer>

          {node.status === BookingStatusEnum.CANCELLED && (
            <S.SectionContainer>
              <S.ContentContainer>
                <Notification
                  type="success"
                  notifications={[
                    `We have sent an email to ${node.userFullName} letting them know the request is cancelled. No action is required from you.`,
                  ]}
                />
              </S.ContentContainer>
            </S.SectionContainer>
          )}

          <S.SectionContainer>
            <S.ContentContainer>
              <S.ContentBox>
                <h4>Request Information</h4>
                <S.Row>
                  <Input readOnly label="Full name" value={node.userFullName} />
                </S.Row>
                <S.Row>
                  <Input readOnly label="Email" value={node.userEmail} />
                </S.Row>
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

          {![BookingStatusEnum.CANCELLED, BookingStatusEnum.COMPLETED].includes(
            node.status
          ) && (
            <S.SectionContainer>
              <S.ContentContainer>
                <S.ContentBox>
                  <h4>Request Response</h4>
                  <S.ActionBody>{renderActionBody()}</S.ActionBody>
                </S.ContentBox>
              </S.ContentContainer>
            </S.SectionContainer>
          )}

          {BookingStatusEnum.COMPLETED === node.status &&
            node.service?.serviceType !==
              ServiceTypeEnum.VIRTUAL_ONE_ON_ONE && (
              <S.SectionContainer>
                <S.ContentContainer>
                  <S.ContentBox>
                    <h4>Response</h4>
                    <S.ActionBody>{renderResultsBody()}</S.ActionBody>
                  </S.ContentBox>
                </S.ContentContainer>
              </S.SectionContainer>
            )}
        </S.LayoutContainer>
      </S.Layout>
    </DashboardLayout>
  );
};
