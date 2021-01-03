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
import { strings, ReviewProps } from "../utils";

type TParams = { id: string};

export const Rental = ({
  match
}: RouteComponentProps<TParams>) => {
  const [error, setError] = useState(false);
  const [reviewResult, setReviewResult] = useState<ReviewProps>();
  useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/reviews/${match.params.id}`)
            .then(res => {
                const data = res.data;
                setReviewResult(data);
            })
            .catch(err => {
                setError(true);
            });
  }, [error]);
  return (
      <PageLayout>
        {!!reviewResult && <div>{reviewResult.name}</div>}
      </PageLayout>
  );
};

export default Rental;