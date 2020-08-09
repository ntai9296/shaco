import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

export const BookingCompleteContainer = styled.div`
  padding-top: 100px;

  ${mediaBreakpointDown("sm")} {
    padding: 30px 15px;
  }
`;

export const ConfirmationHeader = styled.h2`
  text-align: center;
  font-size: 28px;
`;

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  border: 1px solid rgb(229, 227, 221);
  padding: 30px;
  border-radius: ${(props) => props.theme.inputBorderRadius};
`;

export const HostProfileAvatar = styled.div<{ src?: string | null }>`
  margin-bottom: 10px;
  display: block;
  background-clip: padding-box;
  background-image: url(${(props) => props.src});
  background-size: cover;
  width: 85px;
  height: 85px;
  position: relative;
  background-color: rgb(242, 244, 247);
  border-width: 4px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
`;
export const HostProfileName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const BookingMessageContainer = styled.div`
  padding: 15px;
  border-radius: 6px;
  background: #f2f4f7;
  width: 100%;
  margin-bottom: 20px;
  white-space: break-spaces;
`;
export const ServiceName = styled.p`
  text-align: center;
  max-width: 80%;
  margin: 0 auto 10px auto;
  font-size: 15px;
  font-weight: 500;
`;

export const AttachmentList = styled.div`
  margin-top: 15px;

  > b {
    margin-bottom: 5px;
  }

  > div {
    margin-top: 7px;
  }
`;
