import React from 'react';
import styled from 'styled-components';

const collectionInfo = ({ header, footer }) => {
  return (
    <CollectionInfo header={header} footer={footer}>
      <p>
        Part of the{' '}
        <a href="https://durhamcountylibrary.org/contact/ncc/">North Carolina Collection</a> of the{' '}
        <a href="https://durhamcountylibrary.org/">Durham County Library</a>
      </p>
    </CollectionInfo>
  );
};

const CollectionInfo = styled.div`
  color: ${props => (props.header ? props.theme.colors.darkGreen : props.theme.colors.white)};
  font-size: ${props => (props.header ? props.theme.fontSize.xxs : `18px`)};

  ${props =>
    props.header
      ? `
    padding: 10px 0 30px 0;
  `
      : `padding: 8px 0 30px 0;`}


  @media ${props => props.theme.breakpoints.md} {
    ${props =>
      props.header
        ? `
    padding: 10px 0 54px 110px;
  `
        : `padding: 14px 0 27px 0;`}


  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props =>
      props.header
        ? `
    padding: 10px 0 15px 142px;
  `
        : `padding: 10px 0 24px 0;`}
  }

  p {
    line-height: 1.2;
  }

  p a {
    text-decoration: underline;
    color: inherit;
  }
`;

export default collectionInfo;
