import React from 'react';
import styled from 'styled-components';
import { Home } from '@styled-icons/boxicons-solid/Home';
import { Bed } from '@styled-icons/boxicons-solid/Bed';
import { Bath } from '@styled-icons/boxicons-solid/Bath';
import { Icon, IconProps } from './Icon';
import { media } from '../../utils';

export interface ResultCardProps extends React.HTMLAttributes<HTMLDivElement> {
    price: string;
    city: string;
    address: string;
    feet: string;
    bedrooms: string;
    bathrooms: string;
    iconProps?: IconProps;
};

export const ResultCard: React.FC<ResultCardProps> = ({
    price,
    city,
    address,
    feet,
    bedrooms,
    bathrooms,
    iconProps,
    ...props
}): React.ReactElement => (
    <SResultCard price={price} city={city} address={address} feet={feet} bedrooms={bedrooms} bathrooms={bathrooms} {...props}>
        <h2>${price}</h2>
        <p>{city.toUpperCase()}</p>
        <p>{address}</p>
        <hr />
        <SContainer>
            <span>
                <Icon icon={Home} {...iconProps} /> {feet.concat(" ft")}
            </span>
            <span>
                <Icon icon={Bed} {...iconProps} /> {bedrooms}
            </span>
            <span>
                <Icon icon={Bath} {...iconProps} /> {bathrooms}
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
        width: 18%;
        font-family: ${theme.font.body};
        cursor: pointer;
        color: ${theme.colors.primary};
        :hover {
            transform: ${theme.transitions.scale};
            transition: ${theme.transitions.cubicBezier};
            box-shadow: ${theme.transitions.boxShadow};
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