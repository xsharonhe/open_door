import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        font: {
            header: string;
            body: string;
        },
        size: {
            default: string | number;
            small: string | number;
            h1: string | number;
            h2: string | number;
            h3: string | number;
            defaultLarger: string | number;
            large: string | number;
        },
        radius: {
            default: string;
            border: string;
        },
        media: {
            [key: string]: number | string;
        },
        transitions: {
            cubicBezier: string;
        },
        colors: {
            primary: string;
            secondary: string;
            background: string;
            text: string;
            hover: string;
            primaryO: string;
        }
    }
};

export const baseTheme = {
    font: {
        header: '"itc-avant-garde-gothic-pro", sans-serif',
        body: '"franklin-gothic-atf", sans-serif',
    },
    size: {
        default: '1rem',
        small: '0.85rem',
        h1: '2rem',
        h2: '1.75rem',
        h3: '1.3rem',
        defaultLarger: '1.2rem',
        large: '2.5rem',
    },
    radius: {
        default: '8px',
        border: '20px',
    },
    media: {
        small: '325',
        mobile: '414',
        tablet: '834',
        laptop: '1480',
        desktop: '2560'
    },
    transitions: {
        cubicBezier: 'all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)'
    },
    colors: {
        primary: '#252E56',
        secondary: '#F0F5FF',
        background: '#FFFFFF',
        text: '#393E46',
        hover: '#4862CC',
        primaryO: 'rgba(37, 46, 86, 0.1)'
    },
};