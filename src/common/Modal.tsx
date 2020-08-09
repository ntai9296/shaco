import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

const Modal = styled(ReactModal)<{ maxWidth?: number }>`
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : "400px")};
  margin: 100px auto;
  background: #fff;
  box-shadow: 0 0 30px #444;
  border-radius: 5px;
`;

const Header = styled.div`
  position: relative;
  padding: 20px 25px 10px 25px;
  font-size: 20px;
`;
const CloseIcon = styled.a`
  position: absolute;
  top: 8px;
  right: 25px;
  padding: 0 10px;
  font-size: 36px;
  font-weight: 400;
  cursor: pointer;
  padding: 0;
`;
const Heading = styled.h4`
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

const Body = styled.div`
  padding: 25px;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any
}

export default ({ isOpen, onClose, title, children, ...args }: Props) => {
  return (
    <Modal
      {...args}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: 100,
          backgroundColor: "rgba(50, 50, 50, 0.8)",
          overflow: "auto",
          overflowY: "scroll",
        },
      }}
      ariaHideApp={false}
    >
      <Header>
        <CloseIcon onClick={onClose}>×</CloseIcon>
        <Heading>{title}</Heading>
      </Header>
      <Body>{children}</Body>
    </Modal>
  );
};
