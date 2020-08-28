import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const noMatch = () => {
  const location = useLocation();

  const message = `404: No match for ${location.pathname}`;
  return (
    <>
      <Helmet>
        <title>404: Not Found</title>
        <meta
          property="og:title"
          content="404 Not Found"
          data-react-helmet="true"
        />
        <meta property="og:description" content={message} data-react-helmet="true" />
        <meta name="description" content={message} data-react-helmet="true" />
        <meta
          name="twitter:title"
          content="404 Not Found"
          data-react-helmet="true"
        />
        <meta name="twitter:description" content={message} data-react-helmet="true" />
      </Helmet>
      <NoMatchWrapper>
        <h1>404: No match for {location.pathname}</h1>
      </NoMatchWrapper>
    </>
  );
};

const NoMatchWrapper = styled.div`
  padding-top: 50px;
  text-align: center;
`;

export default noMatch;
