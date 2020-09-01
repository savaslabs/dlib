import { useState } from 'react';

function useLightbox() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return {isLightboxOpen, setIsLightboxOpen};
}

export default useLightbox;
