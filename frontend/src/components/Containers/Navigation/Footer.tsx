import React from "react";
import styled from "styled-components";
import { media } from "../../../utils/media";

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => (
  <FooterWrapper {...props}>
    <Wrapper>
      <p>TODO: Footer</p>
    </Wrapper>
  </FooterWrapper>
);

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 0 6rem;
  `}
  ${media(
    "mobile",
    `
      padding: 0 2rem;
        `
  )}
`;

const FooterWrapper = styled.div`
  ${({ theme }) => `
    background-color: ${theme.colors.background};
    width: 100%;
    `}
`;
