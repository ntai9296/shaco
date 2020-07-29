import React, { useState } from "react";
import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

const HowItWorkSection = styled.section`
  background: #f2f3f3;
  padding: 50px 0;

  ${mediaBreakpointDown("md")} {
    padding: 50px 15px;
  }
`;

const HowItWorkHeading = styled.h2`
  text-align: center;
  color: #000;
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 30px;
`;

const HowItWorkSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;

  ${mediaBreakpointDown("sm")} {
    margin-bottom: 30px;
  }
`;

const HowItWorkSelect = styled.select`
  border-radius: 25px;
  padding: 15px 20px;
  border: 1px solid #000;
  max-width: 300px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

  background-image: url("/arrow_down_home.svg");
  background-repeat: no-repeat, repeat;
  background-position: right 20px top 50%, 0 0;
  background-size: 18px auto, 100%;
`;

const HowItWorkContentContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: auto;
  align-items: center;
`;

const HowItWorkContentLeftContainer = styled.div`
  flex-basis: 40%;

  > img {
    width: 100%;
  }

  ${mediaBreakpointDown("sm")} {
    flex-basis: 100%;
    max-width: 300px;
    margin: 0 auto 15px auto;
  }
`;
const HowItWorkContentRightContainer = styled.div`
  flex-basis: 60%;
  padding-left: 100px;

  ${mediaBreakpointDown("md")} {
    padding-left: 50px;
  }
  ${mediaBreakpointDown("sm")} {
    flex-basis: 100%;
    padding-left: 0;
  }
`;

const HowItWorkContentItem = styled.div`
  margin: 0 0 30px 0;
  font-size: 15px;
  font-weight: 500;

  ${mediaBreakpointDown("sm")} {
    margin-bottom: 0;
  }
`;

const ContentItemHeading = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;
const ContentItemDescription = styled.div`
  font-size: 16px;
  width: 100%;

  > b {
    font-size: 35px;
  }

  ${mediaBreakpointDown("sm")} {
    text-align: center;
  }
`;

export default () => {
  const [option, setOption] = useState("0");
  return (
    <HowItWorkSection>
      <HowItWorkHeading>Learn about our services</HowItWorkHeading>
      <HowItWorkSelectContainer>
        <HowItWorkSelect
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="0">1:1 Video Calls</option>
          <option value="1">Virtual Classes & Events</option>
          <option value="2">Personalized Messages/Shoutouts</option>
          <option value="4">Name Your Price</option>
          <option value="5">Create Your Own</option>
        </HowItWorkSelect>
      </HowItWorkSelectContainer>
      <HowItWorkContentContainer>
        {option === "0" && (
          <>
            <HowItWorkContentLeftContainer>
              <img src="/one_on_one.png" />
            </HowItWorkContentLeftContainer>
            <HowItWorkContentRightContainer>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>1.</b> Set your own availability, price, and call
                    duration.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>2.</b> We’ll provide a Zoom link and ensure your calendar
                    has no conflicts.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>3.</b> Meet with anyone in the world to answer questions
                    or just have a chat.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
            </HowItWorkContentRightContainer>
          </>
        )}

        {option === "1" && (
          <>
            <HowItWorkContentLeftContainer>
              <img src="/virtual_img.png" />
            </HowItWorkContentLeftContainer>
            <HowItWorkContentRightContainer>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>1.</b> Set your own price, # of attendees and class
                    duration.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>2.</b> We’ll provide a Zoom link for you and your
                    attendees.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    <b>3.</b> Have a great time while getting paid to share your
                    skills & expertise.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
            </HowItWorkContentRightContainer>
          </>
        )}

        {option === "2" && (
          <>
            <HowItWorkContentLeftContainer>
              <img src="/personalized.png" />
            </HowItWorkContentLeftContainer>
            <HowItWorkContentRightContainer>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    • Get paid to post video shoutouts on social media (e.g.
                    Instagram, Facebook, YouTube Tiktok, Twitch, Twitter, etc.)
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    • Create & send personalized video messages to your
                    customers
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
            </HowItWorkContentRightContainer>
          </>
        )}

        {option === "4" && (
          <>
            <HowItWorkContentLeftContainer>
              <img src="/money.png" />
            </HowItWorkContentLeftContainer>
            <HowItWorkContentRightContainer>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    Make your services more accessible by allowing your
                    community to name the price that they can afford for your
                    services. Hear their stories to see how you can help.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
            </HowItWorkContentRightContainer>
          </>
        )}

        {option === "5" && (
          <>
            <HowItWorkContentLeftContainer>
              <img src="/custom_gif.gif" />
            </HowItWorkContentLeftContainer>
            <HowItWorkContentRightContainer>
              <HowItWorkContentItem>
                <ContentItemHeading>
                  <ContentItemDescription>
                    Create your own custom services & interactions for your
                    audience. Experiment with different things to see what works
                    best for you and your customers.
                  </ContentItemDescription>
                </ContentItemHeading>
              </HowItWorkContentItem>
            </HowItWorkContentRightContainer>
          </>
        )}
      </HowItWorkContentContainer>
    </HowItWorkSection>
  );
};
