import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { csv } from 'd3';
import { cleanId } from './utils/utils';
import { ImageProvider } from './utils/ImageContext';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Event from './components/routes/Event';
import Pages from './assets/event-pages.json';
import './index.css';

const App = () => {
  const [timeline, setTimeline] = useState([]);
  const [images, setImages] = useState([]);
  const [eventPages, setEventPages] = useState(Pages);

  // Fetch timeline events.
  useEffect(() => {
    csv('/app/assets/timeline-events-robust.csv').then(data => {
      // Sort chronologically and restructure timeline based on event year.
      const newData = data
        .sort((a, b) => (a.Year > b.Year ? 1 : -1))
        .reduce((acc, currentValue) => {
          const found = acc.find((a) => a.year === currentValue.Year);
          if (!found) {
            // Nest events of the same year.
            acc.push({ year: currentValue.Year, events: [currentValue] });
          } else {
            found.events.push(currentValue);
          }
          return acc;
        }, []);
      setTimeline(newData);
    });
  }, []);

  useEffect(() => {
    csv('/app/assets/images.csv').then(data => {
      setImages(data);
    });
  }, []);

  return (
    <ImageProvider images={images}>
      <Header eventPages={eventPages} />
      <h1>Civil Rights Heritage Project</h1>
      <Switch>
        {timeline && (
          <Route exact path={['/', '/timeline']}>
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
    </ImageProvider>
  );
};
export default App;
