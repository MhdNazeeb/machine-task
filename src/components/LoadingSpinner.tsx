import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

interface LoadingSpinnerProps {
  size?: "small" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "large" }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ActivityIndicator size={size} color={Colors.textWhite} />
      </LinearGradient>
    </View>
  );
};

import { scaleWidth } from "../utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: scaleWidth(100),
    height: scaleWidth(100),
    borderRadius: scaleWidth(50),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(LoadingSpinner);
