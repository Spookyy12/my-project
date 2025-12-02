import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserRole, Transaction } from '../types';
import { mockDB } from '../services/mockDatabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (username: string, email: string, location: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addTransaction: (amount: number, type: Transaction['type'], description: string, method: 'Card' | 'PayPal') => void;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for saved session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('oeao_session');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Refresh user data from DB to get latest balance
      const dbUser = mockDB.findUserByEmail(parsedUser.email);
      if (dbUser) {
        setUser(dbUser);
        setTransactions(mockDB.getTransactions(dbUser.id));
      } else {
        setUser(parsedUser); // Fallback
      }
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockDB.findUserByEmail(email);
        
        if (foundUser) {
          setUser(foundUser);
          setTransactions(mockDB.getTransactions(foundUser.id));
          localStorage.setItem('oeao_session', JSON.stringify(foundUser));
          resolve();
        } else {
          setError("Invalid email or password.");
          reject(new Error("Invalid credentials"));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const signup = async (username: string, email: string, location: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          const newUser: User = {
            id: 'u_' + Date.now(),
            username,
            email,
            location: location || 'Unknown',
            role: UserRole.USER,
            balance: 0
          };
          
          mockDB.createUser(newUser);
          
          setUser(newUser);
          setTransactions([]);
          localStorage.setItem('oeao_session', JSON.stringify(newUser));
          resolve();
        } catch (err: any) {
          setError(err.message || "Registration failed");
          reject(err);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    localStorage.removeItem('oeao_session');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('oeao_session', JSON.stringify(updatedUser));
      mockDB.updateUser(updatedUser);
    }
  };

  const addTransaction = (amount: number, type: Transaction['type'], description: string, method: 'Card' | 'PayPal') => {
    if (user) {
      const newTx: Transaction = {
        id: 'tx_' + Date.now(),
        userId: user.id,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        amount,
        type,
        description,
        method
      };
      
      mockDB.addTransaction(newTx);
      setTransactions(prev => [newTx, ...prev]);
      
      // Update local user state for balance
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('oeao_session', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout, 
      updateProfile,
      addTransaction,
      transactions,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};