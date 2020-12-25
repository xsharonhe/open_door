import { DefaultTheme } from 'styled-components';

export interface IBaseTemplate extends DefaultTheme {
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
    },
    radius: string | number;
    media: {
        [key: string]: number | string;
    },
    colors: {
        primary: string;
        background: string;
        text: string;
    }
};

export const baseTheme: IBaseTemplate = {
    font: {
        header: '"itc-avant-garde-gothic-pro", sans-serif',
        body: '"futura-pt", sans-serif',
    },
    size: {
        default: '1rem',
        small: '0.85rem',
        h1: '2rem',
        h2: '1.75rem',
        h3: '1.55rem',
    },
    radius: '8px',
    media: {
        small: '325',
        mobile: '414',
        tablet: '834',
        laptop: '1080',
        desktop: '2560'
    },
    colors: {
        primary: '#79a3b1',
        background: '#f4eeed',
        text: '#555555',
    }
};
