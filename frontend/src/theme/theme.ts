import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        font: {
            header: string;
            body: string;
        },
        size: {
            [key: string]: number | string;
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
            opacity: string;
            scale: string;
            easeIn: string;
            easeOut: string;
        },
        colors: {
            [key: string]: number | string;
        },
        boxShadow: {
            shallow: string;
            topBottom: string;
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
        cubicBezier: 'all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)',
        opacity: 'opacity ease 500ms',
        scale: 'scale(1.03)',
        easeIn: `
            animation: fadeIn ease 0.5s;
            -webkit-animation: fadeIn ease 0.5s;
            -moz-animation: fadeIn ease 0.5s;
            -o-animation: fadeIn ease 0.5s;
            -ms-animation: fadeIn ease 0.5s;
            @keyframes fadeIn {
                0% {opacity:0;}
                100% {opacity:1;}
            }
            @-moz-keyframes fadeIn {
                0% {opacity:0;}
                100% {opacity:1;}
            }
            @-webkit-keyframes fadeIn {
                0% {opacity:0;}
                100% {opacity:1;}
            }
            @-o-keyframes fadeIn {
                0% {opacity:0;}
                100% {opacity:1;}
            }
            @-ms-keyframes fadeIn {
                0% {opacity:0;}
                100% {opacity:1;}
            }
        `,
        easeOut: `
            animation: fadeOut 1.5s ease-out;
            -webkit-animation: fadeOut ease-out 1.5s;
            -moz-animation: fadeOut ease-out 1.5s;
            -o-animation: fadeOut ease-out 1.5s;
            -ms-animation: fadeOut ease-out 1.5s;
            @keyframes fadeOut {
                0% {opacity:1;}
                100% {opacity:0;}
            }
            @-moz-keyframes fadeOut {
                0% {opacity:1;}
                100% {opacity:0;}
            }
            @-webkit-keyframes fadeOut {
                0% {opacity:1;}
                100% {opacity:0;}
            }
            @-o-keyframes fadeOut {
                0% {opacity:1;}
                100% {opacity:0;}
            }
            @-ms-keyframes fadeOut {
                0% {opacity:1;}
                100% {opacity:0;}
            }
        `   
    },
    colors: {
        primary: '#14274e',
        secondary: '#F0F5FF',
        background: '#FFFFFF',
        accent: '#FF9595',
        text: '#393E46',
        caption: '#9ba4b4',
        hover: '#394867',
        primaryO: 'rgba(37, 46, 86, 0.1)',
        success: '#61b15a',
        error: '#ff4646'
    },
    boxShadow: {
        shallow: '0 3px 2px 0 rgba(0, 0, 0, 0.15)',
        topBottom: '0px 8px 5px rgba(0, 0, 0, 0.15), 0px -5px 5px rgba(0, 0, 0, 0.15)'
    }
};