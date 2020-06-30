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
            <li value={event.Year} key={i}>
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
    </ol>
  );
}

export default Timeline;
