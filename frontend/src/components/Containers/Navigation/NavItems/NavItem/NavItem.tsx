import React from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { media } from "../../../../../utils/media";

export interface NavItemProps {
    link: string;
}

export const NavItem: React.FC<NavItemProps> = ({ 
    link, 
    children, 
    ...props }) => (
        <SLi {...props}>
            <SNavLink to={link} exact={true} activeClassName="active">
                {children}
            </SNavLink>
        </SLi>
);

const SLi = styled.li`
    display: flex;
`;

// TODO: Add active styles
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
        &.active {
            font-weight: 700;
        }
    `}
    ${media(
        "tablet",
        `
            margin: 0;
            `
      )}
`;