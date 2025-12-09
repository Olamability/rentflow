import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, UserRole } from '@/types';
import { calculateProfileCompleteness } from '@/lib/profileUtils';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  getProfileCompleteness: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rentflow_auth';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const { user: storedUser, timestamp } = JSON.parse(stored);
          
          // Check if session has expired
          if (Date.now() - timestamp < SESSION_TIMEOUT) {
            setUser(storedUser);
            setLastActivity(timestamp);
          } else {
            // Session expired, clear storage
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Session timeout check
  useEffect(() => {
    if (!user) return;

    const checkSession = setInterval(() => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
        navigate('/login');
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkSession);
  }, [user, lastActivity, navigate]);

  // Update activity on user interaction
  useEffect(() => {
    if (!user) return;

    const updateActivity = () => {
      setLastActivity(Date.now());
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        data.timestamp = Date.now();
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      }
    };

    // Listen for user activity
    window.addEventListener('mousedown', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    return () => {
      window.removeEventListener('mousedown', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, [user]);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      }).catch(() => {
        // Mock response for development
        return {
          ok: true,
          json: async () => ({
            user: {
              id: `${role}-${Date.now()}`,
              email,
              name: email.split('@')[0],
              role,
              createdAt: new Date(),
              isVerified: true,
            },
            token: 'mock-jwt-token',
          }),
        };
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const userData = data.user;

      // Store user and token
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user: userData,
        token: data.token,
        timestamp: Date.now(),
      }));

      setUser(userData);
      setLastActivity(Date.now());
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      }).catch(() => {
        // Mock response for development
        return {
          ok: true,
          json: async () => ({
            user: {
              id: `${role}-${Date.now()}`,
              email,
              name,
              role,
              createdAt: new Date(),
              isVerified: false,
            },
            token: 'mock-jwt-token',
          }),
        };
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      const userData = data.user;

      // Store user and token
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user: userData,
        token: data.token,
        timestamp: Date.now(),
      }));

      setUser(userData);
      setLastActivity(Date.now());
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    
    // Calculate and update profile completeness
    const completeness = calculateProfileCompleteness(updatedUser);
    updatedUser.profileCompleteness = completeness;
    updatedUser.profileComplete = completeness >= 70;
    
    setUser(updatedUser);

    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      data.user = updatedUser;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    }
  };

  const getProfileCompleteness = (): number => {
    if (!user) return 0;
    return calculateProfileCompleteness(user);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateUser,
    getProfileCompleteness,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper hook to get auth token
export const useAuthToken = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const { token } = JSON.parse(stored);
      return token;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return null;
};
