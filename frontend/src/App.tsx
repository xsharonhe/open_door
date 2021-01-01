import React from "react";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { baseTheme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { Layout } from "./components/hoc/Layout";

import Home from './scenes/Home';
import Discover from './scenes/Discover';

const App = () => {

  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/discover" component={Discover} />
    </Switch>
  )

  return (

    <BrowserRouter>
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
      <Layout>
        {routes}
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
  )
};

export default App;
