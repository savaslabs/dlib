import React, { useState, useEffect, useRef } from 'react';
import '@babel/polyfill';
import { routes, cleanId, prepareCaptions } from './utils/constants';
import { Switch, Route } from 'react-router-dom';

// Components.
import TopOfPage from './components/TopOfPage';
import Header from './components/Header';
import Timeline from './components/routes/Timeline';
import Basic from './components/routes/Basic';
import Footer from './components/Footer';
import NoMatch from './components/routes/NoMatch';

// Data.
import EventPages from './assets/pages/event-pages.json';
import Events from './assets/events-data.json';
import Images from './assets/images-data.json';

// Styling.
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import GlobalStyles from './globalStyles';
import styled from 'styled-components';
import './index.css';

const App = () => {
  const [timeline, setTimeline] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [imageCaptions, setImageCaptions] = useState([]);
  const [imageAltText, setImageAltText] = useState([]);
  const skipRef = useRef(null);

  // Fetch timeline events.
  useEffect(() => {
    setTimeline(Events);
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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {timeline ? (
        <>
          <SkipToMainContentWrapper>
            <SkipToMainContent ref={skipRef} href="#main-content">
              <ScreenReaderText>Skip to main content</ScreenReaderText>
            </SkipToMainContent>
          </SkipToMainContentWrapper>
          <TopOfPage />
          <Header eventPages={EventPages} skipRef={skipRef} />
          <ContentContainer id="main-content">
            <Switch>
              {routes &&
                routes.map((r, i) => {
                  return r.route === 'timeline' && timeline ? (
                    <Route exact path={'/'} key={i}>
                      <Timeline timeline={timeline} />
                    </Route>
                  ) : r.component === 'Featured Events' && EventPages ? (
                    EventPages.map((event, index) => {
                      return (
                        <Route path={`/events/${cleanId(event.name)}`} key={index}>
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
                          imageAltText: imageAltText,
                        })}
                      />
                    </Route>
                  );
                })}
              {/* No Match routes */}
              <Route path="*">
                <NoMatch />
              </Route>
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
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
  }
`;

const ScreenReaderText = styled.span`
  ${props => props.theme.srOnly};
`;

const SkipToMainContentWrapper = styled.div`
  background: ${props => props.theme.colors.greenBean};
  z-index: 20;
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const SkipToMainContent = styled.a`
  color: ${props => props.theme.colors.white};

  &:focus {
    ${ScreenReaderText} {
      ${props => props.theme.notSrOnly};
    }
  }
`;

export default App;
