import styled from "styled-components";
import * as Utility from "../common/utility";

export const Body = styled.div`
  color: ${Utility.Styling.textColor};
  background-color: rgb(255, 255, 255);
`;

export const Main = styled.div`
  width: 100%;
  min-height: 75vh;
  margin-bottom: 250px;
`;

export const TitleContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 25px auto;
  padding: 45px 0 0 0;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 24px;
`;
