import React from "react";
import styled from "styled-components";

export interface NavItemProps {
    link: string
}

// <SNavLink exact to="{link}">
export const NavItem: React.FC<NavItemProps> = ({ 
    link, 
    children, 
    ...props }) => (
        <SLi>
            <SNavLink>
                {children}
            </SNavLink>
        </SLi>
);

const SLi = styled.li`
    display: flex;
`;

// Add active styles
const SNavLink = styled.h5`
    ${({theme}) => `
        display: flex;
        text-transform: uppercase;
        align-items: center;
        font-size: ${theme.size.default};
        color: ${theme.colors.primary};
        padding: 1rem;
        margin: 0 1rem;
        &:hover {
            color: ${theme.colors.hover};
            cursor: pointer;
        }
    `} 
`;