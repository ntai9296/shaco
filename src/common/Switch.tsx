import React from "react";
import styled from "styled-components";

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 45px;
  height: 26px;

  > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  > span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;

    :before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.4s;
    }
  }

  input:checked + .slider {
    background-color: ${props => props.theme.primaryColor};
    :before {
      left: -4px;
    }
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .slider {
    border-radius: 34px;

    :before {
      border-radius: 50%;
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

interface Props {
  checked?: boolean;
  onChange?: () => void;
}

export default ({ checked, onChange }: Props) => (
  <Content>
    <Switch>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider" />
    </Switch>
  </Content>
);
