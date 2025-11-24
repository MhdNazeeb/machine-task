import React, { memo } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { Colors } from "../constants/Colors";
import { theme } from "../constants/theme";
import Animated from "react-native-reanimated";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  animated?: any;
  entryAnimation?: any;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  animated,
  entryAnimation,
  ...props
}) => {
  if (animated) {
    return (
      <Animated.View style={[styles.card, style]} {...props} entering={entryAnimation}>
        {children}
      </Animated.View>
    );
  }
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...theme.shadow.medium,
  },
});

export default memo(Card);
