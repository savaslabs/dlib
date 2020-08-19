import React from 'react';
import { cleanJSON } from '../utils/constants';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import arrow from '../assets/icons/arrow.svg';

const card = React.forwardRef(({ event, feature, link, imageIds, onClick }, ref) => {
  const { scope, headline, text, images, external_resource_links } = event;
  const designation = scope === 'National Event' ? 'National' : 'Durham';
  return (
    <Card ref={ref} scope={designation.toLowerCase()} link={link}>
      {/* Mobile scope pill. */}
      <Level scope={designation.toLowerCase()}>{designation}</Level>
      {feature && <Title scope={designation.toLowerCase()}>{headline}</Title>}
      <Body source={text}>{text}</Body>
      {images &&
        images.slice(0, 3).map((p, i) => {
          return (
<<<<<<< HEAD
            <CardImage
              key={i}
              src={`app/assets/images/${p.ID}/large.jpg`}
              alt={p.alt_text}
              data-photoindex={imageIds && imageIds.indexOf(p.ID)}
              onClick={console.log('click')}
              // {...(onClick && {
              //   onClick: onClick,
              // })}
            />
=======
            <CardImage key={i} src={`./app/assets/images/${p.ID}/large.jpg`} alt={p.alt_text} link={link} />
>>>>>>> 6e82044d5a2cb71b06509903baaa3278418bd85b
          );
        })}
      {!link && external_resource_links && (
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
      {link && (
        <Arrow>
          <More>More about this event</More>
        </Arrow>
      )}
    </Card>
  );
});
card.propTypes = {
  event: PropTypes.object.isRequired,
  feature: PropTypes.bool,
};

const Card = styled.article`
  box-shadow: ${props => props.theme.boxShadow.light};
  border-radius: 4px;
  padding: 12px 10px;
  letter-spacing: 0.02em;
  position: relative;
  border-top: 6px;
  border-top-style: solid;
  border-color: ${props => props.theme.colors.lightGray};
  margin-bottom: 30px;

  ${props =>
    props.link &&
    `
    transition: background 0.3s;
    &:hover {
      background: #D9E6E3;

      ${Arrow} {
        height: 75px;
      }
    }
  `}

  @media ${props => props.theme.breakpoints.mdMax} {
    &:before {
      ${props =>
        props.scope === 'national' &&
        `
      left: -1px;
    `};
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    width: 500px;
    padding: 24px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    width: 415px;

    &:before {
      ${props =>
        props.scope === 'national' &&
        `
      right: 0;
    `};
    }
  }

  /* Animated border color */
  &:before {
    transition: all linear 0.7s;
    transition-delay: 0.4s;
    background: ${props => (props.scope === 'national' ? '#d5cc7f' : '#41796f;')};
    content: '';
    display: block;
    height: 6px;
    width: 0%;
    position: absolute;

    ${props =>
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
  line-height: ${props => props.theme.lineHeight.snug};
  color: ${props =>
    props.scope === 'national' ? props.theme.colors.medGray : props.theme.colors.greenBean};
`;

const Body = styled(Markdown)`
  color: ${props => props.theme.colors.darkGreen};
  font-size: ${props => props.theme.fontSize.sm};
`;

const Level = styled.p`
  width: fit-content;
  border-radius: 19px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: ${props => props.theme.lineHeight.loose};
  margin-bottom: 10px;
  padding: 1px 10px;
  background: ${props =>
    props.scope === 'national' ? props.theme.colors.leafy : props.theme.colors.greenBean};
  color: ${props =>
    props.scope === 'national' ? props.theme.colors.charcoal : props.theme.colors.white};

  @media ${props => props.theme.breakpoints.lg} {
    display: none;
  }
`;

const CardImage = styled.img`
  width: 117px;
  height: 117px;
  object-fit: cover;
  margin: 15px 15px 0px 0;

  @media ${props => props.theme.breakpoints.sm} {
    ${props => props.link && `margin-bottom: 45px;`}
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.link && `margin-bottom: 35px;`}
  }
`;

const ExternalLinksWrapper = styled.div`
  margin-top: 10px;
`;

const ExternalLinksNote = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const ExternalLink = styled.a`
  display: block;
  cursor: pointer;
  font-weight: ${props => props.theme.fontWeight.normal};

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
  line-height: ${props => props.theme.lineHeight.mdLoose};
  color: ${props => props.theme.colors.greenBean};
  font-size: ${props => props.theme.fontSize.xs};

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.sm};
  }
`;

const LinkSource = styled.p`
  cursor: pointer;
  line-height: ${props => props.theme.lineHeight.mdLoose};
  color: ${props => props.theme.colors.linkSource};
  font-size: ${props => props.theme.fontSize.xs};
`;

const Arrow = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 50px;
  width: 100%;
  z-index: 1;
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: height 0.3s;
  background: ${props => props.theme.colors.greenBean};

  &:after {
    content: '';
    mask: url(${arrow}) no-repeat 50% 50%;
    mask-size: cover;
    position: absolute;
    transform: rotate(90deg) translateY(-50%);
    background: ${props => props.theme.colors.white};
    width: 15px;
    height: 25px;
    right: 12px;

    @media ${props => props.theme.breakpoints.md} {
      right: 24px;
    }
  }
`;

export const More = styled.p`
  color: ${props => props.theme.colors.white};
  padding: 0 12px 0 12px;

  @media ${props => props.theme.breakpoints.md} {
    padding: 0 24px 0 24px;
  }
`;

export default card;
