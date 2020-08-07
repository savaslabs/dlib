import React from 'react';
import { cleanJSON } from '../utils/constants';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

const card = React.forwardRef(({ event, feature, link }, ref) => {
  const { scope, headline, text, images, external_resource_links } = event;
  const designation = scope === 'National Event' ? 'National' : 'Durham';
  return (
    <Card ref={ref} scope={designation.toLowerCase()}>
      {/* Mobile scope pill. */}
      <Level scope={designation.toLowerCase()}>{designation}</Level>
      {feature && <Title scope={designation.toLowerCase()}>{headline}</Title>}
      <Body source={text}>{text}</Body>
      {images &&
        images.slice(0, 3).map((p, i) => {
          return (
            <CardImage
              key={i}
              src={`app/assets/images/${p.ID}/large.jpg`}
              alt={p.alt_text}
            />
          );
        })}
      {(!link && external_resource_links) && (
          <ExternalLinksWrapper>
            <ExternalLinksNote>For Further Reading:</ExternalLinksNote>
            {external_resource_links.map((ext, i) => {
              cleanJSON(ext);
              return (
                <ExternalLink key={i} href={ext.url}>
                  <LinkTitle>{ext.resource_title}</LinkTitle>
                  <LinkSource>{ext.source_shortform}</LinkSource>
                </ExternalLink>
              );
            })}
          </ExternalLinksWrapper>
        )}
    </Card>
  );
});
card.propTypes = {
  event: PropTypes.object.isRequired,
  feature: PropTypes.bool,
};

const Card = styled.article`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 12px 10px;
  letter-spacing: 0.02em;
  position: relative;
  border-top: 6px;
  border-top-style: solid;
  border-color: #e0e0e0;
  margin-bottom: 30px;
  ${breakpoint('sm', 'lg')`
    &:before {
      ${(props) =>
        props.scope === 'national' &&
        `
      left: -1px;
    `};
    }
  `}
  ${breakpoint('md')`
    width: 500px;
    padding: 24px;
  `}
  ${breakpoint('lg')`
    width: 415px;
    &:before {
      ${(props) =>
        props.scope === 'national' &&
        `
      right: 0;
    `};
    }
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
      props.scope === 'durham' &&
      `
      left: 0;
    `};

    top: -6px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 0 0 15px 0;
  line-height: ${(props) => props.theme.lineHeight.snug};
  color: ${(props) =>
    props.scope === 'national'
      ? props.theme.colors.medGray
      : props.theme.colors.greenBean};
`;

const Body = styled(Markdown)`
  color: ${(props) => props.theme.colors.darkGreen};
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const Level = styled.p`
  width: fit-content;
  border-radius: 19px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.21;
  margin-bottom: 10px;
  padding: 1px 10px;
  background: ${(props) =>
    props.scope === 'national'
      ? props.theme.colors.leafy
      : props.theme.colors.greenBean};
  color: ${(props) =>
    props.scope === 'national'
      ? props.theme.colors.charcoal
      : props.theme.colors.white};
  ${breakpoint('md')`
    display: none;
  `}
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
