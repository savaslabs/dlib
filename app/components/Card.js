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
`;

//   border-color: ${props =>
//   (props.scope === 'National Event' ? '#41796f' : '#D5CC7F' )};

const card = (props) => {
  console.log('props.scope', props.scope);
  const { event: { Scope, Name, Type, Images, Headline } } = props;
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
    <Card>
      <p>{Scope}</p>
      <p>{Name}</p>
      <p>{Type}</p>
      {photo.length > 0 && photo.map((p, i) => {
        const url = p.image.split(' ')[1].replace(/\(|\)/g, '');
        return (
          <React.Fragment key={i}>
            <img src={url} alt={p.alt_text}></img>
            {p.caption && <p>{p.caption}</p>}
          </React.Fragment>
        )
      })}
      <p>{Headline}</p>
    </Card>
  );
}

export default card
