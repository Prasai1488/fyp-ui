import { createContext, useEffect, useState, ReactNode } from "react";
import apiRequest from "../lib/apiRequest";
import type { User } from "../types/User";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const login = (userData: User) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiRequest.get("/auth/user");
        if (response.data) {
          login(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

