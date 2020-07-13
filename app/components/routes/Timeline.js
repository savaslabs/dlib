import React from 'react';
import { cleanId } from '../../utils/utils';
import { Link } from 'react-router-dom';
import Card from '../Card';
import styled from 'styled-components';

const Li = styled.li`
  position: relative;

  ::before {
    content: attr(value);
    position: absolute;
    left: -10px;
    top: -33px;
    color: #41796f;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.125;
    background: #e0e0e0;
    border-radius: 50%;
    padding-top: 22px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 22px;
    border: 4px;
    border-color: white;
    border-style: solid;
    z-index: 20;
  }

  ::after {
    content: '';
    height: 185px;
    width: 6px;
    background: #e0e0e0;
    position: absolute;
    left: 24px;
    top: -80px;
  }
`;

const Span = styled.span`
  position: absolute;
  border: 3px solid #e0e0e0;
  width: 165px;
  left: -55px;

  /* Left Side */
  ::before {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 100;
    border-radius: 50%;
    background: #e0e0e0;
    top: -8px;
    left: -15px;
  }
  /* Right Side */
  ::after {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 100;
    border-radius: 50%;
    background: #e0e0e0;
    top: -8px;
    left: 160px;
  }
`;

const Timeline = ({ timeline }) => {
  return (
    <>
      <h1>Civil Rights Heritage Project</h1>
      <ol>
        {timeline &&
          timeline.map((eventsPerYear, i) => {
            console.log('eventsPerYear', eventsPerYear);
            let position;
            if (eventsPerYear.events.length < 2) {
              position = eventsPerYear.events[0].scope === 'National Event' ? 'sole-left' : 'sole-right';
            } else {
              position = 'both';
            }
            return (
              <Li value={eventsPerYear.year} key={i} className={position}>
                <Span />
                {eventsPerYear.events.map((eventsPerScope, index) => {
                  return (
                    <ul
                      key={index}
                      className={
                        eventsPerScope.scope === 'National Event'
                          ? 'national'
                          : 'durham'
                      }
                    >
                      {eventsPerScope.events.map((event, ind) => {
                        return (
                          <li key={ind}>
                            {event.Type === 'Feature' ? (
                              <Link to={`/${cleanId(event.Name)}`}>
                                <Card event={event} scope={event.Scope} />
                              </Link>
                            ) : (
                              <Card key={i} event={event} scope={event.Scope} />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </Li>
            );
          })}
      </ol>
    </>
  );
}

export default Timeline;
