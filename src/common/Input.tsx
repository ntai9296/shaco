import React from "react";
import styled from "styled-components";
import { Styling } from "./utility";

const Input = styled.input`
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  max-width: 100%;
  width: 100%;
  line-height: 1.5;
  padding: 8px;
  border-radius: ${Styling.inputBorderRadius};

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

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

export default ({ label = "", ...props }: Props) => (
  <Content>
    {label && <label htmlFor={label}>{label}</label>}
    <Input
      id={label && label}
      {...props}
    />
  </Content>
);
