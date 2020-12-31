import React from "react";
import styled from "styled-components";

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => (
  <FixedWrapper>
      <Wrapper>
        <p>TODO: Footer</p>
      </Wrapper>
  </FixedWrapper>
);

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  background-color: grey;
  padding: 0 6rem;
`;

const FixedWrapper = styled.nav`
  ${({ theme }) => `
    background-color: ${theme.colors.background};
    width: 100%;
    `}
`;
