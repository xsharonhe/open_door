import React from "react";
import styled from "styled-components";
import { media } from "../../../../utils/media";
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
        <NavItem link="/signup">Sign Up</NavItem>
        <NavItem link="/signin">Sign In</NavItem>
    </SUl>
)

