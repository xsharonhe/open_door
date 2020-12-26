import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

export interface IconProps {
    icon: StyledIcon;
    isCollapsed?: boolean;
};

/**
 * Icon with transform ability
 * @param icon 
 * @param isCollapsed {boolean} true: original state; false: transforms 180 deg 
 */
export const Icon: React.FC<IconProps> = ({
    icon,
    isCollapsed,
    ...props
}): React.ReactElement => (
    <SIcon as={icon} isCollapsed={isCollapsed} {...props}/>
);

const SIcon = styled.svg<Omit<IconProps, 'icon'>>`
    width: 35px;
    height: 35px;
    transform: rotate(${({ isCollapsed }): string =>
        isCollapsed ? '180deg' : '0'});
`;