import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 👇 Create context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
        }
      } catch (err) {
        console.log("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    const newUser: User = { name, email, password };
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    // setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (!saved) throw new Error("No user found. Please sign up.");

    const storedUser: User = JSON.parse(saved);

    if (
      storedUser.email.toLowerCase() === email.toLowerCase() &&
      storedUser.password === password
    ) {
      setUser(storedUser);
    } else {
      throw new Error("Incorrect email or password.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use Auth Context
 * Provides fully typed context usage.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};