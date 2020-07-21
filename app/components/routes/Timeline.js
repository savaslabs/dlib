import React, { useState, useRef, useEffect } from 'react';
import { cleanId } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TimelineKey from '../TimelineKey';
import Year from '../Year';
import Card from '../Card';
import backTop from '../../assets/icons/backTop.svg';
import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const timeline = ({ timeline }) => {
  const [showScroll, setShowScroll] = useState(false);
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

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 700) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 700) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkScrollTop);

  return (
    <main>
      <H1>Civil Rights Heritage Project</H1>
      <BackToTop onClick={scrollTop} showScroll={showScroll}>
        <ScreenReaderText>Back to top</ScreenReaderText>
      </BackToTop>
      <TimelineKey />
      <Timeline>
        <Line id='line'></Line>
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
                className={`${position}`}
                ref={addToYearRefs}
                position={position}
              >
                {/* Element that changes fill color */}
                <Year />
                {/* Element that changes stroke color */}
                <Year front />
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const BackToTop = styled.button`
  display: ${(props) => (props.showScroll ? 'flex' : 'none')};
  position: fixed;
  border: none;
  border-radius: 50%;
  z-index: 1000;
  cursor: pointer;
  right: 10px;
  bottom: 50%;
  animation: ${fadeIn} 0.3s;
  transition: opacity 0.4s;
  opacity: 1;
  padding: 20px;
  background: ${(props) => props.theme.colors.greenBean};
  &:before {
    content: '';
    mask: url(${backTop}) no-repeat 50% 50%;
    mask-size: cover;
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.colors.white};
  }

  &:hover {
    background: ${(props) => props.theme.colors.darkGreen};
  }

  ${breakpoint('lg')`
    bottom: 30%;
    margin-bottom: 150px;
  `}
`;

const ScreenReaderText = styled.span`
  ${props => props.theme.srOnly}
`;

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
  ${breakpoint('sm', 'lg')`
      margin-left: 100px;
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
