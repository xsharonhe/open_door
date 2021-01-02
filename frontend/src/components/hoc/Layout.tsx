import React from "react";
import styled from "styled-components";

import { Navbar, SideNav, Footer } from '../Containers/Navigation';

export interface LayoutProps {

}

export const Layout: React.FC<LayoutProps> = ({
    children,
    ...props
}) => (
    <div {...props}>
        <Navbar />
        <SideNav />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
    </div>
)
const MainWrapper = styled.main`
    margin: 0;
`;