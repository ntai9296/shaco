import styled from "styled-components";
import { setLightness } from "polished";

export const CheckoutContainer = styled.div``;
export const CalendarLeft = styled.div``;
export const CalendarTimezone = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 15px;
  margin-top: 15px;
`;
export const CheckoutDate = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 0px;
`;
export const CalendarContainer = styled.div`
  margin-bottom: 15px;
  flex-direction: column;
  display: flex;
`;

export const BookingDate = styled.div`
  font-weight: 500;
  font-size: 15px;
  a {
    color: ${(props) => props.theme.main.primaryColor};
    cursor: pointer;
  }
`;

export const CalendarTimeList = styled.div``;

export const CalendarTimes = styled.div`
  margin-top: 15px;
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
`;
export const CalendarTime = styled.div`
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 7px;
  margin-right: 7px;
  ${(props) =>
    props.theme.main &&
    `
  user-select: none;
  font-weight: 500;
  border: 1px solid ${setLightness(0.85, props.theme.main.primaryColor)};
  color: ${props.theme.main.primaryColor};
  background-color: ${setLightness(0.95, props.theme.main.primaryColor)};
  `};
`;
