import { PageLayout } from '../components/hoc/PageLayout';
import React from "react";
import { Bulb } from "@styled-icons/boxicons-regular/Bulb";
import {
  Button,
  Select,
  ResultCard,
  Heading,
  SModal,
  Input,
  Text,
  Table,
} from "../components";
import { strings } from "../utils";

const Discover = () => {
  const columns = [
    {
      Header: "Category",
      accessor: "col_category",
      Cell: (cell: any) => (
        <Button key={cell.row.original.key}>{cell.row.original.label}</Button>
      ),
    },
    {
      Header: "Picker",
      accessor: "col_pick",
      Cell: (cell: any) => (
        <Button key={cell.row.original.key}>{cell.row.original.label}</Button>
      ),
    },
    {
      Header: "Happiness",
      accessor: "Happy",
      Cell: (cell: any) => (
        <Button key={cell.row.original.key}>{cell.row.original.label}</Button>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      label: "smile",
    },
    {
      id: "2",
      label: "hello!",
    },
  ];


  return (
      <PageLayout>

        <Heading coloredText="Hello">
          Danielle!
        </Heading>
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

        <Text>Table:</Text>
        <Table columns={columns} data={data} />
      </PageLayout>
  );
};

export default Discover;