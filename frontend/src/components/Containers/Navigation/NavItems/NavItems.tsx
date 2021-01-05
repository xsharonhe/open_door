import React from "react";
import styled from "styled-components";
import { media } from "../../../../utils/media";
import { NavItem } from "./NavItem/NavItem";
import { connect } from "react-redux";
import { signout } from "../../../../store/actions/authActions";
import Cookies from "js-cookie";

export interface NavItemsProps {
  isAuthenticated: boolean;
  signout: Function;
}

const NavItems: React.FC<NavItemsProps> = ({ isAuthenticated, signout }) => {

  const handleSignOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const token = Cookies.get('csrftoken');
    signout(token);
  };

  const guestItems = (
    <SUl>
      <NavItem link="/">Home</NavItem>
      <NavItem link="/discover">Discover</NavItem>
      <NavItem link="/signup">Sign Up</NavItem>
      <NavItem link="/signin">Sign In</NavItem>
    </SUl>
  );

  const authItems = (
    <SUl>
      <NavItem link="/">Home</NavItem>
      <NavItem link="/discover">Discover</NavItem>
      <NavItem link="/profile">Profile</NavItem>
      <SLink onClick={handleSignOut} href="#!">
        Sign Out
      </SLink>
    </SUl>
  );

  return <SNav>{isAuthenticated ? authItems : guestItems}</SNav>;
};

const SNav = styled.nav`
  display: flex;
`;

const SUl = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  ${media(
    "tablet",
    `
            flex-direction: column;
            padding: 0;
            `
  )}
`;

const SLink = styled.a`
  ${({ theme }) => `
        display: flex;
        text-transform: uppercase;
        align-items: center;
        font-size: 0.8rem;
        color: ${theme.colors.primary};
        padding: 1rem;
        margin: 0 1rem;
        &:hover {
            color: ${theme.colors.hover};
            cursor: pointer;
        }
        &.active {
            font-weight: 700;
        }
    `}
  ${media(
    "tablet",
    `
            margin: 0;
            `
  )}
`;

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signout })(NavItems);
