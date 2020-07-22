import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import { routes, cleanId, prepareCaptions } from './utils/constants';
import { Switch, Route } from 'react-router-dom';

// Components.
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Basic from './components/routes/Basic';
import Footer from './components/Footer';

// Data.
import EventPages from './assets/pages/event-pages.json';
import Events from './assets/events-data.json';
import Images from './assets/images-data.json';

// Styling.
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import GlobalStyles from './globalStyles';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import './index.css';

const App = () => {
  const [timeline, setTimeline] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [imageCaptions, setImageCaptions] = useState([]);
  const [imageAltText, setImageAltText] = useState([]);

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

  useEffect(() => {
    setImageIds(
      Images.map((image) => {
        return image.ID;
      })
    );
    setImageCaptions(
      Images.map((image) => {
        return prepareCaptions(image);
      })
    );
    setImageAltText(
      Images.map((image) => {
        return image.alt_text;
      })
    );
  }, [Images]);

  console.log('imageCaptions', imageCaptions);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {timeline ? (
        <>
          <SkipToMainContent href='#main-contet'>
            <ScreenReaderText>Skip to main content</ScreenReaderText>
          </SkipToMainContent>
          <Header eventPages={EventPages} />
          <ContentContainer id='main-content'>
            <Switch>
              {routes &&
                routes.map((r, i) => {
                  return r.route === 'timeline' && timeline ? (
                    <Route exact path={['/', '/timeline']} key={i}>
                      <Timeline timeline={timeline} />
                    </Route>
                  ) : r.component === 'Featured Events' && EventPages ? (
                    EventPages.map((event, index) => {
                      return (
                        <Route
                          path={`/events/${cleanId(event.name)}`}
                          key={index}
                        >
                          <Basic event={event} imageData={Images} />
                        </Route>
                      );
                    })
                  ) : (
                    <Route path={`/${r.route}`} key={i}>
                      <Basic
                        type={r.route}
                        {...(r.route === 'gallery' && {
                        imageIds: imageIds,
                        imageCaptions: imageCaptions,
                        imageAltText: imageAltText
                      })}
                      />
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
