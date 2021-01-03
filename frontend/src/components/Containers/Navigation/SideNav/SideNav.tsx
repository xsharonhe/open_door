import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../../../../utils";

import { Brand } from "../../../Texts/Brand";
import { Hamburger } from "./Hamburger";
import { NavItems } from "../NavItems/NavItems";

export interface SideNavProps {};

export const SideNav: React.FC<SideNavProps> = ({
  children,
  ...props
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FixedWrapper {...props}>
        <Wrapper>
          <Brand>Open Door</Brand>
          <Hamburger opened={isOpen} setIsOpen={setIsOpen} />
        </Wrapper>
      </FixedWrapper>
      {!!isOpen && (
          <SMenu opened={isOpen}>
            <div onClick={() => setIsOpen(false)}>
              <NavItems />
            </div>
          </SMenu>
        )}
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => `
        display: flex;
        width: 100%;
        justify-content: space-between;
        background-color: ${theme.colors.secondary};
        padding: 0 2rem;
    `}
`;

const FixedWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: none;

  ${media(
    "tablet",
    `
        display: flex;
        `
  )}
`;
interface SMenuProps {
  opened?: boolean;
}
const SMenu = styled.div<SMenuProps>`
  ${({ theme, opened }) => `
      @media (min-width: ${theme.media.tablet}px) {
          display: none;
      }
      z-index: 999;
      display: flex;
      transition: ${opened ? theme.transitions.easeIn : theme.transitions.easeOut};
      position: fixed;
      width: 40%;
      right: 0;
      top: 0;
      justify-content: center;
      box-shadow: ${theme.boxShadow.shallow};
      margin-top: 3rem;
      height: 200px;
      background-color: ${theme.colors.secondary};
    `}

    ${media(
      "mobile",
      `
        width: 60%;
          `
    )}
`;
