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
<<<<<<< HEAD
        <Select options={['1', '2', '3']}>
          Select
=======
        <Select>
          <option value="" hidden>Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
>>>>>>> beb1bb8b0724b3d0eeaa2b677dccbadf5dd311ca
        </Select>
      </header>
    </div>
  );
};

export default App;
