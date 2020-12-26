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
        border-radius: ${theme.radius.default};
        font-size: ${theme.size.defaultLarger};
        font-family: ${theme.font.body};
        text-decoration: none;
        cursor: pointer;
        padding: 1.25rem 1.75rem;
        transition: ${theme.transitions.cubicBezier};
        background-color: ${isInverted ? 'none' : `${theme.colors.primary}`};
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