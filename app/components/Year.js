import React from 'react';
import styled from 'styled-components';

const year = () => {
  return (
    <SVG viewBox='0 0 100 100' transform='rotate(270)'>
      <Circle
        cx='50'
        cy='50'
        r='40'
        fill='#E0E0E0'
        stroke='white'
        strokeWidth='4'
      ></Circle>
    </SVG>
  );
}

const SVG = styled.svg`
  position: absolute;
  width: 70px;
  height: 70px;
  left: -38px;
  top: -35px;
  z-index: 20;
`;

const Circle = styled.circle`
  stroke-dasharray: 365;
  stroke-dashoffset: 365;
  transition: stroke-dashoffset 0.7s linear;
  transition: fill 0.7s linear;
`;

export default year;
