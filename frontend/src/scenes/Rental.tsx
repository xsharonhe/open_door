import React, { useState, useEffect } from "react";
import axios from "axios";
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
            .get(`http://localhost:8000/api/v1/rentals/${match.params.id}`)
            .then(res => {
                const data = res.data;
                setRentalResult(data);
            })
            .catch(err => {
                setError(true);
            });
  }, []);
  return (
      <PageLayout>
        {!!rentalResult && <div>{rentalResult.name}</div>}
      </PageLayout>
  );
};

export default Rental;