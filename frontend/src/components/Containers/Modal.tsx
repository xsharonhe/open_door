import React, { useState } from "react";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { Button } from "./Button";

export interface ModalProps {
  childComponent?: React.ReactElement;
}

export interface StyledModalProps {
  opacity: number;
}

export const SModal: React.FC<ModalProps> = ({
  childComponent,
  children,
  ...props
}): React.ReactElement => (
  <ModalProvider backgroundComponent={FadingBackground} {...props}>
    <div>
      <ModalButton childComponent={childComponent}>{children}</ModalButton>
    </div>
  </ModalProvider>
);

export const ModalButton: React.FC<ModalProps> = ({
  childComponent,
  children,
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  }

  const beforeClose = () => {
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
        <ButtonWrapper>
          <Button isInverted={false} onClick={toggleModal}>
            Close
          </Button>
        </ButtonWrapper>
        {childComponent}
      </StyledModal>
    </div>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubModal = Modal.styled`
  width: 60%;
  padding: 2%;
`;

const StyledModal = styled(SubModal)<StyledModalProps>`
  ${({ theme, opacity }) => `
    opacity: ${opacity};
    background-color: ${theme.colors.background};
    transition: ${theme.transitions.opacity}
  `}
`;

const FadingBackground = styled(BaseModalBackground)<StyledModalProps>`
  ${({ theme, opacity }) => `
    opacity: ${opacity};
    transition: ${theme.transitions.opacity}
  `}
`; 