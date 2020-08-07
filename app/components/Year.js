import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const year = ({ front }) => {
  return (
    <SVG viewBox='0 0 100 100' transform='rotate(270)'>
      <Circle
        cx='50'
        cy='50'
        r='40'
        front={front}
        fill={front ? 'none' : '#E0E0E0'}
        stroke={front ? 'none' : '#FFFFFF'}
        className={front ? 'secondary' : 'primary'}
        strokeWidth='6'
      ></Circle>
    </SVG>
  );
};

const SVG = styled.svg`
  position: absolute;
  width: 70px;
  height: 70px;
  top: -35px;
  z-index: 20;
  left: -6px;
  ${breakpoint('lg')`
    left: 47.3%;
  `}
`;

const Circle = styled.circle`
  ${(props) =>
    props.front
      ? `
        transition: stroke-dashoffset 0.7s linear, stroke 0.7s;
        stroke-dasharray: 365;
        stroke-dashoffset: 365;`
      : `transition:fill 0.3s ease 0.3s;`
  }
`;

export default React.memo(year);
