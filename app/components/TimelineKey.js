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
                <ColorBar scope={header.scope} />
                <TimelineHeader>
                  {header.title}
                  <MobileHiddenText> Timeline</MobileHiddenText>
                </TimelineHeader>
              </Keys>
            );
          })}
      </TimelineHeaderGroup>
    </Sticky>
  );
};

const Sticky = styled.div`
  position: sticky;
  top: 0;
  background: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.containerFullWidth};
  ${breakpoint('lg')`
    background: transparent;
  `}
`;

const TimelineHeaderGroup = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 50;
  padding: 14px 18px !important;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  ${(props) => props.theme.smContainer};
  ${breakpoint('lg')`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 60px 0 40px 0;
    box-shadow: none;
  `}
`;

const Keys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${breakpoint('lg')`
    width: auto;
  ;`}
`;

const ColorBar = styled.span`
  width: 80px;
  height: 6px;
  background: ${(props) =>
    props.scope === 'national'
      ? props.theme.colors.leafy
      : props.theme.colors.greenBean};
  ${breakpoint('lg')`
    display: none;
  `}
`;

const TimelineHeader = styled.li`
  position: relative;
  line-height: 1.72;
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  background: ${(props) => props.theme.colors.white};
  ${breakpoint('lg')`
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px 40px;
    background-color: ${(props) => props.theme.colors.white};
  `}
`;

const MobileHiddenText = styled.span`
  ${(props) => props.theme.srOnly};
  ${breakpoint('lg')`
    ${(props) => props.theme.notSrOnly};
  `}
`;

export default timelineKey;
