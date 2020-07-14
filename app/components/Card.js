import React from 'react'
import styled from 'styled-components';

const card = ({ event, link }) => {
  // Helper function to replace parentheses and spaces in JSON keys.
  const cleanJSON = obj => {
    Object.keys(obj).forEach((key) => {
      const replaced = key.replace(/\s/g, '_').replace(/["'()]/g, '');
      if (key !== replaced) {
        obj[replaced] = obj[key];
        delete obj[key];
      }
    });
    return obj;
  }
  cleanJSON(event);
  const { Scope, Name, Images, External_Resource_Links } = event;
  return (
    <Card className={Scope === 'National Event' ? 'national' : 'durham'}>
      <p>{Name}</p>
      {Images &&
        Images.map((p, i) => {
          return (
            <Image key={i} src={`app/assets/images/${p.ID}/large.jpg`} alt={p.alt_text} />
          );
        })}
      {External_Resource_Links && External_Resource_Links.map((ext, i) => {
        cleanJSON(ext);
        // Don't nest link if card is already a link to event page.
        return link ? (
          <p key={i}>Read More</p>
        ) : (
          <React.Fragment key={i}>
            <a href={ext.URL}>{ext.Source_Shortform}</a>
            {External_Resource_Links.length > 1 ? '; ' : null}
          </React.Fragment>
        )
      })}
    </Card>
  );
}

const Card = styled.article`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 24px;
  border-top: 6px;
  border-top-style: solid;
  margin-bottom: 30px;
  border-color: #e0e0e0;
`;

const Image = styled.img`
  max-width: 117px;
  max-height: 117px;
`;

export default card
