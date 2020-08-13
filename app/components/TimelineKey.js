import React from 'react';
import { timelineScopes } from '../utils/constants';
import styled from 'styled-components';

const timelineKey = () => {
  return (
    <Sticky>
      <TimelineHeaderGroup>
        {timelineScopes &&
          timelineScopes.map((header, i) => {
            return (
              <Keys key={i}>
                <TimelineHeader>{header.title}</TimelineHeader>
              </Keys>
            );
          })}
      </TimelineHeaderGroup>
    </Sticky>
  );
};

const Sticky = styled.div`
  @media ${props => props.theme.breakpoints.mdMax} {
    display: none;
  }

  @media ${props => props.theme.breakpoints.lg} {
    position: sticky;
    top: 0;
    z-index: 50;
    ${props => props.theme.containerFullWidth};
    background: ${props => props.theme.colors.white};
  }
`;

const TimelineHeaderGroup = styled.ul`
  @media ${props => props.theme.breakpoints.lg} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    box-shadow: ${props => props.theme.boxShadow.dark};
    background: ${props => props.theme.colors.white};
  }
`;

const Keys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimelineHeader = styled.li`
  @media ${props => props.theme.breakpoints.lg} {
    position: relative;
    padding: 20px 0 14px 0;
    letter-spacing: 0.02em;
    font-size: ${props => props.theme.fontSize.mdlg};
    line-height: ${props => props.theme.lineHeight.xLoose};
    font-weight: ${props => props.theme.fontWeight.normal};
  }
`;

export default timelineKey;
