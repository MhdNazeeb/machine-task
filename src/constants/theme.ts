import { moderateScale, scaleFont, screenHeight, screenWidth } from '../utils/responsive';
import { BREAKPOINTS } from './strings';

export const theme = {
  // Screen dimensions
  screenWidth,
  screenHeight,
  
  // Typography
  fontSize: {
    xs: scaleFont(12),
    sm: scaleFont(14),
    md: scaleFont(16),
    lg: scaleFont(18),
    xl: scaleFont(24),
    xxl: scaleFont(32),
    xxxl: scaleFont(40),
  },
  
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Spacing
  spacing: {
    xs: moderateScale(4),
    sm: moderateScale(8),
    md: moderateScale(16),
    lg: moderateScale(24),
    xl: moderateScale(32),
    xxl: moderateScale(48),
  },
  
  // Border radius
  borderRadius: {
    sm: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
    xl: moderateScale(24),
    full: 9999,
  },
  
  // Shadows
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Animation timings
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const;

// Responsive helper
export const isSmallDevice = screenWidth < BREAKPOINTS.SMALL;
export const isMediumDevice = screenWidth >= BREAKPOINTS.SMALL && screenWidth < BREAKPOINTS.LARGE;
export const isLargeDevice = screenWidth >= BREAKPOINTS.LARGE;

// Responsive size helper
export const responsiveSize = (size: number) => moderateScale(size);
