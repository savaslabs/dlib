import React from 'react';
import { cleanId } from '../../utils/utils';
import { Link } from 'react-router-dom';
import Card from '../Card';

const Timeline = ({ timeline }) => {
  return (
    <ol>
      {timeline &&
        timeline.map((event, i) => {
          return (
            <li value={event.year} key={i}>
              <ul>
                {event.events.map((eventsPerYear, index) => {
                  const placement =
                    eventsPerYear.Scope === 'National Event' ? 'left' : 'right';
                  return (
                    <li key={index} className={placement}>
                      {eventsPerYear.Type === 'Feature' ? (
                        <Link to={`/${cleanId(eventsPerYear.Name)}`}>
                          <Card event={eventsPerYear} />
                        </Link>
                      ) : (
                        <Card key={i} event={eventsPerYear} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
    </ol>
  );
}

export default Timeline;
