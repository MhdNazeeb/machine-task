import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import { Colors } from "../constants/Colors";
import { theme } from "../constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/*
  1. Create the config
  2. Pass the config as prop to the Toast component instance
*/

const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.success,
        backgroundColor: Colors.white,
        height: 80,
        borderRadius: theme.borderRadius.lg,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.textSecondary,
      }}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color={Colors.success}
          />
        </View>
      )}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.error,
        backgroundColor: Colors.white,
        height: 80,
        borderRadius: theme.borderRadius.lg,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.textSecondary,
      }}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={24}
            color={Colors.error}
          />
        </View>
      )}
    />
  ),
  /*
    Or create a completely new type - 'info',
    building the layout from scratch.
  */
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        backgroundColor: Colors.white,
        height: 80,
        borderRadius: theme.borderRadius.lg,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.textSecondary,
      }}
      renderLeadingIcon={() => (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="information"
            size={24}
            color={Colors.primary}
          />
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
  },
});

export default toastConfig;
