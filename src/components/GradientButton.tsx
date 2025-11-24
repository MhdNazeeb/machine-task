import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";
import { theme } from "../constants/theme";
import { moderateScale, scaleFont, scaleHeight } from "../utils/responsive";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  if ((variant === "primary" || variant === "danger") && !isDisabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[styles.container, style]}
      >
        <LinearGradient
          colors={
            variant === "danger"
              ? Colors.dangerGradient
              : Colors.primaryGradient
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                {icon && (
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name={icon}
                      size={scaleFont(20)}
                      color={Colors.white}
                    />
                  </View>
                )}
                <Text style={[styles.text, styles.textPrimary, textStyle]}>
                  {title}
                </Text>
              </>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        variant === "secondary" && styles.buttonSecondary,
        variant === "outline" && styles.buttonOutline,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? Colors.white : Colors.primary}
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={icon}
                size={scaleFont(20)}
                color={
                  variant === "primary"
                    ? Colors.white
                    : variant === "outline"
                    ? Colors.primary
                    : Colors.text
                }
              />
            </View>
          )}
          <Text
            style={[
              styles.text,
              variant === "primary" && styles.textPrimary,
              variant === "secondary" && styles.textSecondary,
              variant === "outline" && styles.textOutline,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: scaleFont(22),
    overflow: "hidden",
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: scaleHeight(4) },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(8),
  },
  gradient: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: scaleHeight(56),
  },
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: scaleHeight(56),
  },
  buttonSecondary: {
    backgroundColor: Colors.backgroundSecondary,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1.5),
    borderColor: Colors.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: Colors.disabled,
    elevation: 0,
    shadowOpacity: 0,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.text,
  },
  textOutline: {
    color: Colors.primary,
  },
});
