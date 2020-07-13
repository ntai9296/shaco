import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(50, 50, 50, 0.8);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  ::after {
    -webkit-animation: spinAround 0.5s linear infinite;
    animation: spin 0.5s linear infinite;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    display: block;
    position: relative;
    height: 25px;
    width: 25px;
    position: absolute;
  }
`;

export default () => {
  return <Overlay/>;
};
