import React from 'react';
import styled from 'styled-components';
import { PeopleOutline } from '@styled-icons/evaicons-outline/PeopleOutline';
import { Bed } from '@styled-icons/boxicons-solid/Bed';
import { Bath } from '@styled-icons/boxicons-solid/Bath';
import { media } from '../../utils';

export interface ResultCardProps extends React.HTMLAttributes<HTMLDivElement> {
    price: string | number;
    city: string;
    address: string;
    bedrooms: string | number;
    bathrooms: string | number;
    people: string | number;
};

export const ResultCard: React.FC<ResultCardProps> = ({
    price,
    city,
    address,
    bedrooms,
    bathrooms,
    people,
    ...props
}): React.ReactElement => (
    <SResultCard price={price} city={city} people={people} address={address} bedrooms={bedrooms} bathrooms={bathrooms} {...props}>
        <h2>${price}</h2>
        <p>{city.toUpperCase()}</p>
        <p>{address}</p>
        <hr />
        <SContainer>
            <span>
                <Icon as={PeopleOutline} /> {people}
            </span>
            <span>
                <Icon as={Bed} /> {bedrooms}
            </span>
            <span>
                <Icon as={Bath} /> {bathrooms}
            </span>
        </SContainer>
    </SResultCard>
);

const SResultCard = styled.div<ResultCardProps>`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
        border: 1px solid ${theme.colors.primary};
        border-radius: ${theme.radius.border};
        padding: 0.7rem 1.25rem;
        width: 80%;
        font-family: ${theme.font.body};
        cursor: pointer;
        color: ${theme.colors.primary};
        :hover {
            transition: ${theme.transitions.cubicBezier};
            box-shadow: ${theme.boxShadow.topBottom};
            transform: ${theme.transitions.scale};
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