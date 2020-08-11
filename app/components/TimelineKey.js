import React from 'react';
import { timelineScopes } from '../utils/constants';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const timelineKey = () => {
  return (
    <Sticky>
      <TimelineHeaderGroup>
        {timelineScopes &&
          timelineScopes.map((header, i) => {
            return (
              <Keys key={i}>
                <TimelineHeader>
                  {header.title}
                </TimelineHeader>
              </Keys>
            );
          })}
      </TimelineHeaderGroup>
    </Sticky>
  );
};

const Sticky = styled.div`
  ${breakpoint('sm', 'md')`
      display: none;
  `}
  ${breakpoint('md')`
    position: sticky;
    top: 0;
    z-index: 20;
    ${(props) => props.theme.containerFullWidth};
    background: ${(props) => props.theme.colors.white};
  `}
`;

const TimelineHeaderGroup = styled.ul`
  ${breakpoint('md')`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${(props) => props.theme.colors.white};
  `}
`;

const Keys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TimelineHeader = styled.li`
  ${breakpoint('md')`
    position: relative;
    padding: 20px 0 14px 0;
    letter-spacing: 0.02em;
    font-size: 27px;
    line-height: ${(props) => props.theme.lineHeight.xLoose};
    font-weight: ${(props) => props.theme.fontWeight.normal};
  `}
`;

export default timelineKey;
