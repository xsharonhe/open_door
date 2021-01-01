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

  //TODO:  when navItem is clicked: onClick={() => setIsOpen(false)}
  return (
    <>
      <FixedWrapper {...props}>
        <Wrapper>
          <Brand>Open Door</Brand>
          <Hamburger opened={isOpen} setIsOpen={setIsOpen} />
        </Wrapper>
      </FixedWrapper>
      {!!isOpen && (
        <SMenu>
          <NavItems />
        </SMenu>
      )}
    </>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => `
        display: flex;
        overflow: hidden;
        height: 100%;
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
    "mobile",
    `
        display: flex;
        justify-content: flex-end;
        `
  )}
`;

const SMenu = styled.div`
  ${({ theme }) => `
      transition: ${theme.transitions.cubicBezier};
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6rem;
      height: 100vh;
      background-color: ${theme.colors.primary};
      color: ${theme.colors.background}
    `}

  ${media(
    "mobile",
    `
          display: flex;
          `
  )}
`;
