import React from "react";
import styled from "styled-components";
import { getHostBookingQuery_node_Booking } from "../../../../graphql/generated";

export const Row = styled.div`
  margin-bottom: 15px;
`;

export const BookingMessageContainer = styled.div`
  padding: 15px;
  border-radius: 6px;
  background: #f2f4f7;
  width: 100%;
  margin-bottom: 20px;
  white-space: break-spaces;
`;

const AttachmentList = styled.div`
  margin-top: 15px;

  > b {
    margin-bottom: 5px;
  }

  > div {
    margin-top: 7px;
  }
`;

interface Props {
  node: getHostBookingQuery_node_Booking;
}

export default ({ node }: Props) => {

  const attachments = node.bookingComplete?.attachments || [];

  return (
    <div>
      <Row>
        <BookingMessageContainer>
          {node.bookingComplete?.message}

          {attachments.length > 0 && (
            <AttachmentList>
              <b>Attachments</b>
              {attachments.map((link) => {
                return (
                  <div key={link}>
                    <a target="_blank" href={link}>
                      {link}
                    </a>
                  </div>
                );
              })}
            </AttachmentList>
          )}
        </BookingMessageContainer>
      </Row>
    </div>
  );
};
