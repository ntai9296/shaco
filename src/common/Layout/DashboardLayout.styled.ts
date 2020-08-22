import styled from "styled-components";
import { mediaBreakpointDown } from "../utility";

export const Layout = styled.div`
  height: 100%;
  min-height: 100%;
`;

export const Content = styled.div<{
  hideSidebar?: boolean;
  noContentPadding?: boolean;
}>`
  min-height: 100%;
  margin-left: ${(props) => !props.hideSidebar && "270px"};
  background: #f2f4f7;

  ${mediaBreakpointDown("md")} {
    margin-left: 0;
  }
`;
