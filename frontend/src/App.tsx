import React from "react";
import { Button, Select, ResultCard } from "./components";
import { strings } from "./utils";

const App = () => {
  return (
    <div className="App">
        <p>Buttons:</p>
        <Button>{strings.buttons.signin}</Button>
        <Button isInverted={false}>{strings.buttons.signin}</Button>

        <p>Select:</p>
        <Select options={['1', '2', '3']}>
          Select
        </Select>

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
    </div>
  );
};

export default App;
