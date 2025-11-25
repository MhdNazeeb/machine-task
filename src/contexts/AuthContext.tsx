import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AUTH_ERRORS, LOG_MESSAGES } from "../constants/strings";
import {
  clearCurrentUser,
  getCurrentUser,
  getUser,
  saveUser,
  setCurrentUser,
  User,
} from "../utils/storage";
import { validateRegistration } from "../utils/validation";

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error(LOG_MESSAGES.ERROR_LOADING_USER, error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const existingUser = await getUser(email);

      if (!existingUser) {
        return { success: false, error: AUTH_ERRORS.NO_ACCOUNT };
      }

      if (existingUser.password !== password) {
        return { success: false, error: AUTH_ERRORS.INCORRECT_PASSWORD };
      }

      setUser(existingUser);
      await setCurrentUser(existingUser);
      return { success: true };
    } catch (error) {
      console.error(LOG_MESSAGES.LOGIN_ERROR, error);
      return { success: false, error: AUTH_ERRORS.LOGIN_FAILED };
    }
  }, []);

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      try {
        // Validate inputs
        const validation = validateRegistration(fullName, email, password);
        if (!validation.isValid) {
          const firstError = Object.values(validation.errors)[0];
          return { success: false, error: firstError };
        }

        // Check if user already exists
        const existingUser = await getUser(email);
        if (existingUser) {
          return {
            success: false,
            error: AUTH_ERRORS.ACCOUNT_EXISTS,
          };
        }

        // Save new user
        const newUser: User = { fullName, email, password };
        await saveUser(newUser);

        return { success: true };
      } catch (error) {
        console.error(LOG_MESSAGES.REGISTRATION_ERROR, error);
        return {
          success: false,
          error: AUTH_ERRORS.REGISTRATION_FAILED,
        };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setUser(null);
    await clearCurrentUser();
  }, []);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, login, register, logout, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(AUTH_ERRORS.CONTEXT_ERROR);
  }
  return context;
};
