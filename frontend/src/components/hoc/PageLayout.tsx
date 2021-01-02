import React from "react";
import styled from "styled-components";
import { media } from "../../utils";

export interface PageLayoutProps {
  lgImg?: string;
  smImg?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  lgImg,
  smImg,
  children,
  ...props
}) => {
  return (
    <SDiv lgImg={lgImg} smImg={smImg} {...props}>
    <MainWrapper>{children}</MainWrapper>
  </SDiv>
  )
}

interface IDivProps {
  lgImg?: string;
  smImg?: string;
};
const SDiv = styled.div<IDivProps>`
  ${({ lgImg, smImg }) => `
    background-image: url(${lgImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;

    @media only screen and (max-width: 414px) {
      background-image: url(${smImg});
    }
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
