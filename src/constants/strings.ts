// Responsive breakpoints
export const BREAKPOINTS = {
  SMALL: 375,
  LARGE: 414,
} as const;

// AsyncStorage keys
export const USERS_KEY = "@users";
export const CURRENT_USER_KEY = "@current_user";
export const FIRST_LOGIN_KEY = "@first_login";

// Permission messages
export const PERMISSIONS = {
  NOTIFICATION_DENIED:
    "Notification permissions denied. You can enable them in settings.",
  NOTIFICATION_GRANTED: "Notification permissions granted!",
  NOTIFICATION_ERROR: "Error requesting notification permissions",
  LOCATION_DENIED:
    "Location permissions denied. You can enable them in settings.",
  LOCATION_GRANTED: "Location permissions granted!",
  LOCATION_ERROR: "Error requesting location permissions",
};

// Toast messages
export const TOAST = {
  SUCCESS: "Success",
  PERMISSION_DENIED: "Permission Denied",
};

// Authentication error messages
export const AUTH_ERRORS = {
  NO_ACCOUNT: "No account found with this email",
  INCORRECT_PASSWORD: "Incorrect password",
  LOGIN_FAILED: "An error occurred during login",
  ACCOUNT_EXISTS: "An account with this email already exists",
  REGISTRATION_FAILED: "An error occurred during registration",
  CONTEXT_ERROR: "useAuth must be used within an AuthProvider",
};

// Console log messages
export const LOG_MESSAGES = {
  ERROR_LOADING_USER: "Error loading user session:",
  LOGIN_ERROR: "Login error:",
  REGISTRATION_ERROR: "Registration error:",
  COULD_NOT_GET_ADDRESS: "Could not get address:",
  ERROR_GETTING_LOCATION: "Error getting location:",
  ERROR_SENDING_NOTIFICATION: "Error sending notification:",
};

// Location error messages
export const LOCATION_ERRORS = {
  PERMISSION_NOT_GRANTED: "Location permission not granted",
  FAILED_TO_GET_LOCATION: "Failed to get location",
};

// Notification messages
export const NOTIFICATION_MESSAGES = {
  PERMISSION_REQUIRED: "Permission Required",
  ENABLE_IN_SETTINGS:
    "Please enable notifications in settings to receive updates.",
  NOTIFICATION_SENT: "Notification sent!",
  FAILED_TO_SEND: "Failed to send notification",
  TEST_TITLE: "💊 HealthConnect",
  TEST_BODY: "This is a test notification from your health companion!",
};

// Toast types and titles
export const TOAST_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
};

export const TOAST_TITLES = {
  ERROR: "Error",
  SUCCESS: "Success",
};

// Validation error messages
export const VALIDATION_ERRORS = {
  EMAIL_REQUIRED: "Email is required",
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
  FULL_NAME_REQUIRED: "Full name is required",
  FULL_NAME_TOO_SHORT: "Please enter your full name",
};
