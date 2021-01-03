import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
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

export interface RentalProps {
    id: string;
    night_price: number;
    num_of_baths: number;
    num_of_rooms: number;
    name: string;
    airbnb_neighborhood: string;
    capacity_of_people: number;
    property_type: string;
    reviews_count: number;
    start_rating: number;
    created_at: string;
    num_of_beds: number;
    lat: string;
    lon: string;
}

const Home: React.FC = ({
    ...props
}): React.ReactElement => {
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [searchResults, setSearchResults] = useState<ReviewProps[]>([]);
    const [rentalResults, setRentalResults] = useState<RentalProps[]>([]);
    useEffect(() => {
        setIsOpen(true);
        if(searchInput === '') {
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
        axios
            .get(`http://localhost:8000/api/v1/rentals/search/?page=1&search=${searchInput}`)
            .then(res => {
                const data = res.data.results;
                setRentalResults(data);
            })
            .catch(err => {
                setError(true);
            });
    }, [searchInput]);

    let history = useHistory();

    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false); 
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
    <PageLayout lgImg={lgImg} smImg={smImg}>
        <Container className="searchBar">
            <SInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSearchInput(e.target.value);
                            console.log(searchResults);
                        }} 
                placeholder="Search here"
            />
            {!!isOpen && (
                <SearchContainer ref={wrapperRef}>
                    {!!searchResults || !!error  ? searchResults.map((search) => (
                            <SearchOption onClick={() => history.push(`/discover/eviews/${search.id}`)} key={search.name}>
                                {search.name}
                            </SearchOption>
                        )) :
                        <SearchOption>No results could be found</SearchOption>
                    }
                    {!!rentalResults || !!error ? rentalResults.map((rental) => (
                            <SearchOption onClick={() => history.push(`/discover/rentals/${rental.id}`)} key={rental.name}>
                                {rental.name}
                            </SearchOption>
                        )) :
                        <SearchOption>No results could be found</SearchOption>
                    }
                </SearchContainer>
            )}
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
    `};
`;
const SearchContainer = styled.div`
    overflow-y: scroll;
    width: 50%;
    height: 250px;

    ${media('tablet',
        `
        width: 70%;
        `
    )};
`;

export default Home;