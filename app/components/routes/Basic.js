import React from 'React';
// @TODO: import other non-event page JSON.
import About from '../../assets/about.json';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const basic = ({ page, event, type }) => {
  let data;
  if (event) {
    data = event.body;
  } else if (type === 'about') {
    data = About.body;
  }

  return (
    <Main>
      <H1>{page}</H1>
      {data &&
        data.map((item, i) => {
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
          } else if (item.hasOwnProperty('inline_image')) {
            return (
              <InlineWrapper key={i}>
                <Image
                  key={i}
                  src={`../app/assets/images/${item.inline_image.image}/large.jpg`}
                />
                <P>{item.inline_image.text}</P>
              </InlineWrapper>
            );
          }
        })}
    </Main>
  );
};

basic.propTypes = {
  page: PropTypes.string.isRequired,
  event: PropTypes.object,
  type: PropTypes.string
};

const Main = styled.main`
  ${breakpoint('lg')`
    max-width: 872px;
  `}
`;
const H1 = styled.h1`
  margin-bottom: 40px;
  color: ${(props) => props.theme.colors.greenBean};
  font-size: ${(props) => props.theme.fontSize.xxl};
  line-height: ${(props) => props.theme.lineHeight.xLoose};
`;

const P = styled.p`
  margin-bottom: 30px;
  font-size: ${(props) => props.theme.fontSize.sm};
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
  list-style: disc;
  margin-inline-start: 2em;
  padding-inline-start: 2em;
  margin-bottom: 30px;
`;

const Li = styled.li`
  line-height: ${(props) => props.theme.lineHeight.xxLoose};
  font-size: ${(props) => props.theme.fontSize.sm};

  &::marker {
    color: ${(props) => props.theme.colors.greenBean};
  }
`;

const InlineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('md')`
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 30px;
  `}
`;

const Image = styled.img`
  width: 100%;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.29);
  }

  ${breakpoint('md')`
    margin-right: 30px;
    margin-bottom: 0;
    max-width: 300px;
    object-fit: cover;
  `}
`;

export default basic;
