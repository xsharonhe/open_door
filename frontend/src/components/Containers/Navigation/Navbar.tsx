import React from "react";
import styled from "styled-components";
import { media } from "../../../utils";

import { Brand } from './Brand';
import { NavItems } from './NavItems/NavItems';

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({ children, ...props }) => (
  <FixedWrapper>
      <Wrapper>
        <Brand>Open Door</Brand>
        {/* <NavItems loggedIn={loggedIn} /> */}
        <NavItems />
      </Wrapper>
  </FixedWrapper>
);

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  background-color: grey;
  padding: 0 6rem;
`;

const FixedWrapper = styled.nav`
  ${({ theme }) => `
    background-color: ${theme.colors.background};
    width: 100%;
    `}
  ${media(
    "small",
    `
        display: none;
        `
  )}
`;
