import React from "react";
import TinyPopper from "react-tiny-popover";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  content: JSX.Element | JSX.Element[];
  children: any;
  position?: "left" | "right" | "top" | "bottom";
  onClickOutside?: () => void;
}

const PopperContent = styled.div`
  background: #fff;
  color: #4a4a4a;
  border: none;
  left: auto;
  right: 0;
  padding: 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
`;

export default ({
  isOpen,
  content,
  children,
  position,
  onClickOutside,
}: Props) => {
  return (
    <TinyPopper
      onClickOutside={onClickOutside}
      containerStyle={{ overflow: "visible", zIndex: "999" }}
      windowBorderPadding={15}
      disableReposition
      isOpen={isOpen}
      position={position}
      content={() =>
        isOpen ? <PopperContent>{content}</PopperContent> : <div />
      }
    >
      {children}
    </TinyPopper>
  );
};
