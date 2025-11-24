import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import { theme } from "../constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface CalorieCardProps {
  targetCalories: number;
  consumedCalories?: number;
}

export default function CalorieCard({
  targetCalories,
  consumedCalories = 0,
}: CalorieCardProps) {
  const [displayCalories, setDisplayCalories] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset animation
    animatedValue.setValue(0);

    // Start animation
    Animated.timing(animatedValue, {
      toValue: targetCalories,
      duration: 2000, // 2 seconds for smooth animation
      useNativeDriver: false, // false because we are listening to value changes
      easing: Easing.out(Easing.exp),
    }).start();

    // Listener to update state
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayCalories(Math.floor(value));
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [targetCalories]);

  const progress = Math.min(displayCalories / targetCalories, 1);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF9966", "#FF5E62"]} // Warm orange/red gradient for calories
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="fire"
              size={32}
              color={Colors.white}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.label}>Daily Goal</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{displayCalories}</Text>
              <Text style={styles.unit}> / {targetCalories} kcal</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            {/* Simple circular progress indicator could go here, but for now a bar */}
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    elevation: 4,
    shadowColor: "#FF5E62",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    padding: theme.spacing.lg,
  },
  content: {
    flexDirection: "column",
  },
  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    alignSelf: "flex-start",
    marginBottom: theme.spacing.md,
  },
  textContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: theme.spacing.xs,
    fontWeight: "600",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.white,
  },
  unit: {
    fontSize: theme.fontSize.md,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: theme.spacing.xs,
  },
  progressContainer: {
    marginTop: theme.spacing.xs,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
});
