import React from 'react';
import Lightbox from 'react-image-lightbox';
import { pathToImages } from '../utils/constants';
import 'react-image-lightbox/style.css';

const lightbox = ({
  imageIds,
  imageCaptions,
  photoIndex,
  isOpen,
  closeLightbox,
  prevLightboxImage,
  nextLightboxImage,
}) => {
  return (
    <>
      {isOpen && imageIds && (
        <Lightbox
          mainSrc={`${pathToImages}${imageIds[photoIndex]}/full.jpg`}
          nextSrc={`${pathToImages}${
            imageIds[photoIndex + 1 < imageIds.length ? photoIndex + 1 : 0]
          }/full.jpg`}
          prevSrc={`${pathToImages}${
            imageIds[photoIndex - 1 > 0 ? photoIndex - 1 : imageIds[imageIds.length - 1]]
          }/full.jpg`}
          onCloseRequest={() => closeLightbox()}
          onMovePrevRequest={() => prevLightboxImage()}
          onMoveNextRequest={() => nextLightboxImage()}
          imageCaption={imageCaptions[photoIndex]}
        />
      )}
    </>
  );
};

export default lightbox;
