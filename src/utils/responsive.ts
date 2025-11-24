import { Dimensions, PixelRatio, Platform } from 'react-native';

const DESIGN_WIDTH = 375;  
const DESIGN_HEIGHT = 812; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Scale width based on design width
 */
export const scaleWidth = (size: number): number => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

/**
 * Scale height based on design height
 */
export const scaleHeight = (size: number): number => (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;

/**
 * Moderate scale (useful for fonts, margins, paddings)
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scaleWidth(size) - size) * factor;

/**
 * Scale font with system font scale and max cap
 */
export const scaleFont = (size: number): number => {
  const scaled = size * PixelRatio.getFontScale();
  const maxFontSize = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.1;
  return Math.min(scaled, maxFontSize);
};

/**
 * Get width/height as percentage
 */
export const wp = (percent: number): number => (SCREEN_WIDTH * percent) / 100;
export const hp = (percent: number): number => (SCREEN_HEIGHT * percent) / 100;

/**
 * Get full screen dimensions
 */
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  const smallest = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
  return smallest > 600;
};

/**
 * Check if device is iOS or Android
 */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
