import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { csv } from 'd3';
import { cleanId } from './utils'
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Event from './components/routes/Event';
import Pages from './assets/event-pages.json';

const App = () => {
  const [timeline, setTimeline] = useState([]);
  const [eventPages, setEventPages] = useState(Pages);

  // Fetch Timeline Events.
  useEffect(() => {
    csv('/app/assets/timeline-events.csv').then(data => {
      setTimeline(data);
    });
  }, []);

  return (
    <>
      <Header />
      <h1>Civil Rights Heritage Project</h1>
      <Switch>
        {timeline && (
          <Route exact path={["/", "/timeline"]}>
            <Timeline timeline={timeline} />
          </Route>
        )}
        {eventPages &&
          eventPages.map((event, index) => {
            return (
              <Route path={`/${cleanId(event.name)}`} key={index}>
                <Event event={event} />
              </Route>
            );
          })}
      </Switch>
    </>
  );
};
export default App;
