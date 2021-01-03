import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Android } from '@styled-icons/boxicons-logos/Android';
import { PageLayout } from '../components/hoc/PageLayout';
import {
  Button,
  Select,
  ResultCard,
  Heading,
  SModal,
  Input,
  Text,
  ReviewCard
} from "../components";
import { strings, ReviewProps } from "../utils";

const Discover = () => {

  return (
      <PageLayout>

        <Heading icon={Android} coloredText="Hello">
          Danielle!
        </Heading>
        <p>Buttons:</p>
        <Button isInverted={false}>{strings.buttons.signin}</Button>

        <p>Select:</p>
        <Select options={["1", "2", "3"]}>Select</Select>

        <p>Result Card:</p>
        <ResultCard
          price={"550"}
          city={"Waterloo"}
          address={"123 Alphabet Rd"}
          bedrooms={"2"}
          bathrooms={"1"}
          people={"6"}
        >
          Hey
        </ResultCard>
        <p> ReviewCard: </p>
        <ReviewCard 
          name="Thai Villa"
          status="Positive"
          address="5 E 19th St"
          dollarSigns={2}
          score="78.7"
        />

        <p>Modal</p>
        <SModal
          childComponent={<Heading coloredText="Hey">Non-Friend!</Heading>}
        >
          Open Meee!
        </SModal>

        <Text bold lineHeight="1.25">
          Input:
        </Text>
        <Input placeholder="Add an email" />

      </PageLayout>
  );
};

export default Discover;