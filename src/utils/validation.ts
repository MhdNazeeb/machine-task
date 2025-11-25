import { VALIDATION_ERRORS } from "../constants/strings";

// Email validation
export const validateEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: VALIDATION_ERRORS.EMAIL_REQUIRED };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: VALIDATION_ERRORS.INVALID_EMAIL };
  }

  return { isValid: true };
};

// Password validation
export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: VALIDATION_ERRORS.PASSWORD_REQUIRED };
  }

  if (password.length < 6) {
    return { isValid: false, error: VALIDATION_ERRORS.PASSWORD_TOO_SHORT };
  }

  return { isValid: true };
};

// Full name validation
export const validateFullName = (
  name: string
): { isValid: boolean; error?: string } => {
  if (!name) {
    return { isValid: false, error: VALIDATION_ERRORS.FULL_NAME_REQUIRED };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: VALIDATION_ERRORS.FULL_NAME_TOO_SHORT };
  }

  return { isValid: true };
};

// Validate all registration fields
export const validateRegistration = (
  fullName: string,
  email: string,
  password: string
): {
  isValid: boolean;
  errors: { fullName?: string; email?: string; password?: string };
} => {
  const nameValidation = validateFullName(fullName);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  const errors: { fullName?: string; email?: string; password?: string } = {};

  if (!nameValidation.isValid) errors.fullName = nameValidation.error;
  if (!emailValidation.isValid) errors.email = emailValidation.error;
  if (!passwordValidation.isValid) errors.password = passwordValidation.error;

  return {
    isValid:
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid,
    errors,
  };
};
