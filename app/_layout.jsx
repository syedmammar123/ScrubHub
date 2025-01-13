import { theme } from "@/theme";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

import useCurrentUserStore from "@/store/currentUserStore";


export default function Layout() {

  const [fontsLoaded, error] = useFonts({
    CustomFont: require("@/assets/fonts/Poppins-Regular.ttf"), // Add path to your font
  });

  if (!fontsLoaded) {
    console.log("NFONT NOT LOADED");
    if (error) {
      console.log("Error loading font:", error);
    }
    return null; // You can show a loading screen or spinner here until fonts are loaded
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          tabBarActiveTintColor: theme.colorGreen,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="otpScreen"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen name="details" options={{ animation: "fade" }} />
        <Stack.Screen name="topics" options={{ animation: "fade" }} />
        <Stack.Screen name="review" options={{ animation: "fade" }} />
        <Stack.Screen name="fourOptQues" options={{ animation: "fade" }} />
        <Stack.Screen
          name="multipleOptSelect"
          options={{ animation: "fade" }}
        />
        <Stack.Screen name="questionmark" options={{ animation: "fade" }} />
        <Stack.Screen name="wordscrambled" options={{ animation: "fade" }} />
        <Stack.Screen name="matching" options={{ animation: "fade" }} />
        <Stack.Screen name="friends" options={{ animation: "fade" }} />
        <Stack.Screen name="userInfoScreen" options={{ animation: "fade" }} />
        <Stack.Screen
          name="incompleteProcess"
          options={{ animation: "fade" }}
        />
        <Stack.Screen
          name="challengeLeaderboard"
          options={{ animation: "fade" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
