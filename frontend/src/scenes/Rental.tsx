import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import recharts from "recharts";
import { RouteComponentProps } from "react-router-dom";
import { PageLayout } from '../components/hoc/PageLayout';
import {
  Button,
  Select,
  ResultCard,
  Heading,
  SModal,
  Input,
  Text,
} from "../components";
import { strings, RentalProps } from "../utils";

type TParams = { id: string};

export const Rental = ({
  match
}: RouteComponentProps<TParams>) => {
  const [error, setError] = useState(false);
  const [rentalResult, setRentalResult] = useState<RentalProps>();
  useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/rentals_stats/${match.params.id}`)
            .then(res => {
                const data = res.data.query;
                setRentalResult(data);
            })
            .catch(err => {
                setError(true);
            });
  }, []);
  return (
      <PageLayout>
        {!!rentalResult && (
            <Wrapper>
              <Heading>{rentalResult.name}</Heading>
            </Wrapper>
        )}  
      </PageLayout>
  );
};

const Wrapper = styled.div`
`;
export default Rental;