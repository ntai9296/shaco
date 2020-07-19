import React from "react";
import styled from "styled-components";
import { Styling, mediaBreakpointDown } from "./utility";

const Textarea = styled.textarea`
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  max-width: 100%;
  width: 100%;
  padding: 8px;
  border-radius: ${Styling.inputBorderRadius};
  resize: vertical;
  font-size: 14px;

  ${mediaBreakpointDown("sm")} {
    font-size: 16px;
  }

  // :focus {
  //   box-shadow: 0 0 0 4px #b7d7f9;
  // }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  > label {
    margin-bottom: ${Styling.labelInputMargin};
  }
`;

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
}

export default ({ label = "", ...props }: Props) => (
  <Content>
    {label && <label htmlFor={label}>{label}</label>}
    <Textarea
      id={label && label}
      {...props}
    />
  </Content>
);
