import React from 'react';
import { cleanId } from '../../utils/utils';
import { Link } from 'react-router-dom';
import Card from '../Card';

const Timeline = ({ timeline }) => {
  console.log('timeline', timeline);
  return (
    <ol>
      {timeline &&
        timeline.map((eventsPerYear, i) => {
          return (
            <li value={eventsPerYear.year} key={i} className="year">
              {eventsPerYear.events.map((eventsPerScope, index) => {
                console.log('eventsPerScope', eventsPerScope);
                return (
                  <ul key={index} className={eventsPerScope.scope === 'National Event' ? 'national' : 'durham'}>
                    {eventsPerScope.events.map((event, ind) => {
                      return (
                        <li key={ind}>
                          {event.Type === 'Feature' ? (
                            <Link to={`/${cleanId(event.Name)}`}>
                              <Card event={event} />
                            </Link>
                          ) : (
                            <Card key={i} event={event} />
                          )}
                      </li>
                      )
                    })}
                  </ul>
                )
              })}
            </li>
          );
        })}
    </ol>
  );
}

export default Timeline;
