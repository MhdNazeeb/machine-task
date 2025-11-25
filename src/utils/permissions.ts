import { PERMISSIONS, TOAST } from "@/constants/strings";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export interface PermissionResult {
  granted: boolean;
  message?: string;
}

// Request notification permissions
export const requestNotificationPermissions =
  async (): Promise<PermissionResult> => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return {
          granted: false,
          message: PERMISSIONS.NOTIFICATION_DENIED,
        };
      }

      // Configure notification channel for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#4A90E2",
        });
      }

      return {
        granted: true,
        message: PERMISSIONS.NOTIFICATION_GRANTED,
      };
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      return {
        granted: false,
        message: PERMISSIONS.NOTIFICATION_ERROR,
      };
    }
  };

// Request location permissions
export const requestLocationPermissions =
  async (): Promise<PermissionResult> => {
    try {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return {
          granted: false,
          message: PERMISSIONS.LOCATION_DENIED,
        };
      }

      return {
        granted: true,
        message: PERMISSIONS.LOCATION_GRANTED,
      };
    } catch (error) {
      console.error("Error requesting location permissions:", error);
      return {
        granted: false,
        message: PERMISSIONS.LOCATION_ERROR,
      };
    }
  };

// Request all permissions for first login
export const requestFirstLoginPermissions = async (): Promise<void> => {
  try {
    // Request notifications
    const notificationResult = await requestNotificationPermissions();
    if (notificationResult.message) {
      Toast.show({
        type: notificationResult.granted ? "success" : "error",
        text1: notificationResult.granted
          ? TOAST.SUCCESS
          : TOAST.PERMISSION_DENIED,
        text2: notificationResult.message,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Request location
    const locationResult = await requestLocationPermissions();
    if (locationResult.message) {
      Toast.show({
        type: locationResult.granted ? "success" : "error",
        text1: locationResult.granted ? TOAST.SUCCESS : TOAST.PERMISSION_DENIED,
        text2: locationResult.message,
      });
    }
  } catch (error) {
    console.error("Error requesting first login permissions:", error);
  }
};
