# Machine Task - React Native Expo App

A mobile authentication app built with React Native and Expo, featuring user registration, login, location tracking, and notifications.

## Features

- ✅ User Registration & Login
- ✅ Persistent Authentication (AsyncStorage)
- ✅ Location with Permissions
- ✅ Local Notifications
- ✅ Modern UI with Gradient Components
- ✅ Form Validation
- ✅ Toast Messages

## Tech Stack

- **React Native** with Expo
- **Expo Router** for navigation
- **AsyncStorage** for local data persistence
- **Expo Location** for geolocation
- **Expo Notifications** for push notifications
- **React Native Reanimated** for animations
- **TypeScript** for type safety

## Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run on Android**

   ```bash
   npx expo run:android
   ```

3. **Run on iOS**
   ```bash
   npx expo run:ios
   ```

> **Note:** This project uses native modules and requires a development build. Expo Go is not supported.

## Build for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

### iOS

```bash
npx expo run:ios --configuration Release
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint

## Key Features Explained

### Authentication

- Users can register with full name, email, and password
- Login persists across app restarts using AsyncStorage
- Protected routes redirect to login if not authenticated

### Permissions

- On first login, app requests location and notification permissions
- Location shows current coordinates and address
- Test notification feature available on home screen

### Storage

- User data stored locally with AsyncStorage
- Tracks first-time login status per user
- Current user session management
