import * as Notifications from "expo-notifications";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import {
  LOG_MESSAGES,
  NOTIFICATION_MESSAGES,
  TOAST_TITLES,
  TOAST_TYPES,
} from "../constants/strings";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotifications = () => {
  // Send a local notification
  const sendNotification = useCallback(async (title: string, body: string) => {
    try {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== "granted") {
        Toast.show({
          type: TOAST_TYPES.ERROR,
          text1: NOTIFICATION_MESSAGES.PERMISSION_REQUIRED,
          text2: NOTIFICATION_MESSAGES.ENABLE_IN_SETTINGS,
        });
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { timestamp: Date.now() },
          sound: true,
        },
        trigger: null, // Send immediately
      });

      Toast.show({
        type: TOAST_TYPES.SUCCESS,
        text1: TOAST_TITLES.SUCCESS,
        text2: NOTIFICATION_MESSAGES.NOTIFICATION_SENT,
      });
    } catch (error) {
      console.error(LOG_MESSAGES.ERROR_SENDING_NOTIFICATION, error);
      Toast.show({
        type: TOAST_TYPES.ERROR,
        text1: TOAST_TITLES.ERROR,
        text2: NOTIFICATION_MESSAGES.FAILED_TO_SEND,
      });
    }
  }, []);

  // Send a test notification
  const sendTestNotification = useCallback(async () => {
    await sendNotification(
      NOTIFICATION_MESSAGES.TEST_TITLE,
      NOTIFICATION_MESSAGES.TEST_BODY
    );
  }, [sendNotification]);

  return {
    sendNotification,
    sendTestNotification,
  };
};
