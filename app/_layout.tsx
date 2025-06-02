import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./contexts/AuthContext";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(car)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </>
  );
}
