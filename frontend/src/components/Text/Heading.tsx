import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';

import { Icon, IconProps } from '../index';

interface IHeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
    icon?: StyledIcon;
    iconProps?: IconProps;
    coloredText?: string;
};

export const Heading: React.FC<IHeadingProps> = ({
    coloredText,
    children,
    icon,
    iconProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {!!icon && (
                <SIcon icon={icon} {...iconProps} />
            )}
            {!!coloredText && (
                <Text isColored> 
                    {coloredText}
                </Text>
            )}
            <Text>
                {children}
            </Text>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
interface ITextProps {
    isColored?: boolean;
};
const Text = styled.h1<ITextProps>`
    ${({ theme, isColored }) => `
        color: ${isColored ? theme.colors.caption : theme.colors.primary};
        font-size: ${theme.size.h2};
        font-weight: 700;
        font-family: ${theme.font.body};
        margin-right: ${isColored ? '8px' : ''};
    `};
`;
const SIcon = styled(Icon)`
    width: 50px;
    height: 50px;
`;