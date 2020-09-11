import React from 'react';
import styled from 'styled-components';

const image = ({
  src,
  alt,
  dataPhotoIndex,
  openLightbox,
  inline,
  sideline,
  gallery,
  card,
  link,
}) => {
  const sharedAttributes = {
    ['src']: src,
    ['alt']: alt,
    ['data-photoindex']: dataPhotoIndex,
    ['tabIndex']: 0,
    ['onClick']: openLightbox,
    ['onKeyDown']: e => e.which === 13 && openLightbox(e),
  };
  return inline ? (
    // Event page.
    <InlineImage inline={inline} {...sharedAttributes} />
  ) : sideline ? (
    // Event page.
    <SideImage sideline={sideline} {...sharedAttributes} />
  ) : gallery ? (
    // Photo gallery.
    <GalleryImage gallery={gallery} {...sharedAttributes} />
  ) : card ? (
    // Timeline.
    <CardImage
      card={card}
      link={link ? link : false}
      src={src}
      alt={alt}
      data-photoindex={dataPhotoIndex}
      {...(link || {
        onClick: openLightbox,
        onKeyDown: e => e.which === 13 && openLightbox(e),
        tabIndex: 0,
      })}
    />
  ) : null;
};

const Image = styled.img`
  object-fit: cover;

  /* hover/focus states for images that open lightbox */
  ${props =>
    props.link ||
    `
    &:hover,
    &:focus {
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
        cursor: pointer;
      }
  `}

  ${props =>
    props.card &&
    `
    width: 100%;
    height: 120px;
  `}

  /* Mobile bottom margin for basic page images */
  ${props =>
    props.inline ||
    props.sideline ||
    (props.gallery &&
      ` margin-bottom: 18px; `)}

  /* Mobile dimensions for sideline and gallery images */
  ${props =>
    props.sideline ||
    (props.gallery &&
      ` width: calc(100vw - 36px);
  height: calc(100vw - 36px); `)}
`;

const InlineImage = styled(Image)`
  @media ${props => props.theme.breakpoints.mdMax} {
    height: calc(100vw - 36px);
  }

  @media ${props => props.theme.breakpoints.lg} {
    margin-right: 30px;
    width: 100%;
  }
`;

const SideImage = styled(Image)`
  @media ${props => props.theme.breakpoints.md} {
    width: 230px;
    height: 230px;
    margin: 0 20px 27px 0;
  }

  @media ${props => props.theme.breakpoints.lg} {
    width: 275px;
    height: 275px;
    margin: 0 21px 23px 0;

    &:first-of-type {
      margin-top: 85px;
    }
  }
`;

const GalleryImage = styled(Image)`
  @media ${props => props.theme.breakpoints.md} {
    width: 225px;
    height: 225px;
    margin-bottom: 30px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    width: 347px;
    height: 347px;
    margin-bottom: 50px;
  }

  @media ${props => props.theme.breakpoints.max} {
    margin-bottom: 75px;
  }
`;

const CardImage = styled(Image)`
  width: 100%;

  @media ${props => props.theme.breakpoints.md} {
    height: 131px;
  }
`;

export default image;
