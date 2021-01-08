import React, { useState, useEffect, useRef } from 'react';
import { useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';
import { Input } from '../components/Inputs/';
import { PageLayout } from '../components/hoc/PageLayout';
import lgImg from "../assets/bg-houses.svg";
import smImg from "../assets/bg-houses-mobile.svg";
import { media, ReviewProps, RentalProps } from "../utils";

const CustomToastWithLink = () => (
    <div>
      For more information about all our features, 
      feel free to visit our <SLink to="/faq">faq page</SLink>!
    </div>
);
const SLink = styled(Link)`
    ${({ theme }) => `
        color: ${theme.colors.secondary};
        text-decoration: underline;
        font-weight: 700;
    `};
`;

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
                .get(`${process.env.REACT_APP_API_URL}/api/v1/reviews_search/?page=1&search=${searchInput}`)
                .then(res => {
                    const data = res.data.results;
                    setSearchResults(data);
                })
                .catch(err => {
                });
            axios
                .get(`${process.env.REACT_APP_API_URL}/api/v1/rentals_search/?page=1&search=${searchInput}`)
                .then(res => {
                    const data = res.data.results;
                    setRentalResults(data);
                })
                .catch(err => {
                    
                });
        }
    }, [searchInput]);

    useEffect(() => {
        notify();
    },[]);
    
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

    const notify = () => {
        toast(CustomToastWithLink);
    };

    return (
    <PageLayout lgImg={lgImg} smImg={smImg}>
        <SToastContainer autoClose={8000}/>
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

const SToastContainer = styled(ToastContainer)`
    ${({ theme }) => `
        .Toastify__toast {
            border-radius: ${theme.radius.border};
            padding: 20px;
            font-family: ${theme.font.body};
            color: ${theme.colors.background};
            background-color: ${theme.colors.primary};
        }
    `};
`;
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