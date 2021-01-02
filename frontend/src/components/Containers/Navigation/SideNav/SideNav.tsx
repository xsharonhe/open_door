import React, { useState } from "react";
import styled from "styled-components";
import { media } from "../../../../utils";

import { Brand } from "../../../Texts/Brand";
import { Hamburger } from "./Hamburger";
import { NavItems } from "../NavItems/NavItems";

export interface SideNavProps {}

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
        <SMenu>
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

const SMenu = styled.div`
  ${({ theme }) => `
      transition: ${theme.transitions.cubicBezier};
      position: fixed;
      width: 40%;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      margin-top: 3rem;
      height: 100vh;
      background-color: ${theme.colors.secondary};
    `}

    ${media(
      "mobile",
      `
        width: 60%;
          `
    )}
`;
