import React from "react";
import styled from "styled-components";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

export interface HamburgerProps {
  opened: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  opened,
  setIsOpen,
  children,
  ...props
}): React.ReactElement => {
  return (
      <div onClick={() => setIsOpen(!opened)} {...props}>
          <SHamburger as={Menu} />
      </div>
  );
};

const SHamburger = styled.svg`
  ${({ theme }) => `
        color: ${theme.colors.primary};
        width: 30px;
        height: 20px;
        padding: 1rem;
        cursor: pointer;
    `};
`;
