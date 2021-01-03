import React from "react";
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
import { strings } from "../utils";

export const Rental = () => {
  return (
      <PageLayout>

        <p>Buttons:</p>

        <Button isInverted={true}>{strings.buttons.signin}</Button>
        <Button isInverted={false}>{strings.buttons.signin}</Button>

        <p>Select:</p>
        <Select options={["1", "2", "3"]}>Select</Select>

        <p>Result Card:</p>
        <ResultCard
          price={"550"}
          city={"Waterloo"}
          address={"123 Alphabet Rd"}
          feet={"1200"}
          bedrooms={"2"}
          bathrooms={"1"}
        >
          Hey
        </ResultCard>

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

export default Rental;