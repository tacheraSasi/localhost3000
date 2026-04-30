import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="webview"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
