import React from "react";
import Format, { NumberFormatProps } from "react-number-format";
import styled from "styled-components";
import { setLightness } from "polished";
import { mediaBreakpointDown } from "./utility";

const NumberFormat = styled(Format)`
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
  :focus {
    box-shadow: 0 0 0 2px
      ${(props) => setLightness(0.8, props.theme.primaryColor)};
    transition: box-shadow 0.3s ease-in-out !important;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  > label {
    margin-bottom: ${(props) => props.theme.labelInputMargin};
  }
`;

interface Props extends NumberFormatProps {
  label?: string;
}

export default ({ label = "", ...props }: Props) => {
  return (
    <Content>
      {label && <label htmlFor={label}>{label}</label>}
      <NumberFormat id={label && label} {...props} />
    </Content>
  );
};
