import React, { useRef, useEffect } from 'react';
import { cleanId } from '../../utils/utils';
import { Link } from 'react-router-dom';
import Card from '../Card';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.core.globals('ScrollTrigger', ScrollTrigger);

const Timeline = styled.ol`
  padding-top: 80px;
`;

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
    padding: 22px 15px;
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

const Sticky = styled.div`
  position: sticky;
  top: 0;
`;

const TimelineHeaders = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 60px 0 40px 0;
  z-index: 500;
  li {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px 40px;
  }
`;

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
          markers: { startColor: 'green', endColor: 'red', fontSize: '12px' }, //For Dev only
        },
      });
    })
  }, []);

  const addToYearRefs = el => {
    if (el && !yearRefs.current.includes(el)) {
      yearRefs.current.push(el);
    }
  };

  return (
    <>
      <h1 className='sr-only'>Civil Rights Heritage Project</h1>
      <Sticky>
        <TimelineHeaders>
          <li>National Civil Rights Timeline</li>
          <li>Durham Civil Rights Timeline</li>
        </TimelineHeaders>
      </Sticky>
      <Timeline>
        {timeline &&
          timeline.map((eventsPerYear, i) => {
            let position;
            if (eventsPerYear.events.length < 2) {
              position = eventsPerYear.events[0].scope === 'National Event' ? 'sole-left' : 'sole-right';
            } else {
              position = 'both';
            }
            return (
              <Li
                value={eventsPerYear.year}
                key={i}
                className={`${position} year_${i}`}
                ref={addToYearRefs}
              >
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
      </Timeline>
    </>
  );
}

export default timeline;
