import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loggedIn: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
