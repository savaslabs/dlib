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
    // horizontal from docs
    gsap.from('#line', {
      scrollTrigger: {
        trigger: '#line',
        scrub: true,
        start: 'top bottom',
        end: 'top top',
      },
      scaleX: 0,
      transformOrigin: 'left center',
      ease: 'none',
    });

    // vertical attempt, from manipulating above
    // gsap.from('#line', {
    //   scrollTrigger: {
    //     trigger: '#line',
    //     scrub: true,
    //     start: 'top bottom',
    //     end: 'top top',
    //     markers: { startColor: 'green', endColor: 'red', fontSize: '12px' }, //For Dev only
    //   },
    //   scaleY: 0,
    //   transformOrigin: 'left center',
    //   ease: 'none',
    // });

    // mine
    // gsap.from('#line', {
    //   scrollTrigger: {
    //     trigger: '#line',
    //     scrub: true,
    //     start: 'top center',
    //     end: 'bottom end',
    //     markers: { startColor: 'green', endColor: 'red', fontSize: '12px' }, //For Dev only
    //   },
    //   scaleY: 0,
    //   transformOrigin: 'top center',
    //   ease: 'none',
    // });

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
        },
      });
    });
  }, [timeline]);

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
        <Line id="line"></Line>
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
                  return (
                    <Ul
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
                    </Ul>
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
  width: 100%;
  position: relative;

  /* Timeline line */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border: 3px solid #e0e0e0;
    left: 25px;
    ${breakpoint('lg')`
      left: 50%;
    `}
  }
`;

// horizontal example
const Line = styled.span`
  width: 100%;
  max-width: 800px;
  height: 8px;
  margin: 0 0 10px 0;
  position: relative;
  display: inline-block;
  background-color: black;
`;

// attempt at vertical
// const Line = styled.span`
//   height: 100%;
//   max-height: 181001px;
//   width: 8px;
//   margin: 0 0 10px 0;
//   position: relative;
//   display: inline-block;
//   background-color: black;
// `;

 /* Physical timeline for animating on scroll */
// const Line = styled.span`
//   height: 100%;
//   max-height: 18101px;
//   width: 6px;
//   left: 50%;
//   top: 0;
//   position: absolute;
//   background-color: black;
// `;

const YearListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  ${breakpoint('lg')`
    flex-direction: row;
    justify-content: space-between;
  `}

  /* Year */
  &:before {
    content: attr(value);
    position: absolute;
    color: ${(props) => props.theme.colors.greenBean};
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.125;
    top: -8px;
    z-index: 50;
    transition: color 0.3s 0.3s;
    left: 10px;
    ${breakpoint('lg')`
      left: 48.75%;
    `}
  }

  ${breakpoint('lg')`
    ${(props) =>
      props.position === 'sole-left' &&
      `justify-content: flex-start;
    ${Span} {
      left: 44%;
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
      left: 52%;
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
  left: 55px;
  ${breakpoint('lg')`
    left: 44%;
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

const H1 = styled.h1`
  ${(props) => props.theme.srOnly};
`;

const Ul = styled.ul`
  margin-left: 100px;
  ${breakpoint('lg')`
      margin-left: 0;
  `}
`;

const LinkedEvent = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: ${(props) => props.theme.colors.greenBean};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.snug};
`;

export default timeline;
