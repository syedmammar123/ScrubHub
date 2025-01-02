import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import { router, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
const buttons = [
  { label: "Topic 1" },
  { label: "Test Topic 1" },
  { label: "Test Topic 2" },
  { label: "Gastrointestinal" },
  { label: "Musculoskeletal & Dermatology" },
  { label: "Renal" },
  { label: "Nervous" },
  { label: "Reproductive & Pregnancy" },
  { label: "Cardiovascular 1" },
  { label: "Cardiovascular 2" },
  { label: "Cardiovascular 3" },
  { label: "Cardiovascular 4" },
  { label: "Cardiovascular 5" },
  { label: "Cardiovascular 6" },
  { label: "Cardiovascular 7" },
  { label: "Cardiovascular 8" },
];

export default function Topics() {
  const { fetchQuestions, getCurrentQuestion, currentIndex } = useQuesStore(
    (state) => state
  );

  const router = useRouter();
  const handlePress = async () => {
    if (currentIndex < 8) {
      await fetchQuestions();
      const nextScreen = getQuestionType(getCurrentQuestion());

      router.navigate(nextScreen);
    } else {
      router.navigate("/");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <BackButton />

      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              marginBottom: 20,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Choose From Topics...
              </Text>
            </View>
            <View>
              <Pressable
                style={{
                  backgroundColor: theme.barColor,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: theme.barBgColor,
                  borderRadius: 10,
                  // Shadow for iOS
                  shadowColor: "#000", // Black shadow
                  shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
                  shadowOpacity: 0.1, // Opacity of the shadow
                  shadowRadius: 10, // Blur effect of the shadow

                  // Elevation for Android
                  elevation: 20, // Adds shadow on Android
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 14, color: "white" }}
                >
                  Random
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {/* Buttons */}
            {buttons.map((button, index) => (
              <TouchableOpacity
                onPress={handlePress}
                key={index}
                style={[styles.button]}
              >
                <Text style={styles.buttonText}>{button.label}</Text>
                <AntDesign
                  name="rightcircle"
                  size={24}
                  color={theme.barColor}
                />
                {/* <View style={[styles.lowerBox, { backgroundColor: "#F0f0f0" }]}>
                  <View>
                    
                  </View>
                  <View>
                    
                  </View>
                </View> */}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
  },

  button: {
    width: "100%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },

  lowerBox: {
    width: "95%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: "#000", // Black shadow
    shadowOffset: { width: 0, height: 4 }, // Offset of the shadow
    shadowOpacity: 0.01, // Opacity of the shadow
    shadowRadius: 10, // Blur effect of the shadow

    flexDirection: "row",
    justifyContent: "space-between",
    // Elevation for Android
    elevation: 5, // Adds shadow on Android
  },
  buttonText: {
    color: theme.colorBlack,
    fontWeight: "bold",
    fontSize: 16,
  },
});
