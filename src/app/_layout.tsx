import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";
import toastConfig from "../components/CustomToast";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
      </Stack>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
