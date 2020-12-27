import React from 'react';
import styled from "styled-components";

export interface SelectProps {
    options: string[];
};

export const Select: React.FC<SelectProps> = ({
    options,
    children,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <StyledSelect>
            <SOption value='' hidden>{children}</SOption>
            {options.map((option, index) => (
                <SOption key={option} value={option}>
                    {option}
                </SOption>
            ))}
        </StyledSelect>
    </Wrapper>
);

const Wrapper = styled.div``;
export const StyledSelect = styled.select`
    ${({ theme }) => `
        width: auto;
        padding: 0.7rem 1.25rem;
        font-size: ${theme.size.default};
        font-family: ${theme.font.body};
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
    `};
`;
const SOption = styled.option`
      ${({ theme }) => `
          color: ${theme.colors.text};
          background: ${theme.colors.background};
          display: flex;
          white-space: pre;
          min-height: 20px;
          padding: 0px 2px 1px;
      `};
`;
