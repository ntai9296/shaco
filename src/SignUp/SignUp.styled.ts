import styled from "styled-components";
import { Styling } from "../common/utility";

export const Page = styled.div`
  background-color: rgb(250, 250, 250);
  height: 100%;
`;
export const Layout = styled.div`
  max-width: 600px;
  margin: auto;
  padding-top: 100px;
`;
export const Content = styled.div`
  padding: 30px 30px;
  border-radius: ${Styling.inputBorderRadius};
  background: #fff;
`;
export const Heading = styled.div`
  margin: 0 0 25px 0;
`;
export const Title = styled.h1`
  margin: 0 0 15px 0;
`;
export const SubTitle = styled.p``;
export const SignUpForm = styled.form``;
export const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const FirstNameField = styled.div`
  padding-right: ${Styling.columnPadding};
  flex: 1;
`;
export const LastNameField = styled.div`
  padding-left: ${Styling.columnPadding};
  flex: 1;
`;
export const EmailRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const EmailField = styled.div``;
export const AgreementRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const PasswordRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const PasswordField = styled.div``;
export const CountryRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const CountryField = styled.div``;
export const ErrorRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const SubmitRow = styled.div``;
export const SubmitButtonField = styled.div``;
