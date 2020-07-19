import styled from "styled-components";
import * as Utility from "../common/utility";

export const Layout = styled.div`
  min-height: 100vh;
  background: #fafafb;

  ${Utility.mediaBreakpointUp("lg")} {
    :before {
      height: 100%;
      width: 50%;
      position: fixed;
      content: " ";
      top: 0;
      right: 0;
      background: #fff;
      -webkit-animation: enter-background-shadow 0.6s;
      animation: enter-background-shadow 0.6s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-transform-origin: right;
      -ms-transform-origin: right;
      transform-origin: right;
      box-shadow: 0 0px 14px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.01);
    }
  }
`;

export const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 100px;
  justify-content: space-between;
  max-width: 920px;
  margin: 0 auto;

  ${Utility.mediaBreakpointDown("md")} {
    padding-top: 16px;
    flex-direction: column;
  }
`;

export const LayoutInfo = styled.div`
  width: 380px;
  margin: 0 auto;
  ${Utility.mediaBreakpointDown("lg")} {
    padding: 0 16px 16px;
    flex-basis: 100%;
    max-width: 380px;
  }
  ${Utility.mediaBreakpointDown("xs")} {
    width: 100%;
  }
`;

export const LayoutAction = styled.div`
  z-index: 1;
  width: 380px;
  margin: 0 auto;
  ${Utility.mediaBreakpointDown("lg")} {
    flex-basis: 100%;
    padding: 0 16px 16px;
    padding-top: 24px;
    max-width: 380px;
  }
  ${Utility.mediaBreakpointDown("xs")} {
    width: 100%;
  }
`;
