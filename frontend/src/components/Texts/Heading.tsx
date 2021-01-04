import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { media } from '../../utils';
interface IHeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
    icon?: StyledIcon;
    coloredText?: string;
    rightColoredText?: string;
};

export const Heading: React.FC<IHeadingProps> = ({
    coloredText,
    rightColoredText,
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
            {!!rightColoredText && (
                <Text isColored>
                    {rightColoredText}
                </Text>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${media('tablet',
        `
        flex-direction: column;
        text-align: center;
        `
    )};
`;
interface ITextProps {
    isColored?: boolean;
};
const Text = styled.h1<ITextProps>`
    ${({ theme, isColored }) => `
        color: ${isColored ? theme.colors.caption : theme.colors.primary};
        font-size: ${theme.size.large};
        font-weight: 900;
        font-style: normal;
        word-spacing: 0.1cm;
        font-family: ${theme.font.header};
        margin-right: 8px;
    `};
`;
const Icon = styled.svg`
    width: 50px;
    height: 50px;
`;