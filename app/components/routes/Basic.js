import React, { useMemo, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import useInfiniteScroll from '../../utils/hooks/useInfiniteScroll';
import { LightboxContext } from '../../utils/lightboxContext';
import { prepareCaptions, timelineDescription, pathToImages } from '../../utils/constants';
import AboutPage from '../../assets/pages/about.json';
import OralHistoriesPage from '../../assets/pages/oral-histories.json';
import Image from '../Image';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lightbox from '../Lightbox';
import Markdown from 'react-markdown';
import LazyLoad from 'react-lazy-load';
import { Helmet } from 'react-helmet';

const basic = ({ event, type, imageData, imageIds, imageAltText, imageCaptions }) => {
  const location = useLocation();
  const { isLightboxOpen, setIsLightboxOpen } = useContext(LightboxContext);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { listItems, setIsFetching } = type === 'gallery' && useInfiniteScroll(imageIds, 'images');
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
    ogImage = `${lightBoxImageIds[0]}/large.jpg`;
    ogImageAlt = imageData.filter(imageInfo => {
      return imageInfo.ID === lightBoxImageIds[0];
    })[0].alt_text;
  } else if (type === 'about') {
    data = AboutPage;
    ogDescription = timelineDescription;
    ogImage = 'ogImage.svg';
    ogImageAlt = 'placeholder';
  } else if (type === 'oral_histories') {
    data = OralHistoriesPage;
    ogDescription = data.body[0].text;
    ogImage = 'ogImage.svg';
    ogImageAlt = 'placeholder';
  } else if (type === 'gallery') {
    data = { name: 'Photo Gallery' };
    ogDescription = timelineDescription;
    ogImage = `${imageIds[0]}/large.jpg`;
    ogImageAlt = imageAltText[0];
  }

  // Mimic infinite scroll with gallery images.
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (type === 'gallery') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const openLightbox = e => {
    const photoIndex = parseInt(e.target.getAttribute('data-photoindex'), 10);
    setPhotoIndex(photoIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = e => setIsLightboxOpen(false);

  const getIds = () => {
    let ids;
    if (event) {
      ids = lightBoxImageIds;
    } else {
      ids = imageIds;
    }
    return ids;
  };

  const nextLightboxImage = e => {
    setPhotoIndex(photoIndex + 1 < getIds().length ? photoIndex + 1 : 0);
  };

  const prevLightboxImage = e => {
    setPhotoIndex(photoIndex - 1 >= 0 ? photoIndex - 1 : getIds().length - 1);
  };

  return (
    <>
      <Helmet>
        <title>{`${data.name} | Durham Civil Rights Heritage Project`}</title>
        <meta
          property="og:title"
          content={`${data.name} | Durham Civil Rights Heritage Project`}
          data-react-helmet="true"
        />
        <meta name="description" content={ogDescription} data-react-helmet="true" />
        <meta property="og:description" content={ogDescription} data-react-helmet="true" />
        <link
          rel="logo"
          type="image/svg"
          content={`${pathToImages}${ogImage}`}
          data-react-helmet="true"
        />
        <meta property="og:image" content={`${pathToImages}${ogImage}`} data-react-helmet="true" />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta
          property="twitter:url"
          content={`https://dlib.netlify.app${location.pathname}`}
          data-react-helmet="true"
        />
        <meta
          name="twitter:title"
          content={`${data.name} | Durham Civil Rights Heritage Project`}
          data-react-helmet="true"
        />
        <meta name="twitter:description" content={ogDescription} data-react-helmet="true" />
        <meta name="twitter:image" content={`${pathToImages}${ogImage}`} data-react-helmet="true" />
      </Helmet>
      <Content isLightboxOpen={isLightboxOpen}>
        <FloatWrapper type={type}>
          <Main gallery={type === 'gallery' ? true : false}>
            <H1>{data.name}</H1>
            {data.body &&
              data.body.map((item, i) => {
                // Second level heading.
                if (item.hasOwnProperty('h2')) {
                  return <H2 key={i}>{item.h2}</H2>;
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
                      <Image
                        inline
                        openLightbox={openLightbox}
                        dataPhotoIndex={lightBoxImageIds.indexOf(item.image)}
                        src={`${pathToImages}${item.image}/large.jpg`}
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
                    {listItems &&
                      listItems.map((id, i) => {
                        return (
                          <LazyLoad once={true} key={i}>
                            <Image
                              gallery
                              src={`${pathToImages}${id}/large.jpg`}
                              alt={imageAltText[i]}
                              dataPhotoIndex={i}
                              openLightbox={openLightbox}
                            />
                          </LazyLoad>
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
              />
            )}
          </Main>
          {data.images &&
            data.images.map((imageId, idx) => {
              const foundImage = imageData.filter(imageInfo => {
                return imageInfo.ID === imageId;
              });
              return (
                <Image
                  key={idx}
                  sideline
                  dataPhotoIndex={lightBoxImageIds.indexOf(imageId)}
                  openLightbox={openLightbox}
                  src={`${pathToImages}${imageId}/large.jpg`}
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
  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.type === 'gallery' || `margin-right: -20px;`}
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
  font-family: ${props => props.theme.fontFamily.muli};
  line-height: ${props => props.theme.lineHeight.xLoose};
  padding-bottom: 25px;
  border-bottom: 3px solid ${props => props.theme.colors.cloudySkies};

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.mdLg};
    line-height: ${props => props.theme.lineHeight.snug};
  }

  @media ${props => props.theme.breakpoints.mdMax} {
    margin: 50px 0 20px 0;
  }

  @media ${props => props.theme.breakpoints.lg} {
    margin: 80px 0 40px 0;
    font-size: ${props => props.theme.fontSize.xxl};
    font-weight: ${props => props.theme.fontWeight.light};
    line-height: 1.4;
  }
`;

const H2 = styled.h2`
  font-family: ${props => props.theme.fontFamily.muli};
  font-weight: ${props => props.theme.fontWeight.regular};
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
    border-left: 5px solid ${props => props.theme.colors.greenBean};
    left: 0;
    height: 100%;
    width: 1px;
  }
`;

const Blockquote = styled.blockquote`
  margin-inline-end: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  line-height: 1.4;
`;

const Figcaption = styled.figcaption`
  margin-top: 16px;
  align-self: flex-end;
  line-height: 1.2;
  font-weight: ${props => props.theme.fontWeight.light};
  font-family: ${props => props.theme.fontFamily.muli};
  color: ${props => props.theme.colors.greenBean};
  max-width: 60%;
  position: relative;

  @media ${props => props.theme.breakpoints.lg} {
    margin-top: 33px;
  }

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
  line-height: 1.6;
  font-size: ${props => props.theme.fontSize.sm};
  position: relative;
  margin-bottom: 10px;

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

const InlineImageCaption = styled.p`
  line-height: 1.38;
  margin-top: 15px;
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

export default basic;
