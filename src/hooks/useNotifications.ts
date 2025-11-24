import { useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

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
      
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Please enable notifications in settings to receive updates.',
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
        type: 'success',
        text1: 'Success',
        text2: 'Notification sent!',
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send notification',
      });
    }
  }, []);
  
  // Send a test notification
  const sendTestNotification = useCallback(async () => {
    await sendNotification(
      '💊 HealthConnect',
      'This is a test notification from your health companion!'
    );
  }, [sendNotification]);
  
  return {
    sendNotification,
    sendTestNotification,
  };
};
