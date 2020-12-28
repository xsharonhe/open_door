import React from "react";
import { Bulb } from "@styled-icons/boxicons-regular/Bulb";
import { 
  Button, 
  Select, 
  ResultCard, 
  Heading 
} from "./components";
import { strings } from "./utils";

const App = () => {
  return (
    <div className="App">
        <Heading icon={Bulb} coloredText="Hello">
            Danielle!
        </Heading>
        <p>Buttons:</p>

        <Button isInverted={true}>{strings.buttons.signin}</Button>
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
