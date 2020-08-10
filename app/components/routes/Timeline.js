import React, { useState, useEffect, useRef } from 'react';
import { cleanId, cleanJSON, timelineDescription } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TimelineKey from '../TimelineKey';
import Year from '../Year';
import Card from '../Card';
import BackToTop from '../BackToTop';
import arrow from '../../assets/icons/arrow.svg';
import ogImage from '../../assets/images/ogImage.svg';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const timeline = ({ timeline }) => {
  const [showScroll, setShowScroll] = useState(false);
  const yearRefs = useRef([]);
  yearRefs.current = [];

  useEffect(() => {
    // Year and card animation.
    yearRefs.current.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: 'top center',
          end: 'top top',
          toggleClass: 'active',
        },
      });
    });
  }, [timeline]);

  const addToYearRefs = (el) => {
    if (el && !yearRefs.current.includes(el)) {
      yearRefs.current.push(el);
    }
  };

  useEffect(function setupListener() {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 700) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 700) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    return function cleanupListener() {
      window.removeEventListener('scroll', checkScrollTop);
    };
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Timeline | Durham Civil Rights Heritage Project</title>
        <meta
          property='og:title'
          content='Timeline | Durham Civil Rights Heritage Project'
        />
        <link rel='logo' type='image/svg' href={ogImage} />
        <meta property='og:image' content={ogImage} />
      </Helmet>
      <main>
        <H1>Civil Rights Timeline</H1>
        <BackToTop onClick={scrollTop} showScroll={showScroll} />
        <TimelineKey />
        <Timeline>
          <Line />
          {timeline &&
            timeline.map((eventsPerYear, i) => {
              let position;
              let gap;
              if (eventsPerYear.events.length < 2) {
                position =
                  eventsPerYear.events[0].scope === 'National Event'
                    ? 'sole-left'
                    : 'sole-right';
              } else {
                position = 'both';
              }

              // Add timeline gap if next event year more than one year in the future.
              if (i < timeline.length - 1) {
                timeline[i + 1].year - eventsPerYear.year > 1
                  ? (gap = true)
                  : (gap = false);
              }
              return (
                <YearListItem
                  value={eventsPerYear.year}
                  key={i}
                  className={`${position}`}
                  ref={addToYearRefs}
                  position={position}
                  gap={gap}
                >
                  {/* Element that changes fill color */}
                  <Year />
                  {/* Element that changes stroke color */}
                  <Year front />
                  <Span className='arms' />
                  {eventsPerYear.events.map((eventsPerScope, index) => {
                    const level =
                      eventsPerScope.scope === 'National Event'
                        ? 'national'
                        : 'durham';
                    return (
                      <Ul
                        key={index}
                        className={level}
                        pos={position}
                        scope={level}
                      >
                        {eventsPerScope.events.map((event, ind) => {
                          const cleanedEvent = cleanJSON(event);
                          return (
                            <li key={ind} className='event'>
                              {event.event_page ? (
                                <LinkedEvent
                                  to={`/events/${cleanId(event.event_page)}`}
                                >
                                  <Card
                                    event={cleanedEvent}
                                    ref={addToYearRefs}
                                    feature
                                    link
                                  />
                                  <Arrow />
                                </LinkedEvent>
                              ) : (
                                <Card
                                  key={i}
                                  event={event}
                                  {...(event.type === 'Feature' && {
                                    feature: true,
                                  })}
                                  ref={addToYearRefs}
                                />
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
    </>
  );
};

timeline.propTypes = {
  timeline: PropTypes.array.isRequired,
};

// h1 small sizes
// ${breakpoint('sm')`
//   font-size: ${(props) => props.theme.fontSize.lg};
//   font-weight: ${(props) => props.theme.fontWeight.normal};
//   color: ${(props) => props.theme.colors.greenBean};
//   padding: 20px 0 30px 0;
// `};

// below are tablet and up sizes
const H1 = styled.h1`
  padding: 80px 0 30px 0;
  text-align: center;
  position: relative;
  z-index: 20;
  background: ${(props) => props.theme.colors.greenBean};
  color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.containerFullWidth};
  ${breakpoint('md')`
    z-index: 50;
  `}
`;

const Timeline = styled.ol`
  padding-top: 80px;
  width: 100%;
  position: relative;
  margin: 0;

  /* Timeline line */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border: 3px solid #e0e0e0;
    left: 25px;
    ${breakpoint('lg')`
      left: 49.95%;
    `}
  }
`;

/* Timeline line denoting scroll position */
const Line = styled.span`
  width: 6px;
  height: 50vh;
  position: fixed;
  top: 0;
  left: 43px;
  z-index: 1;
  background-color: black;

  ${breakpoint('lg')`
    left: calc(50% - 1px);
  `}
`;

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
    z-index: 30;
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

  ${(props) =>
    props.gap &&
    `
    padding-bottom: 130px;
    &:after {
      position: absolute;
      bottom: 20px;
      content: '';
      left: 25px;
      height: 130px;
      width: 0;
      border-right: dashed 12px #FFFFFF;
      z-index: 3;
    }
  `}

  ${breakpoint('lg')`
    ${(props) =>
      props.gap &&
      `
    &:after {
        left: 49.7%;
      }
    `}
  `}
`;

const Span = styled.span`
  position: absolute;
  border: 3px solid ${(props) => props.theme.colors.lightGray};
  width: 14px;
  left: 55px;
  top: 0;
  ${breakpoint('lg')`
    left: 44%;
    top: auto;
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

const Ul = styled.ul`
  ${breakpoint('sm', 'md')`
      margin-left: 100px;
  `}

  ${breakpoint('md')`
    align-items: center;
    display: flex;
    flex-direction: column;
  `}
`;

const LinkedEvent = styled(Link)`
  text-decoration: none;
  position: relative;
  display: block;
  color: ${(props) => props.theme.colors.greenBean};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.snug};
  &:hover,
  &:focus {
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.15);
  }

  &:hover span,
  &:focus span {
    background: black;
    ${breakpoint('lg')`
      background: linear-gradient(to right, transparent 45%, #202D25 45%);
    `}
  }
`;

const Arrow = styled.span`
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: ${(props) => props.theme.colors.medGray};
  border-radius: 50%;
  height: 27px;
  width: 27px;
  ${breakpoint('lg')`
    height: 61px;
    width: 61px;
    right: -34px;
    background: linear-gradient(to right, transparent 45%, #C4C4C4 45%);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  `}
  &:before {
    content: '';
    mask: url(${arrow}) no-repeat 50% 50%;
    mask-size: cover;
    position: absolute;
    transform: rotate(90deg);
    background: ${(props) => props.theme.colors.white};
    width: 10px;
    height: 10px;
    right: 8px;
    top: 8px;

    ${breakpoint('sm', 'lg')`
      bottom: 10px;
      border: 1px solid white;
    `}

    ${breakpoint('lg')`
      width: 15px;
      right: 10px;
      height: 20px;
      top: 20px;
    `}
  }
`;

export default timeline;
