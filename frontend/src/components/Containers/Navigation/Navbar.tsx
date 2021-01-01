import React from "react";
import styled from "styled-components";
import { media } from "../../../utils";

import { Brand } from "../../Texts";
import { NavItems } from "./NavItems/NavItems";

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({ children, ...props }) => (
  <FixedWrapper>
    <Wrapper>
      <Brand>Open Door</Brand>
      <NavItems />
    </Wrapper>
  </FixedWrapper>
);

const Wrapper = styled.div`
  ${({theme}) =>`
    display: flex;
    overflow: hidden;
    height: 100%;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 0 6rem;
  `}
`;

const FixedWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  ${media(
    "mobile",
    `
        display: none;
        `
  )}
`;
