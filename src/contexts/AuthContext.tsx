"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { User, AuthState, AuthContextType, LoginCredentials, RegisterCredentials, SocialAuthResult } from '@/types';
import { AUTH_STORAGE_KEY } from '@/utils/constants';

// Mock authentication service - in production, replace with actual API calls
class AuthService {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  static async loginWithEmail(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.delay(1000); // Simulate API call
    
    // Mock validation
    if (credentials.email === 'test@student.com' && credentials.password === 'password') {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'תלמיד דוגמה',
        role: 'student',
        provider: 'email',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        avatar: undefined
      };
      return { success: true, user };
    }
    
    if (credentials.email === 'test@parent.com' && credentials.password === 'password') {
      const user: User = {
        id: '2',
        email: credentials.email,
        name: 'הורה דוגמה',
        role: 'parent',
        provider: 'email',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        avatar: undefined
      };
      return { success: true, user };
    }

    return { success: false, error: 'Invalid email or password' };
  }

  static async register(credentials: RegisterCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    await this.delay(1000); // Simulate API call
    
    // Mock validation
    if (credentials.password !== credentials.confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    
    if (credentials.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: credentials.email,
      name: credentials.name,
      role: credentials.role,
      provider: 'email',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      avatar: undefined
    };

    return { success: true, user };
  }

  static async loginWithGoogle(): Promise<SocialAuthResult> {
    await this.delay(1500); // Simulate OAuth flow
    
    // Mock Google login
    const user: User = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'student', // Default role, could be selected later
      provider: 'google',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
    };

    return { success: true, user };
  }

  static async loginWithFacebook(): Promise<SocialAuthResult> {
    await this.delay(1500); // Simulate OAuth flow
    
    // Mock Facebook login
    const user: User = {
      id: 'facebook_' + Math.random().toString(36).substr(2, 9),
      email: 'user@facebook.com',
      name: 'Facebook User',
      role: 'parent', // Default role
      provider: 'facebook',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      avatar: 'https://graph.facebook.com/v12.0/me/picture?type=large'
    };

    return { success: true, user };
  }

  static async loginWithApple(): Promise<SocialAuthResult> {
    await this.delay(1500); // Simulate OAuth flow
    
    // Mock Apple login
    const user: User = {
      id: 'apple_' + Math.random().toString(36).substr(2, 9),
      email: 'user@privaterelay.appleid.com',
      name: 'Apple User',
      role: 'student', // Default role
      provider: 'apple',
      createdAt: new Date(),
      lastLoginAt: new Date(),
      avatar: undefined
    };

    return { success: true, user };
  }
}

// Auth reducer
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESTORE_SESSION'; payload: User };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'AUTH_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    case 'AUTH_ERROR':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      };
    case 'AUTH_LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'RESTORE_SESSION':
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true, // Start with loading true to check for existing session
  isAuthenticated: false,
  error: null
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          // Update last login time
          user.lastLoginAt = new Date();
          dispatch({ type: 'RESTORE_SESSION', payload: user });
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    };

    restoreSession();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await AuthService.loginWithEmail(credentials);
      
      if (result.success && result.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Login failed' });
        return false;
      }
    } catch {
      dispatch({ type: 'AUTH_ERROR', payload: 'An unexpected error occurred' });
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await AuthService.register(credentials);
      
      if (result.success && result.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Registration failed' });
        return false;
      }
    } catch {
      dispatch({ type: 'AUTH_ERROR', payload: 'An unexpected error occurred' });
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<SocialAuthResult> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await AuthService.loginWithGoogle();
      
      if (result.success && result.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Google login failed' });
      }
      
      return result;
    } catch {
      const errorResult = { success: false, error: 'Google login failed' };
      dispatch({ type: 'AUTH_ERROR', payload: errorResult.error });
      return errorResult;
    }
  };

  const loginWithFacebook = async (): Promise<SocialAuthResult> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await AuthService.loginWithFacebook();
      
      if (result.success && result.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Facebook login failed' });
      }
      
      return result;
    } catch {
      const errorResult = { success: false, error: 'Facebook login failed' };
      dispatch({ type: 'AUTH_ERROR', payload: errorResult.error });
      return errorResult;
    }
  };

  const loginWithApple = async (): Promise<SocialAuthResult> => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await AuthService.loginWithApple();
      
      if (result.success && result.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result.user));
        dispatch({ type: 'AUTH_SUCCESS', payload: result.user });
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error || 'Apple login failed' });
      }
      
      return result;
    } catch {
      const errorResult = { success: false, error: 'Apple login failed' };
      dispatch({ type: 'AUTH_ERROR', payload: errorResult.error });
      return errorResult;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const contextValue: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    loginWithApple,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };