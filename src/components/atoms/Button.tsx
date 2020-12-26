import React from 'react';
import styled from 'styled-components';
import { Icon, IconProps } from './Icon';
import { StyledIcon } from '@styled-icons/styled-icon';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon?: StyledIcon;
    iconProps?: IconProps;
};

export const Button: React.FC<ButtonProps> = ({
    icon,
    iconProps,
    children,
    ...props
}): React.ReactElement => (
    <SButton>
        {!!icon && <Icon icon={icon} {...iconProps} />}
        {children}
    </SButton>
);

const SButton = styled.button`
`;