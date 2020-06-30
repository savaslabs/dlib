import React from 'React'

const Card = ({ event: { Year, Scope, Name, Type, Images, Headline }  }) => {
  return (
    <article>
      <p>{Scope}</p>
      <p>{Name}</p>
      <p>{Type}</p>
      <p>{Images}</p>
      <p>{Headline}</p>
    </article>
  );
}

export default Card
