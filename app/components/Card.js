import React from 'react'
import styled from 'styled-components';

const Card = styled.article`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 24px;
  border-top: 6px;
  border-top-style: solid;
  margin-bottom: 30px;
  border-color: #e0e0e0;
`;

const card = ({ event: { Scope, Name, Type, Images, Headline } }) => {
  return (
    <Card className={Scope === 'National Event' ? 'national' : 'durham'}>
      <p>{Scope}</p>
      <p>{Name}</p>
      <p>{Type}</p>
      {Images &&
        Images.map((p, i) => {
          return (
            <img key={i} src={`app/assets/images/${p.ID}/small.jpg`} alt={p.alt_text}></img>
          );
        })}
      <p>{Headline}</p>
    </Card>
  );
}

export default card
