export const Colors = {
  // Professional minimal palette
  primary: '#2563EB', 
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  primaryGradient: ['#2563EB', '#60A5FA', '#93C5FD'], 
  dangerGradient: ['#EF4444', '#F87171', '#FCA5A5'],
  
  // Neutral colors 
  white: '#FFFFFF',
  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',
  
  // Gray scale
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textWhite: '#FFFFFF',
  
  // Status colors (minimal)
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  // UI elements
  border: '#E5E7EB',
  borderFocus: '#2563EB',
  inputBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  shadowColor: '#000000',
  
  // Disabled state
  disabled: '#D1D5DB',
  disabledText: '#9CA3AF',
} as const;

export type ColorKey = keyof typeof Colors;
