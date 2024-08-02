import React, { createContext, useState } from 'react';

// Create the context
export const GroupContext = createContext();

// Create a provider component
export const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  );
};