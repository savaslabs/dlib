import React from 'react';
import { cleanJSON } from '../utils/constants';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import arrow from '../assets/icons/arrow.svg';

const card = React.forwardRef(({ event, feature, link, imageIds, openLightbox }, ref) => {
  const { scope, headline, text, images, external_resource_links } = event;
  const designation = scope === 'National Event' ? 'National' : 'Durham';
  return (
    <>
      <Card ref={ref} scope={designation.toLowerCase()} link={link}>
        {/* Mobile scope pill. */}
        <Level scope={designation.toLowerCase()}>{designation}</Level>
        {feature && <Title scope={designation.toLowerCase()}>{headline}</Title>}
        <Body source={text}>{text}</Body>
        {images && (
          <ImageGrid link={link}>
            {images.slice(0, 3).map((p, i) => {
              return (
                <CardImage
                  src={`./app/assets/images/${p.ID}/large.jpg`}
                  alt={p.alt_text}
                  link={link}
                  key={i}
                  data-photoindex={imageIds && imageIds.indexOf(p.ID)}
                  openLightbox={openLightbox}
                  {...(openLightbox && {
                    onClick: openLightbox,
                    onKeyDown: e => e.which === 13 && openLightbox(e),
                    tabIndex: 0,
                  })}
                />
              );
            })}
          </ImageGrid>
        )}
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
    </>
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
  background: ${props => props.theme.colors.white};
  border-top-style: solid;
  border-color: ${props => props.theme.colors.lightGray};
  margin-bottom: 45px;

  ${props =>
    props.link &&
    `
    transition: background 0.3s;

    &:hover,
    &:focus {
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
    width: 521px;
    padding: 24px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    width: 375px;

    &:before {
      ${props =>
        props.scope === 'national' &&
        `
      right: 0;
    `};
    }
  }

  @media ${props => props.theme.breakpoints.max} {
    width: 430px;
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
  font-size: 18px;
  margin: 0 0 15px 0;
  line-height: 1.1;
  font-weight: ${props => props.theme.fontWeight.extraBold};
  font-family: ${props => props.theme.fontFamily.muli};
  color: ${props =>
    props.scope === 'national' ? props.theme.colors.medGray : props.theme.colors.greenBean};

  @media ${props => props.theme.breakpoints.md} {
    font-size: 20px;
    line-break: 1.2;
  }
`;

const Body = styled(Markdown)`
  color: ${props => props.theme.colors.darkGreen};
  font-size: 16px;
  font-weight: ${props => props.theme.fontWeight.normal};
  letter-spacing: 0.02em;

  @media ${props => props.theme.breakpoints.md} {
    font-size: 18px;
  }

  > p {
    line-height: 1.2;
  }
`;

const Level = styled.p`
  width: fit-content;
  border-radius: 19px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: ${props => props.theme.fontFamily.muli};
  line-height: 1.1;
  font-weight: ${props => props.theme.fontFamily.semiBold};
  margin-bottom: 10px;
  padding: 3px 10px;
  background: ${props =>
    props.scope === 'national' ? props.theme.colors.leafy : props.theme.colors.greenBean};
  color: ${props =>
    props.scope === 'national' ? props.theme.colors.charcoal : props.theme.colors.white};

  @media ${props => props.theme.breakpoints.lg} {
    display: none;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 25px;
  ${props => props.link && `margin-bottom: 50px;`}

  @media ${props => props.theme.breakpoints.sm} {
    ${props => props.link && `margin-bottom: 45px;`}
  }

  @media ${props => props.theme.breakpoints.lg} {
    grid-column-gap: 16px;
    ${props => props.link && `margin-bottom: 40px;`}
  }
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;

  ${props =>
    props.openLightbox &&
      `
    &:hover,
    &:focus {
      cursor: pointer;
      filter: drop-shadow(5px 5px 30px rgba(0, 0, 0, 0.29));
    }
  `}

  @media ${props => props.theme.breakpoints.md} {
    height: 131px;
  }
`;

const ExternalLinksWrapper = styled.div`
  margin-top: 25px;
`;

const ExternalLinksNote = styled.p`
  font-weight: ${props => props.theme.fontWeight.semiBold};
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.medGray};
  font-family: ${props => props.theme.fontFamily.muli};
`;

const ExternalLink = styled.a`
  display: block;
  cursor: pointer;
  margin-top: 11px;
`;

const LinkTitle = styled.p`
  text-decoration: underline;
  cursor: pointer;
  line-height: 1.2;
  color: ${props => props.theme.colors.greenBean};
  font-size: 16px;
  font-family: ${props => props.theme.fontFamily.muli};
  font-weight: ${props => props.theme.fontWeight.light};

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.sm};
  }
`;

const LinkSource = styled.p`
  cursor: pointer;
  line-height: 1.2;
  margin-top: 5px;
  color: ${props => props.theme.colors.linkSource};
  font-weight: ${props => props.theme.fontWeight.normal};
  font-size: ${props => props.theme.fontSize.xxs};
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
    right: 30px;

    @media ${props => props.theme.breakpoints.md} {
      right: 42px;
    }
  }
`;

export const More = styled.p`
  font-size: 16px;
  line-height: 1.2;
  font-weight: ${props => props.theme.fontWeight.light};
  font-family: ${props => props.theme.fontFamily.muli};
  color: ${props => props.theme.colors.white};
  padding: 0 12px 0 12px;

  @media ${props => props.theme.breakpoints.md} {
    padding: 0 24px 0 24px;
    font-size: 20px;
  }
`;

export default card;
