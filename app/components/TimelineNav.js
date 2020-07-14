import React from 'react';
import { timelineScopes } from '../utils/utils';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const timelineNav = () => {
  return (
    <Sticky>
      <TimelineHeaderGroup>
        {timelineScopes && timelineScopes.map((header, i) => {
          return (
            <TimelineHeader scope={header.scope} key={i}>
                {header.title}
              <MobileHiddenText>Timeline</MobileHiddenText>
            </TimelineHeader>
          );
        })}
      </TimelineHeaderGroup>
    </Sticky>
  );
};

const Sticky= styled.div`
  position: sticky;
  top: 0;
`;

const TimelineHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 50;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  ${breakpoint('lg')`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 60px 0 40px 0;
    box-shadow: none;
  `}
`;

const TimelineHeader = styled.li`
  position: relative;
  background: ${(props) => props.theme.colors.white};
  ::before {
    content: '';
    display: block;
    position: absolute;
    width: 80px;
    height: 6px;
    left: -100px;
    top: 50%;
    background: ${(props) =>
      props.scope === 'national'
        ? props.theme.colors.leafy
        : props.theme.colors.greenBean};
  }
  ${breakpoint('lg')`
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px 40px;

    ::before {
      content: none;
    }
  `}
`;

const MobileHiddenText = styled.span`
  ${(props) => props.theme.srOnly};
  ${breakpoint('lg')`
    ${(props) => props.theme.notSrOnly};
  `}
`;

export default timelineNav;
