import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input } from '../components/Inputs/';
import { PageLayout } from '../components/hoc/PageLayout';
import lgImg from "../assets/bg-houses.svg";
import smImg from "../assets/bg-houses-mobile.svg";
import { media } from "../utils";

export interface ReviewProps {
    id: string;
    name: string;
    review_count: number;
    rating: string;
    status: string;
    price: number;
    display_phone: string;
    address: string;
    summary: string;
    score: string;
    lat: string;
    lon: string;
};

const Home: React.FC = ({
    ...props
}): React.ReactElement => {
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState(false);
    const [searchResults, setSearchResults] = useState<ReviewProps[]>([]);
    useEffect(() => {
        if(searchInput == '') {
            setSearchResults([]);
        }
        axios
            .get(`http://localhost:8000/api/v1/reviews/search/?page=1&search=${searchInput}`)
            .then(res => {
                const data = res.data.results;
                setSearchResults(data);
            })
            .catch(err => {
                setError(true);
            });
    }, [searchInput]);

    return (
    <PageLayout lgImg={lgImg} smImg={smImg}>
        <Container>
            <SInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSearchInput(e.target.value);
                            console.log(searchResults);
                        }} 
                placeholder="Search here"
            />
            {!!searchResults || !!error ? searchResults.map((search) => (
                    <SearchOption key={search.name}>{search.name}</SearchOption>
                )) :
                <SearchOption>No results could be found</SearchOption>
            }
        </Container>
    </PageLayout>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 200px 0;

    & > * {
        width: 50%;
        ${media('tablet',
            `
            width: 70%;
            `
        )};
    }
`;
const SInput = styled(Input)`
    ${({ theme }) => `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.background};
        ::placeholder {
            color: ${theme.colors.background};
        }
        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: ${theme.colors.background};
        }
        ::-ms-input-placeholder { /* Microsoft Edge */
            color: ${theme.colors.background};
        }
    `};
`;
const SearchOption = styled.div`
    ${({ theme }) => `
        width: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${theme.colors.background};
        box-shadow: ${theme.boxShadow.shallow};
        padding: 20px;

        :hover {
            transform: ${theme.transitions.scale};
            box-shadow: ${theme.boxShadow.topBottom};
        }

        ${media('tablet',
            `
            width: 65%;
            `
        )};
    `};
`;

export default Home;