import React, { useEffect } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import { checkAuth } from "../../store/actions/authActions";
import { loadProfile } from "../../store/actions/profileActions";

import { Navbar, SideNav, Footer } from "../Containers/Navigation";

export interface LayoutProps {
  checkAuth: Function;
  loadProfile: Function;
}

const Layout: React.FC<LayoutProps> = ({
  checkAuth,
  loadProfile,
  children,
  ...props
}) => {
  useEffect(() => {
    checkAuth();
    loadProfile();
  }, []);

  return (
    <div {...props}>
      <Navbar />
      <SideNav />
      <MainWrapper>{children}</MainWrapper>
      <Footer />
    </div>
  );
};
const MainWrapper = styled.main`
  margin: 0;
`;

export default connect(null, { checkAuth, loadProfile })(Layout);
