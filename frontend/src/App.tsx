import React from "react";
import { Button, Select } from "./components";
import { strings } from "./utils";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Buttons:</p>
        <Button isInverted={true}>{strings.buttons.signin}</Button>
        <Button isInverted={false}>{strings.buttons.signin}</Button>
        
        <p>Select:</p>
        <Select options={['1', '2', '3']}>
          Select
        </Select>
      </header>
    </div>
  );
};

export default App;
