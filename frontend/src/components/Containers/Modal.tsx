import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { Button } from "./Button";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {};

export const SModal: React.FC<ModalProps> = ({
   ...props
}): React.ReactElement => (
  <ModalProvider backgroundComponent={FadingBackground}>
    <div {...props}>
      <p>Test</p>
      <FancyModalButton />
    </div>
  </ModalProvider>
);

function FancyModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  }

  return (
    <div>
      <button onClick={toggleModal}>Open modal</button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <span>I am a modal!</span>
        <button onClick={toggleModal}>Close me</button>
      </StyledModal>
    </div>
  );
}

interface StyledModalProps {
    opacity: number;
};

const AModal = Modal.styled`
      width: 20rem;
      height: 20rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      transition: opacity ease 500ms;
`;
const StyledModal = styled(AModal)<StyledModalProps>`
  ${({ opacity }) => `
      opacity: ${opacity};
  `};
`;

const FadingBackground = styled(BaseModalBackground)<StyledModalProps>`
    ${({ opacity }) => ` 
        opacity: ${opacity};
    `};
    transition: opacity ease 200ms;
`;
