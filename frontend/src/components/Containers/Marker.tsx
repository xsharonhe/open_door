import React from 'react';
import styled from 'styled-components';

interface MarkerProps {
    lat: number;
    lng: number;
    title: string;
}
export const Marker: React.FC<MarkerProps> = ({
    title,
    ...props
}) => {
    return (
      <SMarker
        title={title}
        {...props}
      />
    );
  };

const SMarker = styled.div`
  ${({theme}) => `
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: blue;
    border-radius: 50% 50% 50% 0;
    background-color: ${theme.colors.primary};
    transform: rotate(-45deg);
    top: 50%;
    left: 50%;
    margin: -30px 0 0 -15px;
  `}
`;