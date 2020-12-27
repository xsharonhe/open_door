import React from 'react';
import { Button } from './components';
import { strings } from './utils';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button>
          {strings.buttons.signin}
        </Button>
      </header>
    </div>
  );
}

export default App;
