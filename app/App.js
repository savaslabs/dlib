import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { cleanId, theme } from './utils/utils';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Event from './components/routes/Event';
import Pages from './assets/event-pages.json';
import Events from './assets/events.json';
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './globalStyles';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import './index.css';

const App = () => {
  const [timeline, setTimeline] = useState([]);
  const [eventPages, setEventPages] = useState(Pages);

  // Fetch timeline events.
  useEffect(() => {
    // Sort chronologically and restructure timeline based on event year.
    const sortedByYear =
      Events &&
      Events.sort((a, b) => (a.Year > b.Year ? 1 : -1)).reduce(
        (acc, currentValue) => {
          const found = acc.find((a) => a.year === currentValue.Year);
          if (!found) {
            // Nest events of the same year.
            acc.push({ year: currentValue.Year, events: [currentValue] });
          } else {
            found.events.push(currentValue);
          }
          return acc;
        },
        []
      );

    // Restructure timeline based on event scope.
    const sortedByScope = sortedByYear.map((d, i) => {
      const newEvents = d.events.reduce((acc, currentValue) => {
        const found = acc.find((a) => a.scope === currentValue.Scope);
        if (!found) {
          // Nest events of the same scope.
          acc.push({ scope: currentValue.Scope, events: [currentValue] });
        } else {
          found.events.push(currentValue);
        }
        return acc;
      }, []);
      return { ...d, events: newEvents };
    });

    setTimeline(sortedByScope);
  }, [Events]);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <Header eventPages={eventPages} />
      <ContentContainer>
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
      </ContentContainer>
    </ThemeProvider>
  );
};

const ContentContainer = styled.div`
  ${(props) => props.theme.smContainer};
  ${breakpoint('lg')`
    ${(props) => props.theme.lgContainer};
  `}
`;
export default App;
