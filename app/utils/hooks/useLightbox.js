import { useState } from 'react';

function useLightbox() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setIsLightboxOpen()
  }, [isLightboxOpen])
  return {isLightboxOpen, setIsLightboxOpen};
}

export default useLightbox;
