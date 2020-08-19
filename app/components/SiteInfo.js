import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
          Part of the{' '}
          <a href="https://durhamcountylibrary.org/contact/ncc/">North Carolina Collection</a>
          <br />
          of the <a href="https://durhamcountylibrary.org/">Durham County Library</a>
        </p>
      </CollectionInfo>
    </>
  );
};

const SiteName = styled(NavLink)`
  font-weight: ${props => props.theme.fontWeight.bold};
  line-height: ${props => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  font-size: ${props => props.theme.fontSize.md};
  padding-top: 30px;

  ${props =>
    props.footer &&
    `
      z-index: 1;
      margin-top: 30px;
      color: ${props.theme.colors.greenBean};
      max-width: 250px;
  `}

  ${props =>
    props.header &&
    `
    color: ${props.theme.colors.white};
  `}

  @media ${props => props.theme.breakpoints.smMax} {
    ${props =>
      props.footer &&
      `
    color: ${props.theme.colors.white};
    padding: 0 0 30px 0;
    `}
  }

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.lg};
  }

  @media ${props => props.theme.breakpoints.lg} {
    font-size: ${props => props.theme.fontSize.xl};
    line-height: ${props => props.theme.lineHeight.loose};
    background-color: ${props =>
      props.header ? props.theme.colors.greenBean : props.theme.colors.white};
    padding: 20px 60px 24px 0;
  }
`;

const CollectionInfo = styled.div`
  padding-top: 50px;
  color: ${props => (props.header ? props.theme.colors.greenBean : props.theme.colors.white)};
  font-size: ${props => props.theme.fontSize.sm};

  @media ${props => props.theme.breakpoints.smMax} {
    ${props => props.footer && `display: none`};
  }

  @media ${props => props.theme.breakpoints.mdMax} {
    ${props => props.header && `padding-top: 40px;`}
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding-top: 22px;
    font-size: ${props => props.theme.fontSize.md};
  }

  p a {
    text-decoration: underline;
    color: inherit;
  }
`;

export default siteInfo;
