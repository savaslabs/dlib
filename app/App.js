import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { csv } from 'd3';
const App = () => {
  const [timeline, setTimeline] = useState([]);

  // Fetch Timeline Events.
  useEffect(() => {
    csv('/app/assets/timeline-events.csv').then(data => {
      setTimeline(data);
    });
  }, []);

  return (
    <>
      <h1>Civil Rights Heritage Project</h1>
      {timeline && timeline.map((event, i) => {
        return (
          <article key={i}>
            <p>{event.Year}</p>
            <p>{event.Scope}</p>
            <p>{event.Name}</p>
            <p>{event.Type}</p>
            <p>{event.Images}</p>
            <p>{event.Headline}</p>
          </article>
        );
      })}
    </>
  );
};
export default App;
