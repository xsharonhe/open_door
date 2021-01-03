import React from "react";
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { baseTheme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { Layout } from "./components/hoc/Layout";

import Home from './scenes/Home';
import Discover from './scenes/Discover';
import SignIn from './scenes/SignIn';
import Rental from './scenes/Rental';
import Review from './scenes/Review';

const App = () => {

  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/discover" component={Discover} />
      <Route path="/discover/rentals/:id" component={Rental} />
      <Route path="/discover/reviews/:id" component={Review} />
      <Route path="/signin" component={SignIn} />
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
