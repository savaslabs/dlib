import React, { useState, createContext } from 'react';

export const LightboxContext = createContext();

export const LightboxProvider = ({ children }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <LightboxContext.Provider
      value={{
        isLightboxOpen,
        setIsLightboxOpen,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};
