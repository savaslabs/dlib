import React, { useState, useEffect, useRef } from 'react';
import { cleanId, cleanJSON, timelineDescription, pathToImages } from '../../utils/constants';
import { Link } from 'react-router-dom';
import TimelineKey from '../TimelineKey';
import Year from '../Year';
import Card from '../Card';
import BackToTop from '../BackToTop';
import useWindowSize from '../../utils/hooks/useWindowSize';
import Lightbox from '../Lightbox';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const timeline = ({ timeline }) => {
  const timelineImageIds = [];
  const timelineImageCaptions = [];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const windowSize = useWindowSize();
  const [linePos, setLinePos] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const yearRefs = useRef([]);
  const lineRef = useRef(null);
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

  // Ensure scroll line lines up with timeline line on tablet.
  useEffect(() => {
    if (768 <= windowSize.width < 1024) {
      setLinePos(lineRef.current.getBoundingClientRect().left + 55);
    }
  }, [windowSize.width]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = e => {
    const photoIndex = parseInt(e.target.getAttribute('data-photoindex'), 10);
    setPhotoIndex(photoIndex);
    setIsLightboxOpen(true);
  };
  const closeLightbox = e => setIsLightboxOpen(false);

  const nextLightboxImage = e => {
    setPhotoIndex(photoIndex + 1 <= timelineImageIds.length ? photoIndex + 1 : 0);
  };

  const prevLightboxImage = e => {
    setPhotoIndex(
      photoIndex - 1 >= 0 ? photoIndex - 1 : timelineImageIds[timelineImageIds.length - 1]
    );
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
        <meta name="description" content={timelineDescription} data-react-helmet="true" />
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
        <TimelineWrapper>
          <Timeline ref={lineRef}>
            <Line linePos={linePos} />
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
                      const level =
                        eventsPerScope.scope === 'National Event' ? 'national' : 'durham';
                      return (
                        <Ul key={index} className={level} pos={position} scope={level}>
                          {eventsPerScope.events.map((event, ind) => {
                            const cleanedEvent = cleanJSON(event);
                            // Construct id and caption arrays for lightbox.
                            event.images &&
                              event.images.forEach(image => {
                                timelineImageIds.push(image.ID);
                                timelineImageCaptions.push(image.caption);
                              });
                            return (
                              <li key={ind} className="event">
                                {event.event_page ? (
                                  <LinkedEvent to={`/events/${cleanId(event.event_page)}`}>
                                    <Card event={cleanedEvent} ref={addToYearRefs} feature link />
                                  </LinkedEvent>
                                ) : (
                                  timelineImageIds && (
                                    <Card
                                      key={i}
                                      event={event}
                                      imageIds={timelineImageIds}
                                      {...(event.type === 'Feature' && {
                                        feature: true,
                                      })}
                                      openLightbox={openLightbox}
                                      ref={addToYearRefs}
                                    />
                                  )
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
        </TimelineWrapper>
        {timelineImageIds && <Lightbox
          imageIds={timelineImageIds}
          imageCaptions={timelineImageCaptions}
          isOpen={isLightboxOpen}
          photoIndex={photoIndex}
          closeLightbox={closeLightbox}
          prevLightboxImage={prevLightboxImage}
          nextLightboxImage={nextLightboxImage}
        />}
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
  font-weight: ${props => props.theme.fontWeight.bold};
  line-height: ${props => props.theme.lineHeight.snug};
  font-family: ${props => props.theme.fontFamily.muli};
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 13px 18px 13px 18px;
  ${props => props.theme.containerFullWidth};
  line-height: 1.73;
  background: ${props => props.theme.colors.greenBean};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSize.md};
  text-align: center;

  @media ${props => props.theme.breakpoints.mdMax} {
    line-height: 1.98;
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding: 26px 0 29px 0;
    font-size: ${props => props.theme.fontSize.xxl};
    line-height: ${props => props.theme.lineHeight.snug};
    box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.15);
  }
`;

const TimelineWrapper = styled.div`
  ${props => props.theme.containerFullWidth};
  padding-top: 80px;
  background: url('../app/assets/images/timeline-pattern.png') 102px 102px repeat;
`;

const Timeline = styled.ol`
  position: relative;
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
  }

  /* Timeline line */
  &:after {
    content: '';
    position: absolute;
    top: -80px;
    bottom: 0;
    border: 3px solid ${props => props.theme.colors.lightGray};
    left: 44px;

    @media ${props => props.theme.breakpoints.md} {
      left: 55px;
    }

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
  left: 44px;
  z-index: 1;
  background-color: ${props => props.theme.colors.darkGreen};

  @media ${props => props.theme.breakpoints.md} {
    left: ${props => props.linePos}px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    left: 49.95%;
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
      content: '';
      background: url('../app/assets/images/timeline-gap-mask.png');
      background-size: contain;
      position: absolute;
      bottom: 30px;
      left: 26px;
      width: 7px;
      height: 144px;
      z-index: 3;
    }
  `}

  @media ${props => props.theme.breakpoints.md} {
    ${props =>
      props.gap &&
      `

    &:after {
      left: 34px;
    }
  `}
  }

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
    justify-content: space-between;

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
      left: 49.95%;
    }`}
  }

  /* Year */
  &:before {
    content: attr(value);
    position: absolute;
    color: ${props => props.theme.colors.greenBean};
    font-family: ${props => props.theme.fontFamily.muli};
    font-weight: ${props => props.theme.fontWeight.semiBold};
    letter-spacing: 0.02em;
    line-height: ${props => props.theme.lineHeight.tight};
    top: -8px;
    z-index: 30;
    transition: color 0.3s 0.3s;
    left: 10px;

    @media ${props => props.theme.breakpoints.md} {
      left: 17px;
    }

    @media ${props => props.theme.breakpoints.lg} {
      left: 48.6%;
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

  @media ${props => props.theme.breakpoints.md} {
    width: 35px;
  }

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

    @media ${props => props.theme.breakpoints.md} {
      left: 35px;
    }

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

  &:hover,
  &:focus {
    box-shadow: ${props => props.theme.boxShadow.xLight};
  }
`;

export default timeline;
