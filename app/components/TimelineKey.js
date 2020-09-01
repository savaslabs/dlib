import React from 'react';
import { timelineScopes, cleanId } from '../utils/constants';
import styled from 'styled-components';

const timelineKey = () => {
  return (
    <Sticky>
      <TimelineHeaderGroup>
        {timelineScopes &&
          timelineScopes.map((header, i) => {
            return (
              <Keys key={i}>
                <TimelineHeader id={`${cleanId(header.title)}`}>{header.title}</TimelineHeader>
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
    box-shadow: ${props => props.theme.boxShadow.dark};
  }
`;

const TimelineHeaderGroup = styled.ul`
  @media ${props => props.theme.breakpoints.lg} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    ${props => props.theme.lgContainer};

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
    font-family: ${props => props.theme.fontFamily.muli};
    padding: 20px 0 14px 0;
    letter-spacing: 0.02em;
    font-size: ${props => props.theme.fontSize.lg};
    line-height: 1.73;
    font-weight: ${props => props.theme.fontWeight.semiBold};
  }
`;

export default timelineKey;
