import React from "react";
import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

const HowItWorkSection = styled.section`
  background: #fff;
  padding: 50px 0;

  ${mediaBreakpointDown("md")} {
    padding: 50px 15px;
  }
`;

const HowItWorkContainer = styled.div`
  max-width: 900px;
  margin: auto;
`;

const HowItWorkHeading = styled.h2`
  text-align: center;
  color: #000;
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 50px;
`;

const HowItWorkContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: -12px;
`;

const ItemBox = styled.div`
  flex-basis: 33.33%;
  padding: 12px;
  ${mediaBreakpointDown("md")} {
    flex-basis: 100%;
  }
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  ${mediaBreakpointDown("md")} {
    align-items: center;
    margin-botton: 20px;
  }
`;

const Step = styled.div`
  width: 25px;
  height: 25px;
  background: #f77f00;
  display: flex;
  color: #fff;
  padding: 25px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 23px;
`;
const ProfileTitle = styled.h2`
  margin: 0 0 20px 0;
`;
const ProfileBox = styled.div`
  padding: 20px 30px;
  background: linear-gradient(227.65deg, #ffb672 45.64%, #f259ff 100%);
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
  color: #fff;
  min-height: 320px;
  width: 100%;
  ${mediaBreakpointDown("md")} {
    min-height: auto;
  }
`;

const ProfileServiceBox = styled.div`
  padding: 20px 30px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;
  color: #fff;
  min-height: 320px;
  width: 100%;

  > img {
    width: 100%;
  }

  ${mediaBreakpointDown("md")} {
    min-height: auto;
  }
`;

const ProfileAvatar = styled.div`
  text-align: center;
  margin-bottom: 15px;

  > img {
    width: 88px;
    height: 88px;
  }
`;
const ProfileName = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const ProfileDescription = styled.div`
  text-align: center;
  font-weight: 500;
`;
const ProfileURL = styled.div`
  padding: 10px 20px;
  border-radius: 25px;
  box-shadow: 2px 8px 10px rgba(0, 0, 0, 0.35);
`;

export default () => {
  return (
    <HowItWorkSection>
      <HowItWorkContainer>
        <HowItWorkHeading>How it works</HowItWorkHeading>
        <HowItWorkContentContainer>
          <ItemBox>
            <ItemContent>
              <Step>1</Step>
              <ProfileTitle>
                Create your page & claim your unique URL.
              </ProfileTitle>
              <ProfileBox>
                <ProfileAvatar>
                  <img src="/courtney.png" />
                </ProfileAvatar>
                <ProfileName>Hey, I’m Laura!</ProfileName>
                <ProfileDescription>
                  Thanks for stopping by! Use Fireside to ask me anything about
                  being a professional stylist...attend one of my classes on
                  styling, book a time for your own fashion styling
                  consultation, and learn how I broke into the fashion industry.
                </ProfileDescription>
              </ProfileBox>
              <ProfileURL>
                <b>tryfireside.com/</b>yournamehere
              </ProfileURL>
            </ItemContent>
          </ItemBox>

          <ItemBox>
            <ItemContent>
              <Step>2</Step>
              <ProfileTitle>Add your services & interactions.</ProfileTitle>
              <ProfileServiceBox>
                <img src="/custom_gif.gif" />
              </ProfileServiceBox>
            </ItemContent>
          </ItemBox>

          <ItemBox>
            <ItemContent>
              <Step>3</Step>
              <ProfileTitle>Share with your audience & earn 💰.</ProfileTitle>
              <ProfileBox>
                <img src="/earnings.svg" />
              </ProfileBox>
            </ItemContent>
          </ItemBox>
        </HowItWorkContentContainer>
      </HowItWorkContainer>
    </HowItWorkSection>
  );
};
