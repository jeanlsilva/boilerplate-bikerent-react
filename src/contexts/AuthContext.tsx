import { createContext, useContext, useEffect, useState } from 'react';
import getUserByToken from 'services/getUserByToken';
import { User } from 'types/User';

interface ContextProps {
    user: User | undefined;
    login: (token: any) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    getUserData: () => Promise<void>;
}

const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUserData = async (token?: string): Promise<void> => {
    let existingToken;
    if (!token) {
        existingToken = sessionStorage.getItem('token')
    } else {
        existingToken = token;
    }
    
    if (existingToken) {
        const user: User | undefined = await getUserByToken(existingToken);
        setUser(user);
        setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
    }
  }

  const login = async (token: any) => {
    sessionStorage.setItem('token', token);
    setIsAuthenticated(true);
    getUserData();
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(undefined);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    getUserData()
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
