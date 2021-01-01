import React from "react";
import styled from "styled-components";

export interface IBrandProps {};

export const Brand: React.FC<IBrandProps> = ({
  children,
  ...props
}): React.ReactElement => {
    return <BrandWrapper {...props}>{children}</BrandWrapper>;
};

const BrandWrapper = styled.div`
  ${({ theme }) => `
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 1.2rem;
    `}
`;
