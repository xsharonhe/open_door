import React from 'react';
import styled from 'styled-components';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string | number | string[];
    error?: boolean | string;
    success?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
    ...props
}): React.ReactElement => (
    <SInput {...props} />
);

const SInput = styled.input<InputProps>`
    ${({ theme }) => `
        font-size: ${theme.size.default};
        transition: ${theme.transitions.cubicBezier};
        background-color: ${theme.colors.primaryO};
        color: ${theme.colors.hover};
        font-weight: 500;
        font-family: ${theme.font.body};
        border-radius: ${theme.radius.border};
        outline: none;
        border: none;
        padding: 20px;
        box-shadow: ${theme.boxShadow.shallow};
        width: auto;
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
        &:focus {
            box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.15);
        }
        ::placeholder {
            color: ${theme.colors.caption};
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: ${theme.colors.caption};
        }
        ::-ms-input-placeholder { /* Microsoft Edge */
            color: ${theme.colors.caption};
        }
    `};
`;