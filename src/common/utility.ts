import { css } from "styled-components";
import randomstring from "randomstring";
import * as OverlayJS from "./overlayjs";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const BreakpointWidth = {
  xs: [0, 575],
  sm: [576, 767],
  md: [768, 991],
  lg: [992, 1199],
  xl: [1200, 3999],
};

export const Styling = {
  labelInputMargin: "6px",
  columnPadding: "6px",
  rowMarginBottom: "17px",

  textColor: "#444",

  primaryColor: "#f77f00",
  primaryColorLight: "#e2f0ff",

  successColor: "#4caf50",

  blueColor: "#0967d2",
  dangerColor: "#d64545",
  backgroundColor: "rgb(247, 247, 248)",

  borderRadius: "6px",
  inputBorderRadius: "6px",
  boxShadow: "0 2px 4px rgba(81,107,152,0.16)",
  border: "1px solid rgb(229,227,221)",
};

export const mediaBreakpointUp = (breakpoint: Breakpoint) => `
  @media (min-width: ${BreakpointWidth[breakpoint][0]}px)
`;

export const mediaBreakpointDown = (breakpoint: Breakpoint) =>
  `@media (max-width: ${BreakpointWidth[breakpoint][1]}px)`;

export const mediaBreakpointBetween = (
  breakpointLower: Breakpoint,
  breakpointUpper: Breakpoint,
  first: any,
  ...args: any
) => css`
  @media (min-width: ${BreakpointWidth[
      breakpointLower
    ][0]}px) and (max-width: ${BreakpointWidth[breakpointUpper][1]}px) {
    ${css(first, ...args)}
  }
`;

export const showWorkingOverlay = (delay = 500) =>
  OverlayJS.showWorkingOverlay(delay);
export const hideWorkingOverlay = () => OverlayJS.hideWorkingOverlay();
export const showPageNotice = OverlayJS.showPageNotice;
export const hidePageNotice = OverlayJS.hidePageNotice;

export const extensionName = (fileName: string) => {
  return fileName.substr(fileName.lastIndexOf(".") + 1);
};
export const uploadToS3 = (file: any): { Location: string } => {
  const { AWS }: any = window;
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:e8e49106-b0f4-4ba2-bab0-c533a0be2ca5",
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "firesideapp" },
  });

  const fileName = `${randomstring.generate(20)}.${extensionName(file.name)}`;

  return new AWS.S3.ManagedUpload({
    params: {
      Bucket: "firesideapp/public",
      Key: fileName,
      Body: file,
    },
  }).promise();
};

export const getDefaultStyling = (theme?: any) => {
  let obj: any = { ...Styling };
  theme &&
    Object.keys(theme).forEach((key) => {
      if (theme[key]) {
        obj[key] = theme[key];
      }
    });
  return obj;
};

export const isVideoURL = (url: string) => {
  const parts = url.split(".");
  const extension = parts[parts.length - 1];
  if (
    ["m4v", "avi", "mp4", "mpg", "ogg", "webm"].includes(
      extension.toLowerCase()
    )
  ) {
    return true;
  }
  return false;
};

export const getHumanizeEnum = (string: any) => {
  let str = string.toLowerCase().replace("_", " ");

  return str.charAt(0).toUpperCase() + str.slice(1);
};
