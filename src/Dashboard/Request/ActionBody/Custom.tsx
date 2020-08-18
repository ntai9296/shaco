import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  Styling,
  showWorkingOverlay,
  hideWorkingOverlay,
  uploadToS3,
  showPageNotice,
} from "../../../common/utility";
import { CommonButton } from "../../../common/Button";
import {
  cancelBooking,
  createBookingComplete,
  acceptBookingRequest,
} from "../../../../graphql/Booking/BookingAPI";
import {
  getHostBookingQuery_node_Booking,
  CreateBookingCompleteInput,
  BookingStatusEnum,
} from "../../../../graphql/generated";
import Modal from "../../../common/Modal";
import Textarea from "../../../common/Textarea";
import { X } from "react-feather";

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

export const AttachmentList = styled.div``;
export const AttachmentItem = styled.div`
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const AttachmentName = styled.div`
  flex: 1;
`;
export const AttachmentDelete = styled.div`
  cursor: pointer;
`;
export const Button = styled.button`
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 8px;
`;

export const Field = styled.div``;

export default ({ node }: { node: getHostBookingQuery_node_Booking }) => {
  const uploadRef = useRef<any>();
  const [completeForm, setCompleteForm] = useState<CreateBookingCompleteInput>({
    message: "",
    attachments: [],
    bookingId: node.id,
  });
  const [declineModal, setDeclineModal] = useState(false);
  const [messageToUser, setMessageToUser] = useState("");

  const [
    requestCancelBooking,
    { loading: requestCancelBookingLoading },
  ] = cancelBooking({
    onError: (error) => {
      showPageNotice(error.message, "error");
    },
  });

  const [
    requestAcceptBookingRequest,
    { loading: requestAcceptBookingRequestLoading },
  ] = acceptBookingRequest({
    onError: (error) => {
      showPageNotice(error.message, "error");
    },
    onCompleted: () => {
      showPageNotice("Request accepted.", "success");
    },
  });

  const [
    requestCreateBookingComplete,
    { loading: requestCreateBookingCompleteLoading },
  ] = createBookingComplete({
    onError: (error) => {
      showPageNotice(error.message, "error");
    },
  });

  const onRenderContent = () => {
    switch (node.status) {
      case BookingStatusEnum.REQUESTED:
        return (
          <div>
            <PrimaryButton
              onClick={() =>
                requestAcceptBookingRequest({
                  variables: {
                    input: {
                      bookingId: node.id,
                    },
                  },
                })
              }
              flex={false}
              isLoading={requestAcceptBookingRequestLoading}
            >
              Accept Request
            </PrimaryButton>

            <DangerButton
              type="button"
              flex={false}
              onClick={() => setDeclineModal(true)}
            >
              Decline
            </DangerButton>
          </div>
        );
      default:
        return (
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
                label="Message"
                placeholder="Enter your message"
              />
            </Row>
            <Row>
              <AttachmentList>
                {completeForm.attachments.map((attachment, index) => {
                  return (
                    <AttachmentItem key={attachment}>
                      <AttachmentName>{attachment}</AttachmentName>
                      <AttachmentDelete
                        onClick={() =>
                          setCompleteForm({
                            ...completeForm,
                            attachments: completeForm.attachments.filter(
                              (item, idx) => idx !== index
                            ),
                          })
                        }
                      >
                        <X size={20} />
                      </AttachmentDelete>
                    </AttachmentItem>
                  );
                })}
              </AttachmentList>
              <Button
                type="button"
                onClick={() => uploadRef.current && uploadRef.current.click()}
              >
                Add files
              </Button>
              <input
                style={{ display: "none" }}
                ref={uploadRef}
                onChange={(e: any) => {
                  showWorkingOverlay();
                  try {
                    Promise.all(
                      [...e.target.files].map((file) => {
                        return uploadToS3(file);
                      })
                    ).then((results) => {
                      setCompleteForm((completeForm) => ({
                        ...completeForm,
                        attachments: [
                          ...completeForm.attachments,
                          ...results.map((res) => res.Location),
                        ],
                      }));
                      hideWorkingOverlay();
                    });
                  } catch (error) {
                    alert(error.message);
                    hideWorkingOverlay();
                  }
                }}
                type="file"
                multiple={true}
              />
            </Row>

            <div>
              <PrimaryButton
                type="submit"
                flex={false}
                isLoading={requestCreateBookingCompleteLoading}
              >
                Send Response
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
        );
    }
  };

  return (
    <CustomContainer>
      {onRenderContent()}

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
    </CustomContainer>
  );
};
