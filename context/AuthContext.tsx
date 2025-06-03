import React, { createContext, useContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

export const AuthContext = createContext<{
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ اینو اضافه کن تا useAuth کار کنه
export const useAuth = () => useContext(AuthContext);
