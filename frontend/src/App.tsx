import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { baseTheme } from "./theme/theme";
import { GlobalStyle } from "./theme/GlobalStyle";
import Layout from "./components/hoc/Layout";

import { Provider } from "react-redux";
import store from "./store/store";

import Home from "./scenes/Home";
import Discover from "./scenes/Discover";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import Rental from "./scenes/Rental";
import Review from "./scenes/Review";
import Profile from "./scenes/Profile";
import Faqs from "./scenes/Faqs";

const App = () => {
  const routes = (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/discover" component={Discover} />
      <Route path="/discover/rentals/:id" component={Rental} />
      <Route path="/discover/reviews/:id" component={Review} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/faqs" component={Faqs} />
    </Switch>
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={baseTheme}>
          <GlobalStyle />
          <Layout>{routes}</Layout>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
