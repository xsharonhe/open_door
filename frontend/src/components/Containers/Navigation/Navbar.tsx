import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../../utils";

import { Brand } from "../../Texts";
import { NavItems } from "./NavItems/NavItems";

export interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({ children, ...props }) => (
  <FixedWrapper {...props}>
    <Wrapper>
      <Brand><Link to="/">Open Door</Link></Brand>
      <NavItems />
    </Wrapper>
  </FixedWrapper>
);

const Wrapper = styled.div`
  ${({theme}) =>`
    z-index: 9999 !important;
    display: flex;
    overflow: hidden;
    height: 100%;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 0 6rem;
    overflow-x: hidden;
  `}
`;

const FixedWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  ${media(
    "tablet",
    `
        display: none;
        `
  )}
`;
