import React from 'react';
import Lightbox from 'react-accessible-lightbox';

const lightbox = ({
  imageIds,
  imageCaptions,
  photoIndex,
  isOpen,
  closeLightbox,
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
          onCloseRequest={() => closeLightbox()}
          onMoveNextRequest={() => nextLightboxImage()}
          imageCaption={imageCaptions[photoIndex]}
        />
      )}
    </>
  );
};

export default lightbox;
