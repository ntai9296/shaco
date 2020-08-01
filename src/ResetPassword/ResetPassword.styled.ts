import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

export const Page = styled.div`
  background-color: rgb(250, 250, 250);
  height: 100%;
`;

export const ResetPasswordLayout = styled.div`
  max-width: 600px;
  margin: auto;
  padding-top: 100px;

  ${mediaBreakpointDown("sm")} {
    padding: 30px 15px;
  }
`;

export const ResetPasswordHeader = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 900;
`;

export const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(229, 227, 221);
  padding: 30px;
  border-radius: ${(props) => props.theme.main.inputBorderRadius};
  background: #fff;

  > form {
    width: 100%;
  }
`;

export const Row = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

export const SubmitRow = styled.div`
  padding-top: 10px;
`;
