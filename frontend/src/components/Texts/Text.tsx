import React from 'react';
import styled from 'styled-components';

export interface ITextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: string;
    bold?: boolean;
    size?: string;
    align?: string;
    lineHeight?: number | string;
};

export const Text: React.FC<ITextProps> = ({
    children,
    color = 'text',
    size = 'default',
    lineHeight = '1.25',
    align = 'left',
    ...props
}): React.ReactElement => (
    <SText size={size} color={color} lineHeight={lineHeight} align={align} {...props}>
        {children}
    </SText>
);

const SText = styled.p<ITextProps>`
    ${({ theme, bold, lineHeight, color = 'text', size = 'default', align }): string => `
        color: ${theme.colors[color] || color};
        font-size: ${theme.size[size] || size};
        line-height: ${lineHeight || 1.25};
        font-weight: ${bold ? 'bold' : 'normal'};
        text-align: ${align};
    `}
`;
