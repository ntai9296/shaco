import styled from "styled-components";
import * as Utility from "../common/utility";

export const Body = styled.div`
  color: ${Utility.Styling.textColor};
  background-color: rgb(255, 255, 255);
`;

export const Main = styled.div`
  width: 100%;
  min-height: 75vh;
  padding-bottom: 150px;
`;

export const TitleContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 45px auto;
`;
export const Title = styled.h3`
  margin: 0 0 10px 0;
  font-size: 24px;
`;
export const ShortDescription = styled.p`
  margin: 0;
  color: rgb(112, 108, 100);
  font-weight: 500;
  font-size: 15px;
`;

export const SocialMediaList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const SocialMediaItem = styled.a`
  margin-right: 8px;
  cursor: pointer;
  color: #444;

  :last-child {
    margin-right: 0;
  }
  > div {
    background-color: rgb(240, 239, 237);
    border-radius: 50%;
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ServiceContent = styled.div``;
export const ServiceTitle = styled.h2`
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 30px;
`;

export const Content = styled.div`
  max-width: 72rem;
  width: 100%;
  margin: 0px auto;
  padding: 0 15px;
`;

export const AboutContent = styled.div`
  margin: 35px auto;
  max-width: 600px;
`;
export const AboutTitle = styled.h2`
  margin: 0 0 25px 0;
  text-align: center;
  font-size: 30px;
`;

export const AboutBox = styled.div`
  border: 1px solid rgb(229, 227, 221);
  border-radius: 5px;
  padding: 25px 18px;
`;

export const AboutDescription = styled.p`
  margin: 0;
`;

export const ServiceList = styled.div`
  ${Utility.mediaBreakpointDown("sm")} {
    max-width: 600px;
    margin: auto;
  }
`;

