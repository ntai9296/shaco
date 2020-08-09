import React, { useState } from "react";
import styled from "styled-components";
import { Styling } from "../../../common/utility";
import { CommonButton } from "../../../common/Button";
import {
  getHostBookingZoomStartURL,
  requestRescheduleBooking,
  cancelBooking,
} from "../../../../graphql/Booking/BookingAPI";
import {
  getHostBookingQuery_node_Booking,
  BookingStatusEnum,
} from "../../../../graphql/generated";
import Modal from "../../../common/Modal";
import Textarea from "../../../common/Textarea";

export const DangerButton = styled(CommonButton)<{
  background?: string;
  color?: string;
}>`
  background: ${(props) => (props.background ? props.background : "#fff")};
  color: ${(props) => (props.color ? props.color : Styling.dangerColor)};
`;

export const RescheduleButton = styled(CommonButton)`
  color: ${Styling.blueColor};
  background: #fff;
`;

export const PrimaryButton = styled(CommonButton)`
  color: #fff;
  background: ${Styling.primaryColor};
`;

export const Virtual1on1 = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > button {
    margin-right: 8px;
  }
`;

export const Row = styled.div`
  margin-bottom: 15px;
`;

export const Field = styled.div``;

export default ({ node }: { node: getHostBookingQuery_node_Booking }) => {
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [messageToUser, setMessageToUser] = useState("");
  const [
    getZoomStartURL,
    { loading: getZoomStartURLLoading },
  ] = getHostBookingZoomStartURL({
    fetchPolicy: "network-only",
    onCompleted: (data: any) => {
      window.location.href = data.node.providable.zoomStartUrl;
    },
  });

  const [
    requestReschedule,
    { loading: requestRescheduleLoading },
  ] = requestRescheduleBooking({
    onCompleted: () => {
      setRescheduleModal(false);
      setMessageToUser("");
    },
  });

  const [
    requestCancelBooking,
    { loading: requestCancelBookingLoading },
  ] = cancelBooking({
  });

  return (
    <Virtual1on1>
      {node.status === BookingStatusEnum.RESCHEDULE_REQUESTED ? (
        <DangerButton
          color="#fff"
          background={Styling.dangerColor}
          flex={false}
          isLoading={requestCancelBookingLoading}
          onClick={() => setDeclineModal(true)}
        >
          Decline
        </DangerButton>
      ) : (
        <>
          <PrimaryButton
            flex={false}
            isLoading={getZoomStartURLLoading}
            onClick={() => {
              getZoomStartURL({
                variables: {
                  id: node.id,
                },
              });
            }}
          >
            Start call
          </PrimaryButton>
          <RescheduleButton
            flex={false}
            isLoading={getZoomStartURLLoading}
            onClick={() => setRescheduleModal(true)}
          >
            Ask to reschedule
          </RescheduleButton>
          <DangerButton
            flex={false}
            isLoading={getZoomStartURLLoading}
            onClick={() => setDeclineModal(true)}
          >
            Decline
          </DangerButton>
        </>
      )}

      <Modal
        title="Ask to reschedule"
        isOpen={rescheduleModal}
        onClose={() => setRescheduleModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestReschedule({
              variables: {
                input: {
                  bookingId: node.id,
                  messageToUser,
                },
              },
            });
          }}
        >
          <Row>
            <Field>
              <Textarea
                value={messageToUser}
                onChange={(e) => setMessageToUser(e.target.value)}
                rows={5}
                label={`Send a personal message to ${node.userFullName} (Optional)`}
              />
            </Field>
          </Row>
          <div>
            <PrimaryButton
              type="submit"
              isLoading={requestRescheduleLoading}
              flex={true}
            >
              Ask to reschedule
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal
        title="Decline request"
        isOpen={declineModal}
        onClose={() => setDeclineModal(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestCancelBooking({
              variables: {
                input: {
                  bookingId: node.id,
                  message: messageToUser,
                },
              },
            });
          }}
        >
          <Row>
            <Field>
              <Textarea
                value={messageToUser}
                onChange={(e) => setMessageToUser(e.target.value)}
                rows={5}
                label={`Send a personal message to ${node.userFullName} (Optional)`}
              />
            </Field>
          </Row>
          <div>
            <PrimaryButton
              type="submit"
              isLoading={requestCancelBookingLoading}
              flex={true}
            >
              Submit
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </Virtual1on1>
  );
};
