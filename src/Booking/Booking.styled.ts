import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

export const BookingConfirmationContainer = styled.div`
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
  border-radius: ${(props) => props.theme.main.inputBorderRadius};
`;

export const ProfilePicture = styled.div`
  margin-bottom: 10px;
  > img {
    max-width: 65px;
    max-height: 65px;
    border-radius: 50%;
  }
`;
export const ProfileName = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;
export const BookingDetails = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
`;
export const BookingEmailMessage = styled.p`
  text-align: center;
  max-width: 80%;
  margin: 0 auto 20px auto;
`;
export const BookingNewDateTime = styled.p`
  text-align: center;
  max-width: 80%;
  margin: 0 auto 20px auto;
  font-size: 17px;
  font-weight: 500;
`;

export const ConfirmRescheduleButtonContainer = styled.div`
  margin-top: 15px;
`;
