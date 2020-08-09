import React, { useState } from "react";
import styled from "styled-components";
import { Styling } from "../../../common/utility";
import { CommonButton } from "../../../common/Button";
import {
  cancelBooking,
  createBookingComplete,
} from "../../../../graphql/Booking/BookingAPI";
import {
  getHostBookingQuery_node_Booking,
  CreateBookingCompleteInput,
} from "../../../../graphql/generated";
import Modal from "../../../common/Modal";
import Textarea from "../../../common/Textarea";
import Notification from "../../../common/Notification";

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

export const CustomContainer = styled.div``;

export const Row = styled.div`
  margin-bottom: 15px;
`;

export const Field = styled.div``;

export default ({ node }: { node: getHostBookingQuery_node_Booking }) => {
  const [completeForm, setCompleteForm] = useState<CreateBookingCompleteInput>({
    message: "",
    attachments: [],
    bookingId: node.id,
  });
  const [declineModal, setDeclineModal] = useState(false);
  const [messageToUser, setMessageToUser] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const [
    requestCancelBooking,
    { loading: requestCancelBookingLoading },
  ] = cancelBooking({
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  const [
    requestCreateBookingComplete,
    { loading: requestCreateBookingCompleteLoading },
  ] = createBookingComplete({
    onCompleted: () => {
      setErrors([]);
    },
    onError: (error) => {
      setErrors([error.message]);
    },
  });

  return (
    <CustomContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestCreateBookingComplete({
            variables: {
              input: completeForm,
            },
          });
        }}
      >
        <Row>
          <Textarea
            onChange={(e) =>
              setCompleteForm({ ...completeForm, message: e.target.value })
            }
            value={completeForm.message}
            rows={6}
            label="Request message"
            placeholder="Required"
          />
        </Row>

        {errors.length > 0 && (
          <Row>
            <Notification
              type="error"
              notifications={errors}
              onClose={() => setErrors([])}
            />
          </Row>
        )}

        <div>
          <PrimaryButton
            type="submit"
            flex={false}
            isLoading={requestCreateBookingCompleteLoading}
          >
            Submit
          </PrimaryButton>

          <DangerButton
            type="button"
            flex={false}
            onClick={() => setDeclineModal(true)}
          >
            Decline
          </DangerButton>
        </div>
      </form>

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
    </CustomContainer>
  );
};
