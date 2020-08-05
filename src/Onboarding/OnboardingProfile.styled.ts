import styled from "styled-components";
import { CommonButton } from "../common/Button";
import { mediaBreakpointDown } from "../common/utility";
import { setLightness } from "polished";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

export const ProfileSectionContainer = styled.div``;

export const ProfileSectionContent = styled.div`
  border: ${(props) => props.theme.border};
  border-radius: 13px;
  padding: 30px 25px;
  margin-bottom: 25px;
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
  background: black;
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
  border: 1px solid #d6e3eb;
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
  }
`;

export const CustomPhotoIntroInput = styled.div<{ URLFocus?: boolean }>`
  display: flex;
  align-items: center;
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #d6e3eb;
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

export const ImagePlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  padding: 15px;
  background: rgb(250, 250, 250);
  flex-direction: column;
`;

export const ServiceItemImageHover = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  background: rgba(100, 100, 100, 0.5);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;

export const DeleteImageButton = styled.a`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  background: #fff;
  border-radius: 50%;
  margin: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ServiceImageContainer = styled.div<any>`
  height: 200px;
  border-radius: 10px;
  background: rgb(250, 250, 250);

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  :hover {
    ${ServiceItemImageHover} {
      display: flex;
    }
  }
`;

export const NotificationContainer = styled.div`
  margin-top: 10px;
`;
export const NotificationContainerBottom = styled.div`
  margin-bottom: 10px;
`;
