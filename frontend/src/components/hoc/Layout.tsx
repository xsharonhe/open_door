import React, {useEffect} from "react";
import styled from "styled-components";

import { connect } from 'react-redux';
import { checkAuth } from '../../store/actions/authActions';

import { Navbar, SideNav, Footer } from '../Containers/Navigation';

export interface LayoutProps {
    checkAuth: Function;
}

const Layout: React.FC<LayoutProps> = ({
    checkAuth,
    children,
    ...props
}) => {

    useEffect(() => {
        checkAuth();
    }, []);


    return (
        <div {...props}>
        <Navbar />
        <SideNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
    </div>
    )
}
const MainWrapper = styled.main`
    margin: 0;
`;

export default connect(null, { checkAuth })(Layout);