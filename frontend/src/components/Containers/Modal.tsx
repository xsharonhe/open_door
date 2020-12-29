import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { Button } from "./Button";

export interface ModalProps {
  childComponent?: React.ReactElement,
}

export const SModal: React.FC<ModalProps> = ({
  childComponent,
  children,
    ...props
}): React.ReactElement => (
  <ModalProvider backgroundComponent={FadingBackground} {...props}>
    <div>
      <ModalButton childComponent={childComponent} >{children}</ModalButton>
    </div>
  </ModalProvider>
);

export const ModalButton: React.FC<ModalProps>= ({ childComponent, children }): React.ReactElement => {
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
      <Button onClick={toggleModal}>{children}</Button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        { childComponent }
        <Button isInverted={false} onClick={toggleModal}>Close</Button>
      </StyledModal>
    </div>
  );
}

interface StyledModalProps {
  opacity: number;
}

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
    opacity: ${opacity}
  `}
`;

const FadingBackground = styled(BaseModalBackground)<StyledModalProps>`
  ${({ opacity }) => `
    opacity: ${opacity}
  `}
  transition: opacity ease 200ms;
`;
