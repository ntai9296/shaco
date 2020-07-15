import styled from "styled-components";
import { Styling } from "../common/utility";

export const GoBack = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: ${Styling.textColor};

  > svg {
    margin-right: 8px;
  }
`;
export const Layout = styled.div``;
export const TopNav = styled.div`
  align-items: center;
  background-color: rgb(255, 255, 255);
  display: flex;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgb(229, 227, 221);
  padding: 12px 16px;
  justify-content: space-between;
  z-index: 100;
`;
export const Body = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 64px 16px 64px 16px;
`;
export const TopNavLeft = styled.div``;
export const TopNavRight = styled.div`
  display: flex;
  align-items: center;
`;
export const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  border-bottom: 1px solid rgb(229, 227, 221);
`;
export const Tab = styled.div<{ active?: boolean }>`
  padding-left: 40px;

  > div {
    padding-bottom: 16px;
    ${(props) =>
      props.active &&
      `
        margin-bottom: -1px;
        border-bottom: 1px solid rgb(36, 30, 18);
      `}
  }

  a {
    color: rgb(106, 103, 95);
    font-weight: 500;

    :hover {
      text-decoration: underline;
    }

    ${(props) =>
      props.active &&
      `

    color: ${Styling.textColor};

    `}
  }
`;
export const PreviewLink = styled.div`
  color: ${Styling.textColor};
  margin-right: 15px;
  font-size: 16px;
  text-decoration: underline;
  display: flex;
  align-items: center;

  > svg {
    margin-right: 8px;
  }
`;

export const Content = styled.div``;
export const ContentTitle = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 32px;
`;
export const ContentSubTitle = styled.p`
  text-align: center;
  margin: 8px 0;
  font-size: 16px;
  color: rgb(106, 103, 95);
`;
export const BasicBody = styled.div``;