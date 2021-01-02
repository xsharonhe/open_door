import React from "react";
import styled from "styled-components";
import { media } from "../../../../utils/media";
import { SModal } from '../../Modal';
import { NavItem } from './NavItem/NavItem';

export interface NavItemsProps {
}

export const NavItems: React.FC<NavItemsProps> = () => (
    <SNav>{links}</SNav>
);

const SNav = styled.nav`
    display: flex;
`;

const SUl = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: row;
    ${media(
        "tablet",
        `
            flex-direction: column;
            padding: 0;
            `
      )}
`;

// TODO:: Conditional navitems
const links = (
    <SUl>
        <NavItem link="/">Home</NavItem>
        <NavItem link="/discover">Discover</NavItem>
        <SModal isInverted={false} childComponent={<p>TODO: Sign In Component</p>}>
          SIGN IN
        </SModal>
    </SUl>
)

