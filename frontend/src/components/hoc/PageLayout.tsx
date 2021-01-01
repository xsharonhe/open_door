import React from "react";
import styled from "styled-components";
import { media } from "../../utils";

export interface PageLayoutProps {
  img?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  img,
  children,
  ...props
}) => (
  <SDiv img={img} {...props}>
    <MainWrapper>{children}</MainWrapper>
  </SDiv>
);

interface IDivProps {
  img?: string;
}

const SDiv = styled.div<IDivProps>`
  ${({ img }) => `
    background-image: url(${img});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;
    `}
`;

const MainWrapper = styled.main`
  margin: 0 6rem;
  padding-top: 6rem;
  ${media(
    "mobile",
    `
      margin: 0 1rem;
        `
  )}
`;
