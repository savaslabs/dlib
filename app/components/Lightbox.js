import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const lightbox = ({
  imageIds,
  imageCaptions,
  photoIndex,
  isOpen,
  closeLightbox,
  prevLightboxImage,
  nextLightboxImage,
  eventPage,
}) => {
  let location;
  if (eventPage) {
    location = '../app';
  } else {
    location = 'app';
  }
  return (
    <>
      {isOpen && (
        <Lightbox
          mainSrc={`${location}/assets/images/${imageIds[photoIndex]}/full.jpg`}
          nextSrc={`${location}/assets/images/${
            imageIds[photoIndex + 1 < imageIds.length ? photoIndex + 1 : 0]
          }/full.jpg`}
          prevSrc={`${location}/assets/images/${
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
