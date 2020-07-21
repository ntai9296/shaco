import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

export const ResetPasswordLayout = styled.div`
  padding-top: 100px;

  ${mediaBreakpointDown("sm")} {
    padding: 30px 15px;
  }
`;

export const ResetPasswordHeader = styled.h2`
  text-align: center;
  font-size: 28px;
`;

export const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  border: 1px solid rgb(229, 227, 221);
  padding: 30px;
  border-radius: ${(props) => props.theme.main.inputBorderRadius};

  > form {
    width: 100%;
  }
`;

export const Row = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;
