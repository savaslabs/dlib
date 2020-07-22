import React, { useState } from 'react';
import { prepareCaptions } from '../../utils/constants';
import AboutPage from '../../assets/pages/about.json';
import OralHistoriesPage from '../../assets/pages/oral-histories.json';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Lightbox from '../Lightbox';
import Markdown from 'react-markdown';

const basic = ({ event, type, imageData, imageIds, imageAltText, imageCaptions }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  let data;
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
      eventLightBoxData.push(imageData.filter((imageInfo) => {
        if (imageInfo.ID === id) {
          return imageInfo;
        }
      }));

    })

    // Create captions array for lightbox.
    captions = eventLightBoxData.map((c => {
      return c.map((ci) => {
        return prepareCaptions(ci);
      }).flat()
    }));
  } else if (type === 'about') {
    data = AboutPage;
  } else if (type === 'oral_histories') {
    data = OralHistoriesPage;
  } else if (type === 'gallery') {
    data = { name: 'Photo Gallery' };
  }

  // Open lightbox anytime a photo is clicked.
  const openLightbox = e => {
    const photoIndex = parseInt(e.target.getAttribute('data-photoindex'), 10);
    setPhotoIndex(photoIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = e => {
    setIsLightboxOpen(false);
  }

  const nextLightboxImage = e => {
    let ids;
    if (event) {
      ids = lightBoxImageIds;
    } else {
      ids = imageIds;
    }

    setPhotoIndex((photoIndex + 1) < ids.length ? photoIndex + 1 : 0);
  };

  return (
    <Content>
      <Main>
        <H1>{data.name}</H1>
        {data.body &&
          data.body.map((item, i) => {
            // Second level heading.
            if (item.hasOwnProperty('h2')) {
              return <h2 key={i}>{item.h2}</h2>;
              // Body text.
            } else if (item.hasOwnProperty('text')) {
              return <P key={i} source={item.text}>{item.text}</P>;
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
                    return <Li key={idx}>{li}</Li>;
                  })}
                </Ul>
              );
              // Inline image with caption.
            } else if (item.hasOwnProperty('image')) {
              const foundImage = imageData.filter((imageInfo) => {
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
                  <InlineImageCaption>{foundImage[0].caption}</InlineImageCaption>
                </InlineImageWrapper>
              );
            }
          })}
        {type === 'gallery' && (
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
        )}
        {(type === 'gallery' || event) && (
          <Lightbox
            imageIds={lightBoxImageIds.length > 0 ? lightBoxImageIds : imageIds}
            imageCaptions={captions.length > 0 ? captions : imageCaptions}
            isOpen={isLightboxOpen}
            photoIndex={photoIndex}
            closeLightbox={closeLightbox}
            nextLightboxImage={nextLightboxImage}
            eventPage={event}
          />
        )}
      </Main>
      {data.images &&
        data.images.map((imageId, idx) => {
          const foundImage = imageData.filter((imageInfo) => {
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
    </Content>
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

const Content = styled.main`
  ${breakpoint('lg')`
    overflow: auto;
  `}
`;

const Main = styled.div`
  ${breakpoint('lg')`
    width: 782px;
    height: fit-content;
    float: left;
    margin-right: 105px;
  `}
`;

const H1 = styled.h1`
  line-height: 1.15;
`;

const P = styled(Markdown)`
  margin-bottom: 30px;
  font-size: ${(props) => props.theme.fontSize.sm};

  a {
    color: ${(props) => props.theme.colors.greenBean};
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
  font-size: ${(props) => props.theme.fontSize.lg};
  line-height: ${(props) => props.theme.lineHeight.loose};
  margin-bottom: 30px;
  &:before {
    content: '';
    position: absolute;
    border-left: 8px solid ${(props) => props.theme.colors.greenBean};
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
  color: ${(props) => props.theme.colors.greenBean};
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
  line-height: ${(props) => props.theme.lineHeight.xxLoose};
  font-size: ${(props) => props.theme.fontSize.sm};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -30px;
    background: ${(props) => props.theme.colors.greenBean};
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
  width: 100%;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
  }
  ${breakpoint('sm', 'lg')`
    margin-bottom: 30px;
  `}
  ${breakpoint('md')`
    margin-right: 30px;
    object-fit: cover;
  `}
`;

const InlineImageCaption = styled.p`
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const SideImage = styled.img`
  width: 100%;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
  }

  ${breakpoint('lg')`
    width: 275px;
    height: 275px;
    object-fit: cover;
  `}
`;

const GalleryGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  row-gap: 24px;

  ${breakpoint('md')`
    grid-template-columns: repeat(2, 1fr);
    column-gap: 75px;
    row-gap: 75px;
  `}

  ${breakpoint('lg')`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const GalleryImage = styled.img`
  object-fit: cover;
  ${breakpoint('md')`
    max-width: 339px;
    max-height: 339px;
  `}
  ${breakpoint('lg')`
    width: 347px;
    height: 347px;
  `}
`;

export default basic;
