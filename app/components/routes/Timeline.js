import React, { useRef, useEffect } from 'react';
import { cleanId } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TimelineKey from '../TimelineKey';
import Year from '../Year';
import Card from '../Card';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const timeline = ({ timeline }) => {
  const yearRefs = useRef([]);
  yearRefs.current = [];

  useEffect(() => {
    yearRefs.current.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          id: `section-${index + 1}`,
          trigger: el,
          scrub: true,
          start: 'top center',
          end: 'top top',
          toggleClass: 'active',
          toggleActions: 'play pause resume reset',
          markers: { startColor: 'green', endColor: 'red', fontSize: '12px' }, //For Dev only
        },
      });
    });
  }, []);

  const addToYearRefs = (el) => {
    if (el && !yearRefs.current.includes(el)) {
      yearRefs.current.push(el);
    }
  };

  return (
    <main>
      <H1>Civil Rights Heritage Project</H1>
      <TimelineKey />
      <Timeline>
        {timeline &&
          timeline.map((eventsPerYear, i) => {
            let position;
            if (eventsPerYear.events.length < 2) {
              position =
                eventsPerYear.events[0].scope === 'National Event'
                  ? 'sole-left'
                  : 'sole-right';
            } else {
              position = 'both';
            }
            return (
              <YearListItem
                value={eventsPerYear.year}
                key={i}
                className={`${position} year_${i}`}
                ref={addToYearRefs}
                position={position}
              >
                <Year />
                <Span />
                {eventsPerYear.events.map((eventsPerScope, index) => {
                  console.log('position', position);
                  return (
                    <EventList
                      key={index}
                      className={
                        eventsPerScope.scope === 'National Event'
                          ? 'national'
                          : 'durham'
                      }
                      pos={position}
                      scope={
                        eventsPerScope.scope === 'National Event'
                          ? 'national'
                          : 'durham'
                      }
                    >
                      {eventsPerScope.events.map((event, ind) => {
                        return (
                          <li key={ind}>
                            {event.Type === 'Feature' ? (
                              <LinkedEvent
                                to={`/events/${cleanId(event.Name)}`}
                              >
                                <Card event={event} ref={addToYearRefs} link />
                              </LinkedEvent>
                            ) : (
                              <Card key={i} event={event} ref={addToYearRefs} />
                            )}
                          </li>
                        );
                      })}
                    </EventList>
                  );
                })}
              </YearListItem>
            );
          })}
      </Timeline>
    </main>
  );
};

timeline.propTypes = {
  timeline: PropTypes.array.isRequired,
};

const Timeline = styled.ol`
  padding-top: 80px;
  margin-left: 25px;

  ${breakpoint('lg')`
    margin-left: 50%;
  `}
`;

const YearListItem = styled.li`
  border-left: 6px solid #e0e0e0;
  position: relative;
  display: flex;

  &:before {
    content: attr(value);
    position: absolute;
    color: ${(props) => props.theme.colors.greenBean};
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.125;
    left: -22px;
    top: -8px;
    z-index: 50;
    transition: color 0.7s linear;
  }

  &:after {
    transition: all linear 0.7s;
    background: ${(props) => props.theme.colors.darkGreen};
    content: '';
    display: block;
    height: 0%;
    width: 6px;
    position: absolute;
    left: -5px;
    top: -50px;
    z-index: 0;
  }

  ${breakpoint('lg')`
    ${(props) =>
      props.position === 'sole-left' &&
      `justify-content: flex-start;
    ${Span} {
      left: -75px;
      width: 40px;

      &::before {
        content: '';
      }
      &::after {
        content: none;
      }
    }
    `}
  ${(props) =>
    props.position === 'sole-right' &&
    `justify-content: flex-end;
    ${Span} {
      left: 22px;
      width: 40px;

      &::before {
        content: none;
      }
      &::after {
        content: '';
        left: 40px;
      }
    }

  `}
    ${(props) => props.position === 'both' && `flex-direction: row-reverse;`}
  `}
  ${(props) => props.position === 'both' && `flex-direction: column-reverse;`}
`;

const Span = styled.span`
  position: absolute;
  border: 3px solid ${(props) => props.theme.colors.lightGray};
  width: 14px;
  left: 25px;
  ${breakpoint('lg')`
    left: -75px;
     width: 140px;
  `};
  transition-delay: 0.5s;
  transition: all linear 0.5s;

  /* Left Side */
  ::before {
    ${breakpoint('lg')`
      content: '';
    `}
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 20;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.lightGray};
    top: -8px;
    left: -15px;
  }
  /* Right Side */
  ::after {
    content: '';
    width: 10px;
    height: 10px;
    top: -5px;
    left: 12px;

    ${breakpoint('lg')`
      width: 15px;
      height: 15px;
      top: -8px;
      left: 140px;
    `}
    position: absolute;
    z-index: 20;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.lightGray};
  }

  ::before,
  ::after {
    transition-delay: 0.7s;
    transition: all linear 0.5s;
  }
`;

const EventList = styled.ul`
  margin-left: auto;
  ${breakpoint('lg')`
    margin-left: ${(props) =>
      props.pos === 'sole-left' && props.scope === 'national'
        ? '-587px;'
        : props.pos === 'sole-right' && props.scope === 'durham'
        ? '40px;'
        : props.pos === 'both' && props.scope === 'durham'
        ? '237px;'
        : '0;'};
  `}
`;

const H1 = styled.h1`
  ${(props) => props.theme.srOnly};
`;

const LinkedEvent = styled(Link)`
  color: ${(props) => props.theme.colors.greenBean};
  text-decoration: none;
  font-size: 20px;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.snug};
`;

export default timeline;
