import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { routes, cleanId } from './utils/constants';
import { Switch, Route } from 'react-router-dom';

// Components.
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Basic from './components/routes/Basic';
import Gallery from './components/routes/Gallery';
import Footer from './components/Footer';

// Data.
import Pages from './assets/event-pages.json';
import Events from './assets/events.json';

// Styling.
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
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
      <GlobalStyles />
      {timeline ? (
        <>
          <SkipToMainContent href='#main-contet'>
            <ScreenReaderText>Skip to main content</ScreenReaderText>
          </SkipToMainContent>
          <Header eventPages={eventPages} />
          <ContentContainer id='main-content'>
            <Switch>
              {routes &&
                routes.map((r, i) => {
                  return r.route === 'timeline' && timeline ? (
                    <Route exact path={['/', '/timeline']} key={i}>
                      <Timeline timeline={timeline} />
                    </Route>
                  ) : r.component === 'Featured Events' && eventPages ? (
                    eventPages.map((event, index) => {
                      return (
                        <Route
                          path={`/events/${cleanId(event.name)}`}
                          key={index}
                        >
                          <Basic event={event} />
                        </Route>
                      );
                    })
                  ) : r.route === 'gallery' ? (
                    <Route path='/gallery' key={i}>
                      <Gallery />
                    </Route>
                  ) : (
                    <Route path={`/${r.route}`} key={i}>
                      <Basic type={r.route} />
                    </Route>
                  );
                })}
            </Switch>
          </ContentContainer>
          <Footer />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ThemeProvider>
  );
};

const ContentContainer = styled.div`
  ${(props) => props.theme.smContainer};
  ${breakpoint('lg')`
    ${(props) => props.theme.lgContainer};
  `}
`;

const ScreenReaderText = styled.span`
  ${(props) => props.theme.srOnly};
`;

const SkipToMainContent = styled.a`
  &:focus {
    ${ScreenReaderText} {
      ${(props) => props.theme.notSrOnly};
    }
  }
`;

export default App;
