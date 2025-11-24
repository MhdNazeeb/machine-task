import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import toastConfig from "../components/CustomToast";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      />
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
