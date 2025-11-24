import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Card from "../../components/Card";
import Background from "../../components/GradientBackground";
import Button from "../../components/GradientButton";
import Input from "../../components/Input";
import { Colors } from "../../constants/Colors";
import { theme } from "../../constants/theme";
import { useAuth } from "../../contexts/AuthContext";
import { scaleHeight, scaleWidth } from "../../utils/responsive";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../../utils/validation";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{
    fullName?: boolean;
    email?: boolean;
    password?: boolean;
  }>({});

  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  // Redirect authenticated users to home
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(protected)/home");
    }
  }, [isAuthenticated, router]);

  // Real-time validation (only show errors for touched fields)
  const validationErrors = useMemo(() => {
    const errs: { fullName?: string; email?: string; password?: string } = {};

    if (touched.fullName && fullName) {
      const nameValidation = validateFullName(fullName);
      if (!nameValidation.isValid) errs.fullName = nameValidation.error;
    }

    if (touched.email && email) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) errs.email = emailValidation.error;
    }

    if (touched.password && password) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) errs.password = passwordValidation.error;
    }

    return errs;
  }, [fullName, email, password, touched]);

  const handleRegister = useCallback(async () => {
    // Mark all fields as touched
    setTouched({ fullName: true, email: true, password: true });
    setErrors({});

    // Final validation
    const nameValidation = validateFullName(fullName);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    const newErrors: { fullName?: string; email?: string; password?: string } =
      {};
    if (!nameValidation.isValid) newErrors.fullName = nameValidation.error;
    if (!emailValidation.isValid) newErrors.email = emailValidation.error;
    if (!passwordValidation.isValid)
      newErrors.password = passwordValidation.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const result = await register(
      fullName.trim(),
      email.trim().toLowerCase(),
      password
    );
    setLoading(false);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Your account has been created. Please login to continue.",
        onHide: () => router.push("/onBoarding/login"),
        visibilityTime: 3000,
      });
      // Fallback navigation in case onHide doesn't trigger as expected or for immediate feedback if preferred,
      // but onHide is better for letting the user see the toast.
      // However, to mimic the Alert behavior where the user presses OK, we might want to delay navigation.
      // Toast doesn't block execution like Alert.
      // Let's just navigate after a short delay or rely on the user to navigate?
      // The original code forced navigation on "OK".
      // Let's use a timeout to navigate.
      setTimeout(() => {
        router.push("/onBoarding/login");
      }, 2000);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.error || "Registration failed",
      });
    }
  }, [fullName, email, password, register, router]);

  const navigateToLogin = useCallback(() => {
    router.push("/onBoarding/login");
  }, [router]);

  const displayErrors = useMemo(
    () => ({
      fullName: errors.fullName || validationErrors.fullName,
      email: errors.email || validationErrors.email,
      password: errors.password || validationErrors.password,
    }),
    [errors, validationErrors]
  );

  return (
    <Background>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="account-plus"
                size={64}
                color={Colors.primary}
              />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <Card style={styles.card}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
              error={displayErrors.fullName}
              required
              autoCapitalize="words"
              autoCorrect={false}
              icon="account-outline"
            />

            <Input
              label="Email"
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              error={displayErrors.email}
              required
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email-outline"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              error={displayErrors.password}
              required
              isPassword
              autoCapitalize="none"
              icon="lock-outline"
            />

            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              style={styles.button}
            />
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Button
              title="Login"
              onPress={navigateToLogin}
              variant="outline"
              style={styles.loginButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: scaleWidth(50),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: Colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: Colors.textSecondary,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: theme.fontSize.sm,
  },
  loginButton: {
    maxHeight: scaleHeight(100),
    paddingHorizontal: theme.spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});
