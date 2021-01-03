import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Input } from '../components/Inputs/';
import { PageLayout } from '../components/hoc/PageLayout';
import lgImg from "../assets/bg-houses.svg";
import smImg from "../assets/bg-houses-mobile.svg";

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
    const [searchResults, setSearchResults] = useState<ReviewProps[]>([]);
    useEffect(() => {
        if(searchInput.length === 2) {
            axios.get(`http://localhost:8000/api/v1/reviews/search/?page=1&search=${searchInput}`)
            .then(res => {
                const data = res.data.results;
                setSearchResults(data);
            });
        }
    }, [searchInput]);

    return (
    <PageLayout lgImg={lgImg} smImg={smImg}>
        <Container>
            <Input 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSearchInput(e.target.value);
                        }} 
                placeholder="Search here"
            />
            {!!searchResults && searchResults.map((search) => (
                <SearchOption key={search.name}>{search.name}</SearchOption>
            ))}
        </Container>
    </PageLayout>
    )
};

const Container = styled.div`
    & > * {
        width: 50%;
        text-align: center;
    }
`;
const SearchOption = styled.div`
    ${({ theme }) => `
        display: flex;
        justify-content: center;
        background-color: ${theme.colors.background};
        height: 60px;
    `};
`;

export default Home;