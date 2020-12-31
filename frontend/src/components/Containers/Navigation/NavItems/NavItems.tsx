import React from "react";
import styled from "styled-components";

import {NavItem} from './NavItem/NavItem';
import {Button} from '../../Button';

export interface NavItemsProps {}

export const NavItems: React.FC<NavItemsProps> = () => (
    <SNav>{links}</SNav>
);

const SNav = styled.nav`
    display: flex;
`;

const SUl = styled.ul`
    display: flex;
    align-items: center;
`;

// TODO: Add link to signin button
// TODO:: Conditional navitems
const links = (
    <SUl>
        <NavItem link="">Home</NavItem>
        <NavItem link="">Discover</NavItem>
        <Button isInverted={false}>SIGN IN</Button> 
    </SUl>
)


