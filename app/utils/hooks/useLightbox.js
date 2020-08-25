import { useState } from 'react';

function useLightbox() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return {
    photoIndex,
    isLightboxOpen,
    openLightbox: e => {
      const photoIndex = parseInt(e.target.getAttribute('data-photoindex'), 10);
      setPhotoIndex(photoIndex);
      setIsLightboxOpen(true);
    },
    closeLightbox: e => setIsLightboxOpen(false),
    nextLightboxImage: (e, ids) => {
      setPhotoIndex(photoIndex + 1 < ids.length ? photoIndex + 1 : 0);
    },
    prevLightboxImage: (e, ids) => {
      setPhotoIndex(photoIndex - 1 > 0 ? photoIndex - 1 : ids[ids.length - 1]);
    },
    nextLightboxImage: (e, ids) => {
      setPhotoIndex(photoIndex - 1 > 0 ? photoIndex - 1 : ids[ids.length - 1]);
    }
  };
}

export default useLightbox;
