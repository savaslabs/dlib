import React, { useState, useEffect, useContext } from 'react'
import { ImageContext } from '../utils/ImageContext';

const Card = ({ event: { Year, Scope, Name, Type, Images, Headline }  }) => {
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
    <article>
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
    </article>
  );
}

export default Card
