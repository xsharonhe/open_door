import { InterpolationFunction, DefaultTheme } from 'styled-components';

export const media = (
    breakpoint: string,
    styling: string,
): InterpolationFunction<{theme: DefaultTheme}> => ({ theme }): string => `
    @media only screen and (max-width: ${theme.media[breakpoint] || breakpoint}px }) {
        ${styling}
    };
`;