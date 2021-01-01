import React from "react";
import styled from "styled-components";
import { Menu } from "@styled-icons/boxicons-regular/Menu";

export interface HamburgerProps {
  opened: boolean;
  clicked?: () => void;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  opened,
  clicked,
  children,
  ...props
}): React.ReactElement => {
  return (
      <div onClick={clicked} {...props}>
          <SHamburger as={Menu} opened={opened} />
      </div>
  );
};

const SHamburger = styled.svg<Omit<HamburgerProps, "icon">>`
  ${({ theme }) => `
        color: ${theme.colors.primary};
        width: 30px;
        height: 20px;
        padding: 1rem;
        cursor: pointer;
    `};
`;
