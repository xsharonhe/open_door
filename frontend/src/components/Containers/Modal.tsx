import React, { useState } from "react";
import styled from "styled-components";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { Button } from "./Button";
import { media } from "../../utils";

export interface ModalProps {
  isInverted?: boolean;
  marginTop?: boolean;
  childComponent?: React.ReactElement;
}

export interface StyledModalProps {
  opacity: number;
  marginTop?: boolean;
}

export const SModal: React.FC<ModalProps> = ({
  isInverted,
  marginTop,
  childComponent,
  children,
  ...props
}): React.ReactElement => (
  <ModalProvider backgroundComponent={FadingBackground} {...props}>
    <div>
      <ModalButton isInverted={isInverted} marginTop={marginTop} childComponent={childComponent}>{children}</ModalButton>
    </div>
  </ModalProvider>
);

export const ModalButton: React.FC<ModalProps> = ({
  isInverted,
  marginTop,
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
      <Button isInverted={isInverted} onClick={toggleModal}>{children}</Button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
        marginTop={marginTop}
      >
        <IconWrapper>
          <Icon onClick={toggleModal} as={CloseOutline}/>
        </IconWrapper>
        {childComponent}
      </StyledModal>
    </div>
  );
};

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubModal = Modal.styled`
  width: 40%;
  padding: 2%; 
  ${media("tablet",
  `
      width: 60%;
      padding: 2% 4%;
  `)}
`;

const StyledModal = styled(SubModal)<StyledModalProps>`
  ${({ theme, opacity, marginTop }) => `
    opacity: ${opacity};
    background-color: ${theme.colors.background};
    transition: ${theme.transitions.opacity};
    margin-top: ${marginTop ? '50%' : null };
  `}
  overflow-y: scroll;
`;

const Icon = styled.svg`
    width: 20px;
    height: 20px;
`;

const FadingBackground = styled(BaseModalBackground)<StyledModalProps>`
  ${({ theme, opacity }) => `
    opacity: ${opacity};
    transition: ${theme.transitions.opacity};
    overflow-y: scroll;
  `}
`; 