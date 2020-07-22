import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { cleanJSON } from '../utils/constants';
import arrow from '../assets/icons/arrow.svg';
import PropTypes from 'prop-types';

const card = React.forwardRef(({ event, link }, ref) => {
  cleanJSON(event);
  const { Scope, Text, Images, External_Resource_Links } = event;

  return (
    <Card ref={ref} scope={Scope === 'National Event' ? 'national' : 'durham'}>
      <p>{Text}</p>
      {Images &&
        Images.slice(0, 3).map((p, i) => {
          return (
            <CardImage
              key={i}
              src={`app/assets/images/${p.ID}/large.jpg`}
              alt={p.alt_text}
            />
          );
        })}
      {/* // Don't nest external resource links if card is already a link to event page. */}
      {!link && External_Resource_Links ? (
        <ExternalLinksWrapper>
          <ExternalLinksNote>For Further Reading:</ExternalLinksNote>
          {External_Resource_Links.map((ext, i) => {
            cleanJSON(ext);
            return (
              <ExternalLink key={i} href={ext.URL}>
                <LinkTitle>{ext.Resource_Title}</LinkTitle>
                <LinkSource>{ext.Source_Shortform}</LinkSource>
              </ExternalLink>
            );
          })}
        </ExternalLinksWrapper>
      ) : null}
    </Card>
  );
});

card.propTypes = {
  event: PropTypes.object.isRequired,
  link: PropTypes.bool,
};

const Card = styled.article`
  z-index: -1;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 24px;
  letter-spacing: 0.02em;
  position: relative;
  border-top: 6px;
  border-top-style: solid;
  border-color: #e0e0e0;
  margin-bottom: 30px;
  width: 240px;
  ${breakpoint('md')`
    width: 500px;
  `}
  ${breakpoint('lg')`
    width: 415px;
  `}

  /* Animated border color */
  &:before {
    transition: all linear 0.7s;
    transition-delay: 0.4s;
    background: none
      ${(props) => (props.scope === 'national' ? '#d5cc7f' : '#41796f;')};
    content: '';
    display: block;
    height: 6px;
    width: 0%;
    position: absolute;
    ${(props) =>
      props.scope === 'national' && // @TODO: put in lg breakpoint
      `
      right: 0;
    `};
    ${(props) =>
      props.scope === 'durham' &&
      `
      left: 0;
    `};

    top: -6px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const CardImage = styled.img`
  width: 117px;
  height: 117px;
  object-fit: cover;
  margin: 15px 15px 0 0;
`;

const ExternalLinksWrapper = styled.div`
  margin-top: 10px;
`;

const ExternalLinksNote = styled.p`
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const ExternalLink = styled.a`
  display: block;
  cursor: pointer;
  font-weight: ${(props) => props.theme.fontWeight.normal};

  &:first-of-type {
    margin-top: 10px;
  }

  &:not(:first-of-type) {
    margin-top: 5px;
  }
`;

const LinkTitle = styled.p`
  text-decoration: underline;
  cursor: pointer;
  line-height: 1.28;
  color: ${(props) => props.theme.colors.greenBean};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const LinkSource = styled.p`
  cursor: pointer;
  line-height: 1.44;
  color: ${(props) => props.theme.colors.linkSource};
  font-size: ${(props) => props.theme.fontSize.xs};
`;

export default card;
