import React, { createContext, useState } from 'react';

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
 const [connected, setConnected] = useState(false);

 return (
    <ConnectionContext.Provider value={{ connected, setConnected }}>
      {children}
    </ConnectionContext.Provider>
 );
};
