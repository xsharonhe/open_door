import { InterpolationFunction } from 'styled-components';
import { IBaseTemplate } from '../theme/theme';

export const media = (
    breakpoint: string,
    styling: string,
): InterpolationFunction<{theme: IBaseTemplate}> => ({ theme }): string => `
    @media only screen and (max-width: ${theme.media[breakpoint] || breakpoint}px }) {
        ${styling}
    };
`;