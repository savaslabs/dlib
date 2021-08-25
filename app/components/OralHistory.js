import React from 'react';
import styled from 'styled-components';

export default function OralHistory({ title, transcript, audio }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {audio && (
        <section>
          <Label>Audio</Label>
          <Ol>
            {audio?.map((file, index) => {
              const fileName = file.src.substring(file.src.lastIndexOf('/') + 1).replace('.mp3', '');
              return (
                <li key={fileName}>
                  <figure>
                    <audio controls preload="none" src={file.src}>
                      Your browser does not support the<code>audio</code> element.
                    </audio>
                    <figcaption>{file.label ?? fileName}</figcaption>
                  </figure>
                </li>
              );
            })}
          </Ol>
        </section>
      )}
      {transcript && (
        <section>
          <Label>Transcript</Label>
          {transcript.map((file, index) => (
            <p key={file.src}>
              <A href={file.src} target="_blank" rel="noopener noreferrer">
                {file.label ?? `${title} Transcript (PDF)`}
              </A>
            </p>
          ))}
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-bottom: 64px;
  padding-left: 30px;
  border-left: 7px solid ${props => props.theme.colors.greenBean};
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: black;
`;

const Label = styled.h3`
  font-family: ${props => props.theme.fontFamily.muli};
  font-size: 16px;
  font-weight: 700;
  opacity: 0.5;
  text-transform: uppercase;
  color: ${props => props.theme.colors.darkGreen};
`;

const Ol = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;

  li {
    display: inline-block;
    margin-left: 0;
    padding-left: 0;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  figure {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;

const A = styled.a`
  color: ${props => props.theme.colors.greenBean};
  font-size: 21px;
  font-weight: 400;
  text-decoration-line: underline;
  line-height: 1;
`;