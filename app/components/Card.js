import React from 'react';
import styled from 'styled-components';
import { cleanJSON } from '../utils/constants';
import PropTypes from 'prop-types';

const card = ({ event, link }) => {
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
          <ExternalLink key={i}>
            <a href={ext.URL}>{ext.Source_Shortform}</a>
            {External_Resource_Links.length === i + 1 ? null : '; '}
          </ExternalLink>
        )
      })}
    </Card>
  );
}

card.propTypes = {
  event: PropTypes.object.isRequired,
  link: PropTypes.bool
};

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

const ExternalLink = styled.p`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.greenBean};
  font-weight: ${(props) => props.theme.fontWeight.normal};

  a {
    color: ${(props) => props.theme.colors.greenBean};
  }
`;

export default card
