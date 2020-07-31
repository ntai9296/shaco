import styled from "styled-components";
import Link from "next/link";
import { mediaBreakpointDown } from "../src/common/utility";
import { CommonButton } from "../src/common/Button";
import LearnAboutOurServiceSection from "../src/Landing/LearnAboutOurServiceSection";
import HowItWorkSection from "../src/Landing/HowItWorkSection";
import CallToActionSection from "../src/Landing/CallToActionSection";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;

  z-index: 1200;
  background-color: rgb(255, 255, 255);
  position: fixed;
  padding: 0px 50px;

  ${mediaBreakpointDown("md")} {
    padding: 0 15px;
  }
`;
const HeroSection = styled.section`
  padding: 85px 15px 100px 15px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 64px;

  ${mediaBreakpointDown("md")} {
    padding: 50px 15px 75px 15px;
  }
`;

const Brand = styled.div`
  > img {
    width: 150px;
  }
`;

const SignInButton = styled(CommonButton)`
  border-radius: 25px;
  background: #eeeeee;
  color: #f77f00;
  font-weight: bold;
  font-size: 14px;
  padding: 15px 20px;
`;

const HeroLeftContainer = styled.div`
  max-width: 600px;

  ${mediaBreakpointDown("lg")} {
    max-width: 500px;
  }
  ${mediaBreakpointDown("md")} {
    flex-basis: 100%;
    max-width: 700px;
  }
`;

const HeroRightContainer = styled.div`
  > img {
    max-width: 444px;

    ${mediaBreakpointDown("xs")} {
      max-width: 100%;
    }
  }
`;
const HeroH1 = styled.h1`
  font-size: 50px;
  margin: 0 0 25px 0;
  color: #000000;
  font-weight: 900;

  ${mediaBreakpointDown("md")} {
    text-align: center;
  }
  ${mediaBreakpointDown("xs")} {
    font-size: 33px;
  }
`;
const HeroDescription = styled.p`
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 16px;
  color: #000000;
  line-height: 24px;
  width: 85%;
  ${mediaBreakpointDown("md")} {
    text-align: center;
    margin: 0 auto 25px auto;
  }
  ${mediaBreakpointDown("xs")} {
    width: 100%;
    font-size: 14px;
  }
`;

const HeroButtonContainer = styled.div`
  ${mediaBreakpointDown("md")} {
    text-align: center;
    margin-bottom: 25px;
  }
`;

const HeroButton = styled(CommonButton)`
  border-radius: 40px;
  background-color: #f77f00;
  font-weight: bold;
  font-size: 16px;
  padding: 20px 40px;
`;

const UseCaseSection = styled.section`
  background: #292929;
  padding: 50px 0;

  ${mediaBreakpointDown("md")} {
    padding: 50px 15px;
  }
`;

const UseCaseContainer = styled.div`
  margin: auto;
  max-width: 900px;
`;

const UseCaseHeading = styled.h2`
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-top: 0;
  margin-bottom: 30px;
`;
const UseCaseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`;
const UseCaseItemBox = styled.div`
  flex-basis: 33.33%;
  padding: 10px;

  ${mediaBreakpointDown("md")} {
    flex-basis: 50%;
  }
  ${mediaBreakpointDown("xs")} {
    flex-basis: 100%;
  }
`;
const UseCaseItemContent = styled.div`
  padding: 30px 15px;
  background: #fff;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 227, 221);
  border-image: initial;
  border-radius: 5px;

  > h3 {
    margin-top: 0;
    text-align: center;
    font-size: 16px;
  }
  > p {
    text-align: center;
    margin: 0;
    font-size: 15px;
  }
`;

const App = () => {
  return (
    <div className="container">
      <MainContainer>
        <Header>
          <Brand>
            <img src="/logo.svg" />
          </Brand>
          <Link href="/login">
            <SignInButton flex={false}>SIGN IN</SignInButton>
          </Link>
        </Header>
        <HeroSection>
          <HeroLeftContainer>
            <HeroH1>Engage with your audience on a more personal level</HeroH1>
            <HeroDescription>
              A streamlined solution to monetize your expertise and
              interactions. Create a website, choose your rate and availability,
              connect with people anywhere in the world.
            </HeroDescription>
            <HeroButtonContainer>
              <Link href="/early_access">
                <HeroButton flex={false}>Get Early Access</HeroButton>
              </Link>
            </HeroButtonContainer>
          </HeroLeftContainer>
          <HeroRightContainer>
            <img src="/hero_img.png" />
          </HeroRightContainer>
        </HeroSection>
        <UseCaseSection>
          <UseCaseContainer>
            <UseCaseHeading>How Experts & Creators use Fireside</UseCaseHeading>
            <UseCaseList>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>1:1 Video Calls</h3>
                  <p>
                    Meet with anyone in the world to connect on a more personal
                    level. Answer questions or just have a chat. Set your own
                    availability, price, and call duration.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>Virtual Classes & Events</h3>
                  <p>
                    Host online classes and events via Zoom livestreams. Connect
                    with your audience while monetizing your skills & expertise.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>Personalized Messages/Shoutouts</h3>
                  <p>
                    Give video shoutouts on social media (IG, FB, YT, Tiktok,
                    Twitch, Twitter, etc.) or send a personalized message.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>Donations</h3>
                  <p>
                    Collect donations from people that follow you or use your
                    services. Securely connect donations with Stripe and cash
                    out to your account at any time.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>Name Your Price</h3>
                  <p>
                    Make your services more accessible by allowing your
                    community to name the price that they can afford for your
                    services.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
              <UseCaseItemBox>
                <UseCaseItemContent>
                  <h3>Create Your Own</h3>
                  <p>
                    Create your own custom services & interactions for your
                    audience. Experiment with different things to see what works
                    best for you and your customers.
                  </p>
                </UseCaseItemContent>
              </UseCaseItemBox>
            </UseCaseList>
          </UseCaseContainer>
        </UseCaseSection>

        <LearnAboutOurServiceSection />
        <HowItWorkSection />
        <CallToActionSection />
      </MainContainer>
    </div>
  );
};

export default App;
