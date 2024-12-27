import { theme } from "@/theme";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
export default function Layout() {
  // const [fontsLoaded] = useFonts({
  //   CustomFont: require("@/assets/fonts/Poppins-Regular.ttf"), // Add path to your font
  // });

  // if (!fontsLoaded) {
  //   console.log("NFONT NOT LOADED");

  //   return null; // You can show a loading screen or spinner here until fonts are loaded
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Stack.Screen
          name="details"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="review"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="fourOptQues"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="multipleOptSelect"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="questionmark"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="wordscrambled"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="matching"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="friends"
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
        <Stack.Screen
          name="incompleteProcess"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="challengeLeaderboard"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
