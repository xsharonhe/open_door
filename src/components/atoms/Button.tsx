import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

import { Icon, IconProps } from './Icon';

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    isInverted?: boolean;
    icon?: StyledIcon;
    iconProps?: IconProps
};

export const Button: React.FC<IButtonProps> = ({
    isInverted = true,
    icon,
    children,
    ...props
}): React.ReactElement => (
    <SButton isInverted={isInverted} {...props}> 
        {!!icon && <Icon icon={icon} />}
        {children}
    </SButton>
);

const SButton = styled.button<IButtonProps>`
    ${({ theme, isInverted }) => `
        color: ${isInverted ? `${theme.colors.primary}` : `${theme.colors.text}`};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
        font-size: ${theme.size.default};
        font-family: ${theme.font.body};
        text-decoration: none;
        cursor: pointer;
        padding: 0.7rem 1.25rem;
        transition: ${theme.transitions.cubicBezier};
        background-color: ${isInverted ? `${theme.colors.background}` : `${theme.colors.primary}`};
        &:focus,
        &:active,
        &:hover {
            background-color: ${theme.colors.primaryO};
            outline: none;
        }
        &:after {
            display: none !important;
        }
    `};
`;