import React from 'react';
import styled from 'styled-components';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    bold?: boolean;
    size?: string;
    lineHeight?: number | string;
};

export const Text: React.FC<ITextProps> = ({
    children,
    color = 'text',
    size = 'default',
    lineHeight = '1.25',
    ...props
}): React.ReactElement => (
    <SText size={size} color={color} lineHeight={lineHeight} {...props}>
        {children}
    </SText>
);

const SText = styled.p<ITextProps>`
    ${({ theme, bold, lineHeight, color = 'text', size = 'default' }): string => `
        color: ${theme.colors[color] || color};
        font-size: ${theme.size[size] || size};
        line-height: ${lineHeight || 1.25};
        font-weight: ${bold ? 'bold' : 'normal'};
    `}
`;
