import React from "react";
import styled from "styled-components";

const CloseIcon = styled.button`
  position: absolute;
  right: 0.5rem;
  top: calc(0.5rem + 2px);

  background: transparent;

  border: none;
  border-radius: 290486px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  outline: none;
  vertical-align: top;
  width: 20px;

  ::before,
  ::after {
    background-color: #fff;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform-origin: center center;
  }

  ::before {
    width: 80%;
    height: 2px;
  }

  ::after {
    width: 2px;
    height: 80%;
  }
`;

export default ({ onClick }: { onClick?: () => void }) => (
  <CloseIcon onClick={onClick} type="button" />
);
