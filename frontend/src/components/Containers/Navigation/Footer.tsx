import React from "react";
import styled from "styled-components";

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => (
  <FixedWrapper {...props}>
    <Wrapper>
      <p>TODO: Footer</p>
    </Wrapper>
  </FixedWrapper>
);

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    height: 100%;
    justify-content: space-between;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 0 6rem;
  `}
`;

const FixedWrapper = styled.nav`
  ${({ theme }) => `
    background-color: ${theme.colors.background};
    width: 100%;
    `}
`;
