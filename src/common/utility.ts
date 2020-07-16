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
  labelInputMargin: "8px",
  columnPadding: "12px",
  rowMarginBottom: "17px",

  textColor: "#444",

  primaryColor: "#0070f3",
  primaryColorLight: "#e2f0ff",

  dangerColor: "#d64545",
  backgroundColor: "rgb(247, 247, 248);",

  inputBorderRadius: "8px",
  boxShadow: "0 2px 4px rgba(81,107,152,0.16)",
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
