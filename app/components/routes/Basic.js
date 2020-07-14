import React from 'React';
import styled from 'styled-components';
import About from '../../assets/about.json';

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
            return <p key={i}>{item.text}</p>;
          } else if (item.hasOwnProperty('pullquote')) {
            return (
              <figure key={i}>
                <blockquote>{item.pullquote.quote}</blockquote>
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

const H1 = styled.h1`
  color: ${(props) => props.theme.colors.greenBean};
  font-size: ${(props) => props.theme.fontSize.xxl};
  line-height: ${(props) => props.theme.lineHeight.extraLoose};
`;

export default basic;
