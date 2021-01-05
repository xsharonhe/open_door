import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Profile from '../../scenes/Profile';

interface IPrivateUrl {
  isAuthenticated: boolean;
}

const PrivateUrl: React.FC<IPrivateUrl> = ({
  isAuthenticated,
}): React.ReactElement => {

  return (
    <Route path="/profile" render={ () => isAuthenticated ? Profile : <Redirect to="/signin" /> } />
  )

  // if (isAuthenticated) {
  //   return <Route path="/profile" component={Profile} />
  // } else {
  //   return <Redirect to="/signin" />
  // }
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(PrivateUrl);
