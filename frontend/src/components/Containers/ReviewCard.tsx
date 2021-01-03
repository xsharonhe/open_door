import React from 'react';
import styled from 'styled-components';
import { PricetagMultiple } from '@styled-icons/foundation/PricetagMultiple';
import { RateReview } from '@styled-icons/material/RateReview';
import { media } from '../../utils';

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    status: string;
    address: string;
    dollarSigns: number;
    score: string | number;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
    name,
    status,
    address,
    dollarSigns,
    score,
    ...props
}): React.ReactElement => {
    const getString = (input: number): string => {
        switch(input) {
            case 1:
                return "$"
            case 3:
                return "$$$"
            case 4: 
                return "$$$$"
            default:
                return "$$"
        }
    };
    return (
        <SReviewCard {...props}>
            <h2>{name}</h2>
            <Status status={status}>{status.toUpperCase()}</Status>
            <p>{address}</p>
            <hr />
            <SContainer>
                <span>
                    <Icon as={PricetagMultiple} /> {getString(dollarSigns)}
                </span>
                <span>
                    <Icon as={RateReview} /> {score}
                </span>
            </SContainer>
        </SReviewCard>
    )
}

const Status = styled.p<Pick<ReviewCardProps, "status">>`
    ${({ theme, status }) => `
        color: ${status === 'Positive' ? theme.colors.success : theme.colors.primary};
        colors: ${status === 'Negative' ? theme.colors.error : theme.colors.primary};
        }
    `};
`;

const SReviewCard = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
        padding: 0.7rem 1.25rem;
        width: 70%;
        font-family: ${theme.font.body};
        cursor: pointer;
        color: ${theme.colors.primary};
        :hover {
            transition: ${theme.transitions.cubicBezier};
            box-shadow: ${theme.boxShadow.topBottom};
        }

        h2 {
            font-size: ${theme.size.h2};
            margin: 0;
            padding-bottom: 0.5rem;
        }

        p {
            font-size: ${theme.size.default};
            margin: 0;
        }
    `}
    ${media(
        "tablet",
        `
        width: 50%;
        `
    )}
    ${media(
        "mobile",
        `
        width: 80%;
        `
    )}
`;

const SContainer = styled.div`
    display: flex;
    justify-content: space-between;
    ${media(
        "tablet",
        `
        flex-direction: column;
        `
    )}
`;
const Icon = styled.svg`
    width: 20px;
    height: 20px;
    ${({ theme }) => `
        color: ${theme.colors.primary};
    `};
`;