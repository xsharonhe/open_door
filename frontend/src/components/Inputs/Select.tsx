import React from "react";
import styled from "styled-components";

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    hidden?: boolean;
    options: string[];
}

export const Select: React.FC<SelectProps> = ({
  hidden,
  options,
  children,
  ...props
}): React.ReactElement => (
  <Wrapper>
    <StyledSelect>
      <SOption value="" hidden={true}>
        {children}
      </SOption>
      {options.map((option) => (
        <SOption key={option} value={option} hidden={false}>
          {option}
        </SOption>
      ))}
    </StyledSelect>
  </Wrapper>
);

const Wrapper = styled.div``;

const StyledSelect = styled.select`
  ${({ theme }) => `
        width: auto;
        padding: 0.7rem 1.25rem;
        font-size: ${theme.size.default};
        font-family: ${theme.font.body};
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
    `};
`;

const SOption = styled.option`
  ${({ theme, hidden }) => `
        color: ${theme.colors.text};
        background-color: ${theme.colors.background};
        display: ${ hidden ? 'none' : 'flex'};
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    `};
`;