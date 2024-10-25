import { theme } from "@/theme";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </Stack>
  );
}
