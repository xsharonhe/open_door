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
        body: '"futura-pt", sans-serif',
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
        primary: '#79a3b1',
        dark: '#252E56',
        background: '#f4eeed',
        text: '#393e46',
        hover: '#394867',
        primaryO: 'rgba(121, 163, 177, 0.1)'
    },
};