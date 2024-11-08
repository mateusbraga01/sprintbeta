// src/contexts/UserProfileContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const updateProfile = (profileData) => {
    setProfile(profileData); // Atualiza as informações do perfil
  };

  const clearProfile = () => {
    setProfile(null); // Limpa as informações do perfil
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
