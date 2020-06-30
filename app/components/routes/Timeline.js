import React from 'react';
import { cleanId } from '../../utils';
import { Link } from 'react-router-dom';
import Card from '../Card';

const Timeline = ({ timeline }) => {
  return (
    timeline && timeline.map((event, i) => {
      const id = cleanId(event.Name);
      return event.Type === 'Feature' ? (
        <Link to={`/${id}`} key={i}>
          <Card event={event} />
        </Link>
      ) : (
        <Card key={i} event={event} />
      );
    })
  )
}

export default Timeline;
