import styled from "styled-components";
import Button from "../common/Button";
import { mediaBreakpointDown } from "../common/utility";

export const Body = styled.div`
  background: rgb(242, 244, 247);
  min-height: 100vh;
  position: relative;

  ${mediaBreakpointDown("md")} {
    background: #fff;
  }
`;
export const Main = styled.main`
  position: relative;
  padding: 64px 0;
  ${mediaBreakpointDown("md")} {
    padding: 64px 0 0 0;
  }
`;

export const Header = styled.header`
  height: 66vh;
  max-height: inherit;
  min-height: 500px;
  overflow: hidden;
  position: absolute;
  top: 61px;
  width: 100%;
  z-index: -1;
`;

export const BgImage = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100%;
  filter: blur(50px) brightness(0.9);
`;

export const Panel = styled.div`
  max-width: 900px;
  margin: 50px auto;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);

  ${mediaBreakpointDown("md")} {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    max-width: 1000px;
    padding-bottom: 40px;

  }
  ${mediaBreakpointDown("xs")} {
      padding-bottom: 80px;
  }
`;

export const PanelHero = styled.div`
  position: relative;
`;
export const PanelHeroImage = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 300px;

  ${mediaBreakpointDown("xs")} {
    height: 230px;
  }
`;
export const PanelHeader = styled.div`
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(229, 239, 245);
  align-items: center;

  ${mediaBreakpointDown("sm")} {
    align-items: flex-start;
  }
  ${mediaBreakpointDown("xs")} {
    padding: 20px 15px;
  }
`;
export const PanelHeaderInfo = styled.div`
  flex: 1;
  padding-right: 20px;

  ${mediaBreakpointDown("xs")} {
    padding-right: 0;
  }
  > h3 {
    font-weight: 700;
    font-size: 24px;
    margin: 0px 0px 11px;
  }
`;
export const HostInfoContainer = styled.div`
  display: flex;
  > div {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
export const HostAvatar = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;

export const PanelHeaderAction = styled.div`
  ${mediaBreakpointDown("xs")} {
    display: none;
  }
`;
export const PanelHeaderActionPrice = styled.h5`
  font-weight: 700;
  margin: 0 0 10px 0;
  font-size: 20px;
  text-align: right;
`;
export const SelectButton = styled(Button)`
  border-radius: 25px;
  font-weight: 700;
`;
export const PanelBody = styled.div`
  padding: 20px 30px;

  ${mediaBreakpointDown("xs")} {
    padding: 20px 15px;
  }
`;

export const PanelBodyHeading = styled.h3`
  margin: 0 0 15px 0;
`;

export const PanelBodyDescription = styled.p`
  white-space: break-spaces;
`;

export const PanelHostAvatar = styled.div`
  margin-bottom: 15px;
`;

export const MoreServiceTextContainer = styled.div`
  margin-top: 30px;
`;

export const MoreServiceText = styled.a`
  cursor: pointer;
  text-decoration: underline;
  font-weight: 500;
  color: ${(props) => props.theme.primaryColor};
`;

export const CheckoutPanel = styled.div`
  position: fixed;
  display: none;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 10px 20px;
  bottom: 0;
  background: #fff;
  justify-content: space-between;
  align-items: center;

  ${mediaBreakpointDown("xs")} {
    display: flex;
    padding: 15px;
  }
`;

export const CheckoutPanelPrice = styled.h3`
  font-weight: 700;
  margin: 0;
  font-size: 20px;
`;

export const CheckoutButton = styled(Button)`
  border-radius: 25px;
  font-weight: 700;
  width: auto;
`;
