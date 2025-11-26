import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SlideInRight,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Card from "../../components/Card";
import Background from "../../components/GradientBackground";
import Button from "../../components/GradientButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Colors } from "../../constants/Colors";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { useFirstLogin } from "../../hooks/useFirstLogin";
import { useLocation } from "../../hooks/useLocation";
import { useNotifications } from "../../hooks/useNotifications";
import { scaleHeight } from "../../utils/responsive";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const {
    location,
    loading: locationLoading,
    error: locationError,
    refetch: refetchLocation,
  } = useLocation();
  const { sendTestNotification } = useNotifications();

  const { hasRequestedPermissions } = useFirstLogin(user?.email || null);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.7],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const greetingAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.9],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  // Refetch location after permissions
  useEffect(() => {
    if (hasRequestedPermissions) {
      refetchLocation();
    }
  }, [hasRequestedPermissions]);

  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/onBoarding/login");
        },
      },
    ]);
  }, [logout, router]);

  const handleTestNotification = useCallback(async () => {
    await sendTestNotification();
  }, [sendTestNotification]);

  // Memoize first name extraction
  const firstName = useMemo(() => {
    if (!user?.fullName) return "User";
    return user.fullName.split(" ")[0];
  }, [user?.fullName]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <Background>
      <StatusBar style="dark" />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Animated.Text style={[styles.greeting, greetingAnimatedStyle]}>
            Hello, {firstName}!
          </Animated.Text>
          <Text style={styles.subtitle}>Welcome to your dashboard</Text>
        </Animated.View>

        {/* User Info Card */}
        <Card style={styles.card} animated={true} entryAnimation={SlideInRight}>
          <Text style={styles.cardTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user.fullName}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </Card>

        {/* Location Card */}
        <Card style={styles.card} animated={true} entryAnimation={SlideInRight}>
          <Text style={styles.cardTitle}> Current Location</Text>

          {locationLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Getting your location...</Text>
            </View>
          ) : locationError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{locationError}</Text>
              <Text style={styles.errorHint}>
                Please enable location permissions in settings
              </Text>
            </View>
          ) : location ? (
            <>
              <View style={styles.locationRow}>
                <Text style={styles.locationLabel}>Latitude:</Text>
                <Text style={styles.locationValue}>
                  {location.latitude.toFixed(6)}°
                </Text>
              </View>

              <View style={styles.locationRow}>
                <Text style={styles.locationLabel}>Longitude:</Text>
                <Text style={styles.locationValue}>
                  {location.longitude.toFixed(6)}°
                </Text>
              </View>

              {location.address && (
                <>
                  <View style={styles.divider} />
                  <View style={styles.addressContainer}>
                    <Text style={styles.locationLabel}>Address:</Text>
                    <Text style={styles.addressValue}>{location.address}</Text>
                  </View>
                </>
              )}
            </>
          ) : (
            <Text style={styles.noLocationText}>No location available</Text>
          )}
        </Card>

        {/* Notifications Card */}
        <Card style={styles.card} animated={true} entryAnimation={SlideInRight}>
          <Text style={styles.cardTitle}> Notifications</Text>
          <Text style={styles.cardDescription}>
            Test the local notification system
          </Text>

          <Button
            title="Test Notification"
            onPress={handleTestNotification}
            variant="secondary"
            style={styles.notificationButton}
          />
        </Card>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="danger"
          style={styles.logoutButton}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>HealthConnect</Text>
          <Text style={styles.footerSubtext}>Your Health Companion</Text>
        </View>
      </Animated.ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  greeting: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: Colors.textSecondary,
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: theme.spacing.md,
  },
  cardDescription: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: theme.spacing.md,
  },
  loadingContainer: {
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },
  loadingText: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
  },
  errorContainer: {
    paddingVertical: theme.spacing.md,
  },
  errorText: {
    fontSize: theme.fontSize.sm,
    color: Colors.error,
    marginBottom: theme.spacing.xs,
  },
  errorHint: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  locationLabel: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
  },
  locationValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: Colors.text,
  },
  addressContainer: {
    marginTop: theme.spacing.sm,
  },
  addressValue: {
    fontSize: theme.fontSize.sm,
    color: Colors.text,
    marginTop: theme.spacing.xs,
    lineHeight: scaleHeight(20),
  },
  noLocationText: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingVertical: theme.spacing.lg,
  },
  notificationButton: {
    marginTop: theme.spacing.sm,
  },
  logoutButton: {
    marginTop: theme.spacing.md,
  },
  footer: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: Colors.text,
  },
  footerSubtext: {
    fontSize: theme.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
