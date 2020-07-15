import React from 'React';
import styled from 'styled-components';
import About from '../../assets/about.json';
import PropTypes from 'prop-types';

const basic = ({ page, event, type }) => {
  let data;
  if (event) {
    data = event.body;
  } else if (type === 'about') {
    data = About.body;
  }

  return (
    <main>
      <H1>{page}</H1>
      {data &&
        data.map((item, i) => {
          if (item.hasOwnProperty('h2')) {
            return <h2 key={i}>{item.h2}</h2>;
          } else if (item.hasOwnProperty('text')) {
            return <P key={i}>{item.text}</P>;
          } else if (item.hasOwnProperty('pullquote')) {
            return (
              <figure key={i}>
                <blockquote>{`"${item.pullquote.quote}"`}</blockquote>
                <figcaption>{item.pullquote.attribution}</figcaption>
              </figure>
            );
          } else if (item.hasOwnProperty('ul')) {
            return (
              <ul key={i}>
                {item.ul.map((li, idx) => {
                  return <li key={idx}>{li}</li>;
                })}
              </ul>
            );
          }
        })}
    </main>
  );
};

basic.propTypes = {
  page: PropTypes.string.isRequired,
  event: PropTypes.object,
  type: PropTypes.string
};

const H1 = styled.h1`
  color: ${(props) => props.theme.colors.greenBean};
  font-size: ${(props) => props.theme.fontSize.xxl};
  line-height: ${(props) => props.theme.lineHeight.extraLoose};
`;

const P = styled.p`
  padding-bottom: 20px;
`;

export default basic;
