import React, { createContext } from 'react';
export const ImageContext = createContext();

export const ImageProvider = ({ images, children }) => {
  return (
    <ImageContext.Provider value={{ images }}>{children}</ImageContext.Provider>
  );
};

export default ImageProvider;
