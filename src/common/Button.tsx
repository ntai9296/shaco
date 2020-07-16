import React from "react";
import styled from "styled-components";
import { Styling } from "./utility";
import { setLightness, readableColor } from "polished";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: any;
  isLoading?: boolean;
  flex?: boolean;
  invert?: boolean;
}

export const CommonButton = styled.button<Props>`
  background: ${Styling.primaryColor};
  color: #fff;

  padding: 11px 15px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1rem;
  border-radius: 8px;

  ${(props) =>
    props.theme.primaryColor &&
    `
    background: ${props.theme.primaryColor};
    color: #fff;
  `}

  ${(props) =>
    props.theme.primaryColor &&
    props.invert &&
    `
  background: ${setLightness(0.9, props.theme.primaryColor)};
  color: ${props.theme.primaryColor};
  `}

  ${(props) =>
    props.flex &&
    `
  width: 100%;
  `}

  ${(props) =>
    props.disabled &&
    `
  opacity: 0.7;
  cursor: not-allowed;
  
  `}

  ${(props) =>
    props.isLoading &&
    `
    position: relative;
    color: transparent!important;
    pointer-events: none;
    user-select: none;
    ::after {
      -webkit-animation: spinAround .5s linear infinite;
      animation: spin .5s linear infinite;
      border: 2px solid #dbdbdb;
      border-radius: 290486px;
      border-right-color: transparent;
      border-top-color: transparent;
      content: "";
      display: block;
      height: 1em;
      position: relative;
      width: 1em;
      left: calc(50% - .5em);
      top: calc(50% - .5em);
      position: absolute;
    }
  `}
`;

export default ({
  flex = true,
  isLoading = false,
  children,
  ...props
}: Props) => (
  <CommonButton
    flex={flex}
    disabled={isLoading}
    isLoading={isLoading}
    {...props}
  >
    {children}
  </CommonButton>
);
