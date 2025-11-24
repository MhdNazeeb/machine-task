import React, { memo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";

interface BackgroundProps extends ViewProps {
  children?: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
});

export default memo(Background);
