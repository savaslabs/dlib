import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const siteInfo = ({ header, footer }) => {
  return (
    <>
      <SiteName to={`/`} header={header} footer={footer}>
        The Durham
        <br />
        Civil Rights
        <br />
        Heritage Project
      </SiteName>
      <CollectionInfo header={header} footer={footer}>
        <p>
          Part of the <a href='https://durhamcountylibrary.org/contact/ncc/'>North Carolina Collection</a>
          <br />
          of the{' '}
          <a href='https://durhamcountylibrary.org/'>Durham County Library</a>
        </p>
      </CollectionInfo>
    </>
  );
};

const SiteName = styled(NavLink)`
  ${(props) =>
    props.footer &&
    `
      z-index: 1;
      margin-top: 30px;
      color: ${props.theme.colors.greenBean};
  `}

  ${(props) =>
    props.header &&
    `
    color: ${props.theme.colors.white};
  `}

  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.md};
  padding-top: 30px;
  ${breakpoint('md')`
    font-size: 24px;
  `}
  ${breakpoint('lg')`
    font-size: 31px;
    line-height: 1.31;
    background-color: ${(props) => props.header ? props.theme.colors.greenBean : props.theme.colors.white};
    padding: 20px 60px 24px 0;
  `}
`;

const CollectionInfo = styled.div`
  padding-top: 50px;
  color: ${(props) => props.header ? props.theme.colors.greenBean : props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSize.sm};
  p a {
    text-decoration: underline;
    color: inherit;
  }

  ${breakpoint('md', 'lg')`
    ${props => props.header && `padding-top: 20px;`}
  `}

  ${breakpoint('lg')`
    padding-top: 22px;
    font-size: ${(props) => props.theme.fontSize.md};
  `}
`;

export default siteInfo;
