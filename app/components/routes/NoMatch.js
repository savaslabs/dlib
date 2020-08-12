import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const noMatch = () => {
  const location = useLocation();

  return (
    <NoMatchWrapper>
      <h1>No match for {location.pathname}</h1>
    </NoMatchWrapper>
  );
};

const NoMatchWrapper = styled.div`
  padding-top: 50px;
  text-align: center;
`;

export default noMatch;
