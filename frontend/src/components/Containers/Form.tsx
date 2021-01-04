import styled from "styled-components";

export const Container = styled.div`
    max-width: max(414px, 444px);
    margin: 10px auto;
    box-sizing: border-box;
    padding: 2%;
`;

export const IconDiv = styled.div`
${({ theme }) => `
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${theme.colors.accent};
    height: 40px;
    width: 40px;
    margin: 0 auto;
  `}
`;

export const Icon = styled.svg`
  width: 30px;
  height: 30px;
  ${({ theme }) => `
        color: ${theme.colors.background};
    `};
`;

export const Form = styled.form`
    > Input, Button {
        width: 96%;
        margin: 2%;
    }
`;

export const LinkContainerDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

export const LinkDiv = styled.div`
    cursor: pointer;
`