import React from "react";
import styled from "styled-components";

import { Navbar, Footer } from '../Containers/Navigation';

export interface LayoutProps {

}

export const Layout: React.FC<LayoutProps> = ({
    children,
    ...props
}) => (
    <SDiv {...props}>
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
    </SDiv>
)

const SDiv = styled.div`
`;

const MainWrapper = styled.main`
    margin: 0 6rem;
`;