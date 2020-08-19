import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { prepareCaptions, timelineDescription } from '../../utils/constants';
import useLightbox from '../../utils/hooks/useLightbox';
import AboutPage from '../../assets/pages/about.json';
import OralHistoriesPage from '../../assets/pages/oral-histories.json';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import Lightbox from '../Lightbox';
import Markdown from 'react-markdown';
import { Helmet } from 'react-helmet';

const basic = ({ event, type, imageData, imageIds, imageAltText, imageCaptions }) => {
  const location = useLocation();
  const {
    photoIndex,
    isLightboxOpen,
    openLightbox,
    closeLightbox,
    prevLightboxImage,
    nextLightboxImage
  } = useLightbox();
  const themeContext = useContext(ThemeContext);
  let data;
  let ogDescription;
  let ogImage;
  let ogImageAlt;
  let lightBoxImageIds = [];
  let eventLightBoxData = [];
  let captions = [];

  if (event) {
    data = event;
    // Add inline event image ids for lightbox.
    data.body.forEach((el, i) => {
      el.hasOwnProperty('image') ? lightBoxImageIds.push(el.image) : null;
    });
    // Add additional event image ids if they exist.
    lightBoxImageIds = event.images ? lightBoxImageIds.concat(event.images) : lightBoxImageIds;

    lightBoxImageIds.forEach(id => {
      eventLightBoxData.push(
        imageData.filter(imageInfo => {
          if (imageInfo.ID === id) {
            return imageInfo;
          }
        })
      );
    });

    // Create captions array for lightbox.
    captions = eventLightBoxData.map(c => {
      return c
        .map(ci => {
          return prepareCaptions(ci);
        })
        .flat();
    });
    ogDescription = data.body[0].text;
    ogImage = `https://dlib.netlify.app/app/assets/images/${lightBoxImageIds[0]}/large.jpg`;
    ogImageAlt = imageData.filter(imageInfo => {
      return imageInfo.ID === lightBoxImageIds[0];
    })[0].alt_text;
  } else if (type === 'about') {
    data = AboutPage;
    ogDescription = timelineDescription;
    ogImage = 'https://dlib.netlify.app/app/assets/images/ogImage.svg';
    ogImageAlt = 'placeholder';
  } else if (type === 'oral_histories') {
    data = OralHistoriesPage;
    ogDescription = data.body[0].text;
    ogImage = 'https://dlib.netlify.app/app/assets/images/ogImage.svg';
    ogImageAlt = 'placeholder';
  } else if (type === 'gallery') {
    data = { name: 'Photo Gallery' };
    ogDescription = timelineDescription;
    ogImage = `https://dlib.netlify.app/app/assets/images/${imageIds[0]}/large.jpg`;
    ogImageAlt = imageAltText[0];
  }

  return (
    <>
      <Helmet>
        <title>{`${data.name} | Durham Civil Rights Heritage Project`}</title>
        <meta
          property="og:title"
          content={`${data.name} | Durham Civil Rights Heritage Project`}
          data-react-helmet="true"
        />
        <meta property="description" content={ogDescription} data-react-helmet="true" />
        <meta property="og:description" content={ogDescription} data-react-helmet="true" />
        <link rel="logo" type="image/svg" href={ogImage} data-react-helmet="true" />
        <meta property="og:image" content={ogImage} data-react-helmet="true" />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="twitter:url" content={`https://dlib.netlify.app${location.pathname}`} data-react-helmet="true" />
        <meta
          name="twitter:title"
          content={`${data.name} | Durham Civil Rights Heritage Project`}
          data-react-helmet="true"
        />
        <meta name="twitter:description" content={ogDescription} data-react-helmet="true" />
        <meta name="twitter:image" content={ogImage} data-react-helmet="true" />
        <html style={isLightboxOpen ? 'overflow: hidden;' : null} />
        <body style={isLightboxOpen ? themeContext.noScrollBody : null} />
      </Helmet>
      <Content isLightboxOpen={isLightboxOpen}>
        <FloatWrapper>
          <Main gallery={type === 'gallery' ? true : false}>
            <H1>{data.name}</H1>
            {data.body &&
              data.body.map((item, i) => {
                // Second level heading.
                if (item.hasOwnProperty('h2')) {
                  return <h2 key={i}>{item.h2}</h2>;
                  // Body text.
                } else if (item.hasOwnProperty('text')) {
                  return (
                    <P key={i} source={item.text}>
                      {item.text}
                    </P>
                  );
                  // Pullquote with optional attribution.
                } else if (item.hasOwnProperty('pullquote')) {
                  return (
                    <Figure key={i}>
                      <Blockquote>{`"${item.pullquote.quote}"`}</Blockquote>
                      {item.pullquote.attribution && (
                        <Figcaption>{item.pullquote.attribution}</Figcaption>
                      )}
                    </Figure>
                  );
                  // Unordered list.
                } else if (item.hasOwnProperty('ul')) {
                  return (
                    <Ul key={i}>
                      {item.ul.map((li, idx) => {
                        return (
                          <Li key={idx}>
                            <Markdown source={li}>{li}</Markdown>
                          </Li>
                        );
                      })}
                    </Ul>
                  );
                  // Inline image with caption.
                } else if (item.hasOwnProperty('image')) {
                  const foundImage = imageData.filter(imageInfo => {
                    return imageInfo.ID === item.image;
                  });
                  return (
                    <InlineImageWrapper key={i}>
                      <InlineImage
                        key={i}
                        data-photoindex={lightBoxImageIds.indexOf(item.image)}
                        onClick={openLightbox}
                        src={`../app/assets/images/${item.image}/large.jpg`}
                        alt={foundImage[0].alt_text}
                      />
                      <InlineImageCaption>
                        {captions[lightBoxImageIds.indexOf(item.image)]}
                      </InlineImageCaption>
                    </InlineImageWrapper>
                  );
                }
              })}
            {type === 'gallery' &&
              useMemo(() => {
                return (
                  <GalleryGrid>
                    {imageIds &&
                      imageIds.map((id, i) => {
                        return (
                          <GalleryImage
                            src={`../app/assets/images/${id}/full.jpg`}
                            alt={imageAltText[i]}
                            key={i}
                            data-photoindex={i}
                            onClick={openLightbox}
                          />
                        );
                      })}
                  </GalleryGrid>
                );
              })}
            {(type === 'gallery' || event) && (
              <Lightbox
                imageIds={lightBoxImageIds.length > 0 ? lightBoxImageIds : imageIds}
                imageCaptions={captions.length > 0 ? captions : imageCaptions}
                isOpen={isLightboxOpen}
                photoIndex={photoIndex}
                closeLightbox={closeLightbox}
                prevLightboxImage={prevLightboxImage}
                nextLightboxImage={nextLightboxImage}
                eventPage={event}
              />
            )}
          </Main>
          {data.images &&
            data.images.map((imageId, idx) => {
              const foundImage = imageData.filter(imageInfo => {
                return imageInfo.ID === imageId;
              });
              return (
                <SideImage
                  key={idx}
                  data-photoindex={lightBoxImageIds.indexOf(imageId)}
                  onClick={openLightbox}
                  src={`../app/assets/images/${imageId}/large.jpg`}
                  alt={foundImage[0].alt_text}
                />
              );
            })}
        </FloatWrapper>
      </Content>
    </>
  );
};

basic.propTypes = {
  event: PropTypes.object,
  type: PropTypes.string,
  imageIds: PropTypes.array,
  imageAltText: PropTypes.array,
  imageCaptions: PropTypes.array,
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.string,
      __id: PropTypes.string,
      alt_text: PropTypes.string,
      attribution: PropTypes.string,
      caption: PropTypes.string,
      citation: PropTypes.string,
      image: PropTypes.array,
      timelineEvents: PropTypes.array,
    })
  ),
};

// Prevent scroll and ensure header is behind lightbox when open.
const Content = styled.main`
  ${props =>
    props.isLightboxOpen &&
    `
    z-index: 999;
    overflow-y: hidden;
  `}

  &:after {
    content: '';
    clear: both;
    display: table;
  }
`;

const FloatWrapper = styled.div`
  @media ${props => props.theme.breakpoints.md} {
    margin-right: -20px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    margin-right: -21px;
  }
`;

const Main = styled.div`
  @media ${props => props.theme.breakpoints.lg} {
    width: ${props => (props.gallery ? '100%' : '782px')};
    height: fit-content;
    float: left;
    margin-right: 105px;
  }
`;

const H1 = styled.h1`
  font-size: ${props => props.theme.fontSize.md};
  line-height: ${props => props.theme.lineHeight.xLoose};

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.mdLg};
    line-height: ${props => props.theme.lineHeight.snug};
  }

  @media ${props => props.theme.breakpoints.mdMax} {
    margin: 50px 0 20px 0;
  }

  @media ${props => props.theme.breakpoints.lg} {
    font-size: ${props => props.theme.fontSize.xxl};
  }
`;

const P = styled(Markdown)`
  margin-bottom: 30px;
  font-size: ${props => props.theme.fontSize.sm};

  a {
    color: ${props => props.theme.colors.greenBean};
  }
`;

const Figure = styled.figure`
  margin-inline-start: 2em;
  margin-inline-end: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  font-style: italic;
  font-size: ${props => props.theme.fontSize.sm};
  line-height: ${props => props.theme.lineHeight.loose};
  margin-bottom: 30px;

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.md};
  }

  @media ${props => props.theme.breakpoints.lg} {
    font-size: ${props => props.theme.fontSize.lg};
  }

  &:before {
    content: '';
    position: absolute;
    border-left: 8px solid ${props => props.theme.colors.greenBean};
    left: 0;
    height: 100%;
    width: 1px;
  }
`;

const Blockquote = styled.blockquote`
  margin-inline-end: 0;
  margin-block-start: 0;
  margin-block-end: 0;
`;

const Figcaption = styled.figcaption`
  margin-top: 10px;
  align-self: flex-end;
  color: ${props => props.theme.colors.greenBean};
  max-width: 60%;
  position: relative;

  &:before {
    content: '—';
    position: absolute;
    left: -35px;
  }
`;

const Ul = styled.ul`
  margin-inline-start: 3em;
  padding-inline-start: 2em;
  margin-bottom: 30px;
`;

const Li = styled.li`
  line-height: ${props => props.theme.lineHeight.xxLoose};
  font-size: ${props => props.theme.fontSize.sm};
  position: relative;

  p a {
    color: ${props => props.theme.colors.darkGreen};
    line-height: ${props => props.theme.lineHeight.xxLoose};
    text-decoration: underline;
  }

  &::before {
    content: '';
    position: absolute;
    left: -30px;
    background: ${props => props.theme.colors.greenBean};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 12px;
  }
`;

const InlineImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const InlineImage = styled.img`
  object-fit: cover;
  margin-bottom: 18px;

  @media ${props => props.theme.breakpoints.mdMax} {
    width: calc(100vw - 36px);
    height: calc(100vw - 36px);
  }

  @media ${props => props.theme.breakpoints.lg} {
    margin-right: 30px;
    width: 100%;
  }

  &:hover {
    box-shadow: ${props => props.theme.boxShadow.xDark};
  }
`;

const InlineImageCaption = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const SideImage = styled.img`
  object-fit: cover;
  width: calc(100vw - 36px);
  height: calc(100vw - 36px);
  margin-bottom: 18px;

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

  &:hover {
    box-shadow: ${props => props.theme.boxShadow.xDark};
    cursor: pointer;
  }
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media ${props => props.theme.breakpoints.md} {
    display: grid;
    grid-template-columns: 225px 225px 225px;
    justify-content: space-between;
  }

  @media ${props => props.theme.breakpoints.lg} {
    display: grid;
    grid-template-columns: 347px 347px 347px;
  }
`;

const GalleryImage = styled.img`
  object-fit: cover;
  width: calc(100vw - 36px);
  height: calc(100vw - 36px);
  margin-bottom: 18px;

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

export default basic;
