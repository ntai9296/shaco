import styled from "styled-components";
import { setLightness } from "polished";

export const CalendarContainer = styled.div`
  max-width: 600px;
`;
export const Heading = styled.h1`
  margin: 0 0 25px 0;
`;
export const HeadingInfo = styled.p`
  font-weight: 500;
`;
export const Description = styled.p`
  color: ${(props) => setLightness(0.5, props.theme.main.textColor)};
  margin-bottom: 25px;
`;