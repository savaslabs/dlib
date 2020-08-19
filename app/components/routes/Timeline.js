import React, { useState, useEffect, useRef } from 'react';
import { cleanId, cleanJSON, timelineDescription, pathToImages } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TimelineKey from '../TimelineKey';
import Year from '../Year';
import Card from '../Card';
import BackToTop from '../BackToTop';
import styled from 'styled-components';
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
    yearRefs.current.forEach(el => {
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

  const addToYearRefs = el => {
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
          property="og:title"
          content="Timeline | Durham Civil Rights Heritage Project"
          data-react-helmet="true"
        />
        <link
          rel="logo"
          type="image/svg"
          href={`${pathToImages}ogImage.svg`}
          data-react-helmet="true"
        />
        <meta property="og:image" content={`${pathToImages}ogImage.svg`} data-react-helmet="true" />
        <meta property="og:image:alt" content="Placeholder" />
        <meta property="og:description" content={timelineDescription} data-react-helmet="true" />
        <meta property="description" content={timelineDescription} data-react-helmet="true" />
        <meta
          property="twitter:url"
          content="https://dlib.netlify.app/timeline"
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content="Timeline | Durham Civil Rights Heritage Project"
          data-react-helmet="true"
        />
        <meta name="twitter:description" content={timelineDescription} data-react-helmet="true" />
        <meta
          name="twitter:image"
          content={`${pathToImages}ogImage.svg`}
          data-react-helmet="true"
        />
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
                  eventsPerYear.events[0].scope === 'National Event' ? 'sole-left' : 'sole-right';
              } else {
                position = 'both';
              }

              // Add timeline gap if next event year more than one year in the future.
              if (i < timeline.length - 1) {
                timeline[i + 1].year - eventsPerYear.year > 1 ? (gap = true) : (gap = false);
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
                  <Span className="arms" />
                  {eventsPerYear.events.map((eventsPerScope, index) => {
                    const level = eventsPerScope.scope === 'National Event' ? 'national' : 'durham';
                    return (
                      <Ul key={index} className={level} pos={position} scope={level}>
                        {eventsPerScope.events.map((event, ind) => {
                          const cleanedEvent = cleanJSON(event);
                          return (
                            <li key={ind} className="event">
                              {event.event_page ? (
                                <LinkedEvent to={`/events/${cleanId(event.event_page)}`}>
                                  <Card event={cleanedEvent} ref={addToYearRefs} feature link />
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

const H1 = styled.h1`
  position: relative;
  z-index: 50;
  font-size: ${props => props.theme.fontSize.lg};
  line-height: ${props => props.theme.lineHeight.snug};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.greenBean};
  padding: 50px 18px 12px 18px;
  ${props => props.theme.containerFullWidth};
  line-height: 1.73;

  @media ${props => props.theme.breakpoints.smMax} {
    box-shadow: ${props => props.theme.boxShadow.dark};
  }

  @media ${props => props.theme.breakpoints.md} {
    padding: 40px 0 20px 0;
    text-align: center;
    line-height: ${props => props.theme.lineHeight.xLoose};
    font-size: ${props => props.theme.fontSize.mdlg};
    background: ${props => props.theme.colors.greenBean};
    color: ${props => props.theme.colors.white};
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding: 80px 0 30px 0;
    font-size: ${props => props.theme.fontSize.xxl};
    line-height: ${props => props.theme.lineHeight.snug};
  }
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
    border: 3px solid ${props => props.theme.colors.lightGray};
    left: 25px;

    @media ${props => props.theme.breakpoints.lg} {
      left: 49.95%;
    }
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
  background-color: ${props => props.theme.colors.darkGreen};

  @media ${props => props.theme.breakpoints.lg} {
    left: calc(50% - 1px);
  }
`;

const YearListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  ${props => props.position === 'both' && `flex-direction: column-reverse;`}

  ${props =>
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

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
    justify-content: space-between;
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props =>
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
    ${props =>
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
    ${props => props.position === 'both' && `flex-direction: row-reverse;`}
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props =>
      props.gap &&
      ` &:after {
      left: 49.7%;
    }`}
  }

  /* Year */
  &:before {
    content: attr(value);
    position: absolute;
    color: ${props => props.theme.colors.greenBean};
    font-weight: ${props => props.theme.fontWeight.bold};
    letter-spacing: 0.02em;
    line-height: ${props => props.theme.lineHeight.tight};
    top: -8px;
    z-index: 30;
    transition: color 0.3s 0.3s;
    left: 10px;

    @media ${props => props.theme.breakpoints.lg} {
      left: 48.75%;
    }
  }
`;

const Span = styled.span`
  position: absolute;
  border: 3px solid ${props => props.theme.colors.lightGray};
  width: 14px;
  left: 55px;
  top: 0;
  transition-delay: 0.5s;
  transition: all linear 0.5s;

  @media ${props => props.theme.breakpoints.lg} {
    left: 44%;
    top: auto;
    width: 140px;
  }

  /* Left Side */
  ::before {
    width: 15px;
    height: 15px;
    position: absolute;
    z-index: 20;
    border-radius: 50%;
    background: ${props => props.theme.colors.lightGray};
    top: -8px;
    left: -15px;

    @media ${props => props.theme.breakpoints.lg} {
      content: '';
    }
  }

  /* Right Side */
  ::after {
    content: '';
    width: 10px;
    height: 10px;
    top: -5px;
    left: 12px;
    position: absolute;
    z-index: 20;
    border-radius: 50%;
    background: ${props => props.theme.colors.lightGray};

    @media ${props => props.theme.breakpoints.lg} {
      width: 15px;
      height: 15px;
      top: -8px;
      left: 140px;
    }
  }

  ::before,
  ::after {
    transition-delay: 0.7s;
    transition: all linear 0.5s;
  }
`;

const Ul = styled.ul`
  @media ${props => props.theme.breakpoints.mdMax} {
    margin-left: 100px;
  }

  @media ${props => props.theme.breakpoints.md} {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const LinkedEvent = styled(Link)`
  text-decoration: none;
  position: relative;
  display: block;
  border-radius: 4px;
  color: ${props => props.theme.colors.greenBean};
  font-weight: ${props => props.theme.fontWeight.bold};
  line-height: ${props => props.theme.lineHeight.snug};

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.boxShadow.xLight};
  }
`;

export default timeline;
