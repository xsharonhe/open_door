import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export interface NavItemProps {
    link: string
}

// <SNavLink exact to="{link}">
export const NavItem: React.FC<NavItemProps> = ({ 
    link, 
    children, 
    ...props }) => (
        <SLi {...props}>
            <SNavLink to={link}>
                {children}
            </SNavLink>
        </SLi>
);

const SLi = styled.li`
    display: flex;
`;

// Add active styles
const SNavLink = styled(NavLink)`
    ${({theme}) => `
        display: flex;
        text-transform: uppercase;
        align-items: center;
        font-size: 0.8rem;
        color: ${theme.colors.primary};
        padding: 1rem;
        margin: 0 1rem;
        &:hover {
            color: ${theme.colors.hover};
            cursor: pointer;
        }
    `} 
`;