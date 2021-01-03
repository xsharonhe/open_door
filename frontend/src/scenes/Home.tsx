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
        }
        if(searchInput.length >= 1) {
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
        }
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
        <Container className="searchBar">
            <SInput 
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setSearchInput(e.target.value);
                        }} 
                placeholder="Search here"
            />
            {!!isOpen && (
                <SearchContainer ref={wrapperRef}>
                    {!!searchResults || !!error  ? searchResults.map((search) => (
                            <SearchOption onClick={() => history.push(`/discover/reviews/${search.id}`)} key={search.name}>
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