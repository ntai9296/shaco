import styled from "styled-components";
import ReactModal from "react-modal";
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

  ${Utility.mediaBreakpointUp("md")} {
    height: 20vw;
  }

  > div {
    transform: translateY(35%);
    position: relative;
    margin: 0px auto;
    position: relative;

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
  position: relative;
  background-color: #fff;

  ${Utility.mediaBreakpointDown("xs")} {
    width: 88px;
    height: 88px;
  }
`;

export const PlayIntroOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  z-index: 99;
  cursor: pointer;
`;

export const Modal = styled(ReactModal)<{ maxWidth?: number }>`
  margin: auto;
  background: transparent;
  z-index: 101;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-conten: center;
  height: 100%;

  > div {
    margin: auto;
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  video {
    border-radius: 5px;
  }
`;

export const OverlayContainer = styled.span`
  cursor: pointer;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const ExitPlayer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PlayerControl = styled.div`
  padding: 10px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
