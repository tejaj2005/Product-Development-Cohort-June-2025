import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserType = 'student' | 'staff' | 'outsider' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: UserType;
  profile_pic?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (user: User) => void;
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('mlrit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email && password) {
      const mockUser: User = {
        _id: '1',
        name: email.includes('admin') ? 'Admin User' : 'John Doe',
        email,
        userType: email.includes('admin') ? 'admin' : 'student',
      };
      
      setUser(mockUser);
      localStorage.setItem('mlrit_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const loginWithGoogle = (user: User) => {
    setUser(user);
    localStorage.setItem('mlrit_user', JSON.stringify(user));
  };

  const signup = async (name: string, email: string, password: string, userType: UserType): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, userType }),
      });

      if (res.ok) {
        const { user: newUser } = await res.json();
        setUser(newUser);
        localStorage.setItem('mlrit_user', JSON.stringify(newUser));
        return true;
      }
      
      // You can add more specific error handling here based on response status
      console.error('Signup failed:', await res.text());
      return false;

    } catch (error) {
      console.error('Error during signup API call:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mlrit_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithGoogle,
      signup,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};