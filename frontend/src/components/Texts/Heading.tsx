import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
interface IHeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
    icon?: StyledIcon;
    coloredText?: string;
};

export const Heading: React.FC<IHeadingProps> = ({
    coloredText,
    children,
    icon,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            {!!icon && (
                <Icon as={icon} />
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
const Icon = styled.svg`
    width: 50px;
    height: 50px;
`;