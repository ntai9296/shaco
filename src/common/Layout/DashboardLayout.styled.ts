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
  padding: 40px 60px;
  background: #f2f4f7;

  ${(props) =>
    props.noContentPadding &&
    `
    padding: 0;
  `}

  ${mediaBreakpointDown("xs")} {
    padding: 30px 15px;

    ${(props) =>
      props.noContentPadding &&
      `
      padding: 0;
    `}
  }
`;
