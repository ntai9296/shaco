import styled from "styled-components";
import { CommonButton } from "../../common/Button";
import { mediaBreakpointDown } from "../../common/utility";
import { setLightness } from "polished";

export const ProfileLayout = styled.div`
  padding: 0 40px 40px 40px;
  max-width: 1100px;
  margin: auto;

  ${mediaBreakpointDown("sm")} {
    padding: 0;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadingContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 30px 0 20px 0;
  background: #f2f4f7;
  z-index: 2;
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: space-between;
`;

export const ProfileSectionContainer = styled.div``;

export const ProfileSectionContent = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 13px;
  margin-bottom: 25px;
  background: #fff;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const ProfileHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  > span {
    font-weight: bold;
    font-size: 23px;
  }
`;

export const Step = styled.div`
  background: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  margin-right: 15px;
`;

export const Row = styled.div`
  margin-bottom: ${(props) => props.theme.rowMarginBottom};
`;

export const RowTwo = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  margin-bottom: ${(props) => props.theme.rowMarginBottom};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    margin-bottom: 6px;
  }
`;
export const FieldGroupTwo = styled(FieldGroup)`
  flex-basis: 50%;
  padding: 0 10px;
`;

export const CustomInput = styled.div``;
export const CustomURLInput = styled.div<{ URLFocus?: boolean }>`
  display: flex;
  align-items: center;
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  max-width: 100%;
  width: 100%;
  padding: 8px;
  border-radius: ${(props) => props.theme.inputBorderRadius};
  font-size: 14px;

  ${mediaBreakpointDown("sm")} {
    font-size: 16px;
  }

  ${(props) =>
    props.URLFocus &&
    `
  box-shadow: 0 0 0 2px
      ${setLightness(0.8, props.theme.primaryColor)};
    transition: box-shadow 0.3s ease-in-out !important;
  `}
  > input {
    border: none;
    flex: 1;
    width: 100%;
    ${mediaBreakpointDown("xs")} {
      font-size: 16px;
    }
  }
  > a {
    cursor: pointer;
  }
`;

export const CustomPhotoIntroInput = styled.div<{ URLFocus?: boolean }>`
  display: flex;
  align-items: center;
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  max-width: 100%;
  width: 100%;
  padding: 8px;
  border-radius: ${(props) => props.theme.inputBorderRadius};
  font-size: 14px;

  ${mediaBreakpointDown("sm")} {
    font-size: 16px;
  }

  ${(props) =>
    props.URLFocus &&
    `
  box-shadow: 0 0 0 2px
      ${setLightness(0.8, props.theme.primaryColor)};
    transition: box-shadow 0.3s ease-in-out !important;
  `}
  > input {
    border: none;
    flex: 1;
  }
  > a {
    cursor: pointer;
    margin-left: 8px;
  }
`;

export const BrandColorButton = styled(CommonButton)<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
`;

export const ChangeCoverImageButton = styled.a`
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px 15px;
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  cursor: pointer;
`;

export const ServiceImageContainer = styled.div<any>`
  height: 200px;
  background: rgb(250, 250, 250);

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
`;

export const NotificationContainer = styled.div`
  margin-top: 20px;
`;

export const BodyContainer = styled.div`
  padding: 30px 25px;
  max-width: 550px;
  margin: 0 auto;
`;

export const AvatarContainer = styled.div`
  position: absolute;
  top: 125px;
  left: 0;
  right: 0;
  z-index: 2;
  margin: 0 auto;
  padding: 0;
  width: 112px;
  height: 112px;
  text-align: center;
  overflow: hidden;
`;

export const AvatarImg = styled.div<{ src?: string | null }>`
  display: block;
  background-clip: padding-box;
  background-size: cover;
  width: 112px;
  height: 112px;
  border-width: 4px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
  background-color: #f2f4f7;

  ${(props) =>
    props.src &&
    `
    background-image: url(${props.src});
  `}
`;

export const AvatarHelper = styled.p`
  text-align: center;
  margin-top: 45px;
  font-size: 12px;
`;
