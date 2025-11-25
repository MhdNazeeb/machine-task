import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CURRENT_USER_KEY,
  FIRST_LOGIN_KEY,
  USERS_KEY,
} from "../constants/strings";

export interface User {
  fullName: string;
  email: string;
  password: string;
}

// Save a new user
export const saveUser = async (user: User): Promise<void> => {
  try {
    const existingUsers = await getAllUsers();
    existingUsers.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(existingUsers));
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

// Get user by email
export const getUser = async (email: string): Promise<User | null> => {
  try {
    const users = await getAllUsers();
    return (
      users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
    );
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error("Error getting all users:", error);
    return [];
  }
};

// Check if this is the first login
export const isFirstLogin = async (email: string): Promise<boolean> => {
  try {
    const firstLoginData = await AsyncStorage.getItem(FIRST_LOGIN_KEY);
    if (!firstLoginData) return true;

    const loginRecords: Record<string, boolean> = JSON.parse(firstLoginData);
    return !loginRecords[email];
  } catch (error) {
    console.error("Error checking first login:", error);
    return true;
  }
};

// Mark first login as complete
export const setFirstLoginComplete = async (email: string): Promise<void> => {
  try {
    const firstLoginData = await AsyncStorage.getItem(FIRST_LOGIN_KEY);
    const loginRecords: Record<string, boolean> = firstLoginData
      ? JSON.parse(firstLoginData)
      : {};

    loginRecords[email] = true;
    await AsyncStorage.setItem(FIRST_LOGIN_KEY, JSON.stringify(loginRecords));
  } catch (error) {
    console.error("Error setting first login complete:", error);
    throw error;
  }
};

// Clear all storage
export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
};

// Save current logged-in user
export const setCurrentUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving current user:", error);
    throw error;
  }
};

// Get current logged-in user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Clear current logged-in user
export const clearCurrentUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error("Error clearing current user:", error);
    throw error;
  }
};
