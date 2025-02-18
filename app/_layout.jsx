import { theme } from "@/theme";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import "./global.css";
import { Text } from "react-native";
import { ErrorBoundary } from 'react-error-boundary';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";


SplashScreen.preventAutoHideAsync(); 

function ErrorFallback() {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Something went wrong. Please restart the app.</Text>
    </View>
  );
}

export default function Layout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Semi": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  // if (!fontsLoaded) {
  //   console.log("FONT NOT LOADED");
  //   if (error) {
  //     console.log("Error loading font:", error);
  //   }
  //   return null; // You can show a loading screen or spinner here until fonts are loaded
  // }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep the splash screen visible
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "fade",
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
            name="topics"
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
            name="scoreScreen"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="reviewScoreScreen"
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
          {/* <Stack.Screen
            name="wordscramblereview"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="wordscrambledchallenge"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="wordscrambledfriendchallenge"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="wordscrambledchallengingfriend"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          /> */}
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
            name="userInfoScreen"
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
          <Stack.Screen
            name="FriendsLeaderboard"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="UserContacts"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="ChallengeFriend"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen
            name="DisplayChallenges"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </ErrorBoundary >

  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorWhite,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  }
});

// import { theme } from "@/theme";
// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { useFonts } from "expo-font";
// import "./global.css";
// import { Text } from "react-native";
// export default function Layout() {
//   const [fontsLoaded, error] = useFonts({
//     "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-Semi": require("@/assets/fonts/Poppins-SemiBold.ttf"),
//   });

//   if (!fontsLoaded) {
//     console.log("FONT NOT LOADED");
//     if (error) {
//       console.log("Error loading font:", error);
//     }
//     return null; // You can show a loading screen or spinner here until fonts are loaded
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Stack screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
//         <Stack.Screen
//           name="(tabs)"
//           options={{
//             headerShown: false,
//             animation: "slide_from_bottom",
//           }}
//         />
//         <Stack.Screen
//           name="onboarding"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="details"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="topics"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="review"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="fourOptQues"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="multipleOptSelect"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="scoreScreen"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="reviewScoreScreen"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="questionmark"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="wordscrambled"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="wordscramblereview"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="wordscrambledchallenge"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="wordscrambledfriendchallenge"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="wordscrambledchallengingfriend"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="matching"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="friends"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="register"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="otpScreen"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="userInfoScreen"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="incompleteProcess"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="challengeLeaderboard"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="FriendsLeaderboard"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="UserContacts"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="ChallengeFriend"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//         <Stack.Screen
//           name="DisplayChallenges"
//           options={{
//             headerShown: false,
//             animation: "fade",
//           }}
//         />
//       </Stack>
//     </GestureHandlerRootView>
//   );
// }
