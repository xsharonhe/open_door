import React from "react";
import styled from "styled-components";

export interface IBrandProps {
  color?: string;
};

export const Brand: React.FC<IBrandProps> = ({
  color,
  children,
  ...props
}): React.ReactElement => {
    return <BrandWrapper color={color} {...props}>{children}</BrandWrapper>;
};

const BrandWrapper = styled.div<IBrandProps>`
  ${({ theme, color = 'primary' }) => `
    color: ${theme.colors[color] || color};
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    `}
`;
