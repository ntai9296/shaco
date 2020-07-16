import styled from "styled-components";
import * as Utility from "../../../src/common/utility";

export const BannerContainer = styled.div`
  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

  ${Utility.mediaBreakpointDown("sm")} {
    margin: 0 0 2.5rem 0;
  }
  ${Utility.mediaBreakpointUp("sm")} {
    margin: 0 0 4rem 0;
  }

`;

export const Banner = styled.div<{ backgroundURL: string }>`
  background-size: cover;
  height: 25vw;
  width: 100%;
  align-items: flex-end;
  display: flex;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.backgroundURL});

  ${Utility.mediaBreakpointDown("xs")} {
    height: 30vw;
  }

  > div {
    transform: translateY(35%);
    position: relative;
    margin: 0px auto;

    ${Utility.mediaBreakpointDown("xs")} {
      transform: translateY(30%);
    }
  }
`;

export const BannerImage = styled.div<{ avatarURL: string }>`
  display: block;
  background-clip: padding-box;
  background-image: url(${(props) => props.avatarURL});
  background-size: cover;

  border-width: 4px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  width: 128px;
  height: 128px;

  ${Utility.mediaBreakpointDown("xs")} {
    width: 88px;
    height: 88px;
  }
`;
