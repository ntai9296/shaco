import React from "react";
import styled from "styled-components";
import { Styling } from "./utility";
import CloseIcon from "./CloseIcon";

interface Props {
  type?: "error" | "success" | "info";
  notifications: string[];
  onClose?: () => void;
}

const Notification = styled.div<{ errorType: "error" | "success" | "info" }>`
  background-color: #fff;
  border-radius: 4px;
  padding: 13px 40px 13px 16px;
  position: relative;

  ${(props) =>
    props.errorType === "error" &&
    `
  color: #fff;
  background: ${Styling.dangerColor};
  
  `}
`;

const NotificationItem = styled.div`
  margin-bottom: 7px;

  :last-child {
    margin: 0;
  }
`;

export default ({ type = "info", notifications, onClose }: Props) => (
  <Notification errorType={type}>
    {onClose && <CloseIcon onClick={onClose} />}
    {notifications.map((notification, idx) => (
      <NotificationItem key={idx}>{notification}</NotificationItem>
    ))}
  </Notification>
);
