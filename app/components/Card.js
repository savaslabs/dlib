import React, { useState, useEffect, useContext } from 'react'
import { ImageContext } from '../utils/ImageContext';
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
  const imageId = Images ? Images : null;
  const { images } = useContext(ImageContext);
  const [photo, setPhoto] = useState([]);
  let img;

  useEffect(() => {
    if (images.length > 0 && imageId !== null) {
      img = images.filter(i => i.ID === imageId);
      setPhoto(img);
    }
  }, [images])

  return (
    <Card className={Scope === 'National Event' ? 'national' : 'durham'}>
      <p>{Scope}</p>
      <p>{Name}</p>
      <p>{Type}</p>
      {photo.length > 0 &&
        photo.map((p, i) => {
          const url = p.image.split(' ')[1].replace(/\(|\)/g, '');
          return (
            <React.Fragment key={i}>
              <img src={url} alt={p.alt_text}></img>
              {p.caption && <p>{p.caption}</p>}
            </React.Fragment>
          );
        })}
      <p>{Headline}</p>
    </Card>
  );
}

export default card
