import React from "react";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import { baseTheme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { Layout } from "./components/hoc/Layout";
import Home from './scenes/Home';

const App = () => {

// TODO: Add switch for routing
  return (

    <BrowserRouter>
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
  )
};

export default App;
