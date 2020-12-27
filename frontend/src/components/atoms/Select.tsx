import styled from "styled-components";

export const Select = styled.select`
    ${({ theme }) => `
        width: auto;
        padding: 0.7rem 1.25rem;
        font-size: ${theme.size.default};
        font-family: ${theme.font.body};
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};

        option {
            color: ${theme.colors.text};
            background: ${theme.colors.background};
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
        }
    `};
`;
