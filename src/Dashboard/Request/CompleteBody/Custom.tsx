import React from "react";
import styled from "styled-components";
import { getHostBookingQuery_node_Booking } from "../../../../graphql/generated";
import Textarea from "../../../common/Textarea";

export const Row = styled.div`
  margin-bottom: 15px;
`;

interface Props {
  node: getHostBookingQuery_node_Booking;
}

export default ({ node }: Props) => {
  return (
    <div>
      <Row>
        <Textarea
          label="Request message"
          rows={5}
          readOnly
          value={node.bookingComplete?.message}
        />
      </Row>
    </div>
  );
};
