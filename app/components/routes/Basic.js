import React from 'React';
import AboutPage from '../../assets/pages/about.json';
import OralHistoriesPage from '../../assets/pages/oral-histories.json';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Markdown from 'react-markdown';

const basic = ({ event, type, imageData }) => {
  let data;
  if (event) {
    data = event;
  } else if (type === 'about') {
    data = AboutPage;
  } else if (type === 'oral_histories') {
    data = OralHistoriesPage;
  }

  return (
    <Content>
      <Main>
        <h1>{data.name}</h1>
        {data.body &&
          data.body.map((item, i) => {
            if (item.hasOwnProperty('h2')) {
              return <h2 key={i}>{item.h2}</h2>;
            } else if (item.hasOwnProperty('text')) {
              return <P key={i}>{item.text}</P>;
            } else if (item.hasOwnProperty('pullquote')) {
              return (
                <Figure key={i}>
                  <Blockquote>{`"${item.pullquote.quote}"`}</Blockquote>
                  {item.pullquote.attribution && (
                    <Figcaption>{item.pullquote.attribution}</Figcaption>
                  )}
                </Figure>
              );
            } else if (item.hasOwnProperty('ul')) {
              return (
                <Ul key={i}>
                  {item.ul.map((li, idx) => {
                    return <Li key={idx}>{li}</Li>;
                  })}
                </Ul>
              );
            } else if (item.hasOwnProperty('image')) {
              const foundImage = imageData.filter((imageInfo) => {
                return imageInfo.ID === item.image;
              });

              return (
                <ImageAndCaptionWrapper key={i}>
                  <Image
                    key={i}
                    src={`../app/assets/images/${item.image}/large.jpg`}
                    alt={foundImage[0].alt_text}
                  />
                  <p>{foundImage[0].caption}</p>
                </ImageAndCaptionWrapper>
              );
            }
          })}
      </Main>
      {data.images && (
        <SideImages>
          {data.images &&
            data.images.map((imageId, idx) => {
              const foundImage = imageData.filter((imageInfo) => {
                return imageInfo.ID === imageId;
              });
              return (
                <SideImage
                  key={idx}
                  src={`../app/assets/images/${imageId}/large.jpg`}
                  alt={foundImage[0].alt_text}
                />
              );
            })}
        </SideImages>
      )}
    </Content>
  );
};

basic.propTypes = {
  event: PropTypes.object,
  type: PropTypes.string,
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.string,
      __id: PropTypes.string,
      alt_text: PropTypes.string,
      attribution: PropTypes.string,
      caption: PropTypes.string,
      citation: PropTypes.string,
      image: PropTypes.array,
      timelineEvents: PropTypes.array
    })
  ),
};

const Content = styled.main`
  display: flex;
  flex-direction: column;

  ${breakpoint('lg')`
    flex-direction: row;
    justify-content: space-between;
  `}
`;
const Main = styled.div`
  ${breakpoint('lg')`
    max-width: 782px;
  `}
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

const ImageAndCaptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
  }
`;

const Image = styled.img`
  width: 100%;
  ${breakpoint('sm', 'lg')`
    margin-bottom: 30px;
  `}
  ${breakpoint('md')`
    margin-right: 30px;
    object-fit: cover;
  `}
`;

const SideImages = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('lg')`
    max-width: 291px;
  `}
`;

const SideImage = styled.img`
  width: 100%;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
  }

  ${breakpoint('lg')`
    width: 291px;
    height: 291px;
    object-fit: cover;
  `}
`;

export default basic;
