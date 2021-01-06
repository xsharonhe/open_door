import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Text } from "../../Texts";
import { media } from "../../../utils/media";

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
  let history = useHistory();
  return (
    <FooterWrapper {...props}>
      <Wrapper>
        <AboutDiv>
          <Text color="secondary" bold>
            OPEN DOOR
          </Text>
          <Text color="secondary">
            <i>Open Door</i> is designed to help students find the ideal rental
            suiting their unique budget and preferences!
          </Text>
        </AboutDiv>
        <div>
          <Text color="secondary" bold>
            LEARN MORE
          </Text>
          <StyledSpan onClick={() => history.push("/faq")} >
            <Text color="secondary">FAQ</Text>
          </StyledSpan>
          <a target="_blank" href="https://www.google.ca/"> 
            <Text color="secondary">Git Repo</Text>
          </a>
        </div>
      </Wrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    justify-content: space-between;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 2rem 6rem;
  `}
  ${media(
    "mobile",
    `
      padding: 0 2rem;
        `
  )}
`;

const AboutDiv = styled.div`
  width: 60%;
`;

const StyledSpan = styled.span`
    cursor: pointer;
`;
