import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { Input } from '../components/Inputs/';
import { PageLayout } from '../components/hoc/PageLayout';
import lgImg from "../assets/bg-houses.svg";
import smImg from "../assets/bg-houses-mobile.svg";
import { media, ReviewProps, RentalProps } from "../utils";

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
            setRentalResults([]);
        }
        if (searchInput.length >= 1) {
            axios
                .get(`http://localhost:8000/api/v1/reviews_search/?page=1&search=${searchInput}`)
                .then(res => {
                    const data = res.data.results;
                    setSearchResults(data);
                })
                .catch(err => {
                    setRentalResults([]);
                    setSearchResults([]);
                    setError(true);
                });
            axios
                .get(`http://localhost:8000/api/v1/rentals_search/?page=1&search=${searchInput}`)
                .then(res => {
                    const data = res.data.results;
                    setRentalResults(data);
                })
                .catch(err => {
                    setRentalResults([]);
                    setSearchResults([]);
                    setError(true);
                });
        }
    }, [searchInput]);
    
    let history = useHistory();

    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false); 
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
    <PageLayout lgImg={lgImg} smImg={smImg}>
        <Container>
            <SInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSearchInput(e.target.value);
                        }} 
                placeholder="Search here"
            />
            {!!isOpen && (
                <SearchContainer ref={wrapperRef}>
                    {!!searchResults && searchResults.map((search) => (
                            <SearchOption onClick={() => history.push(`/discover/reviews/${search.id}`)} key={search.name}>
                                {search.name}
                            </SearchOption>
                        ))
                    }
                    {!!rentalResults && ( rentalResults.map((rental) => (
                            <SearchOption onClick={() => history.push(`/discover/rentals/${rental.id}`)} key={rental.name}>
                                {rental.name}
                            </SearchOption>
                    )))}
                    {!!error && (
                        <SearchOption>No results could be found</SearchOption>
                    )}
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
        box-shadow: 0 6px 2px 0 rgba(0,0,0,0.2);
        padding: 20px;
        overflow-x: hidden;

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
    overflow-x: hidden;

    ${media('tablet',
        `
        width: 70%;
        `
    )};
`;

export default Home;