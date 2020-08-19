import { useState } from 'react';

function useLightbox() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);


  // Open lightbox anytime a photo is clicked.
  const openLightbox = (e) => {
    const photoIndex = parseInt(e.target.getAttribute('data-photoindex'), 10);
    setPhotoIndex(photoIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = (e) => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = (e, ids) => {
    setPhotoIndex(photoIndex + 1 < ids.length ? photoIndex + 1 : 0);
  };

  const prevLightboxImage = (e, ids) => {
    setPhotoIndex(photoIndex - 1 > 0 ? photoIndex - 1 : ids[ids.length - 1]);
  };

  return [photoIndex, isLightboxOpen, openLightbox, closeLightbox, nextLightboxImage, prevLightboxImage];
}

export default useLightbox;
