import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";

import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";

const buttons = [
  { label: "CARDIOVASCULAR", icon: "graduation-cap", bgColor: "#EBA7A7" },
  { label: "PULMONARY", icon: "graduation-cap", bgColor: "#9747FF" },
  { label: "PSYCHIATRY", icon: "graduation-cap", bgColor: "#FFB800" },
  { label: "GASTROINTESTINAL", icon: "graduation-cap", bgColor: "#70FF00" },
  {
    label: "MUSCULOSKELETAL & DERMATOLOGY",
    icon: "graduation-cap",
    bgColor: "#00C2FF",
  },
  { label: "RENAL", icon: "graduation-cap", bgColor: "#FFE500" },
  { label: "NERVOUS", icon: "graduation-cap", bgColor: "#DCC5C6" },
  {
    label: "REPRODUCTIVE & PREGNANCY",
    icon: "graduation-cap",
    bgColor: "#EF477A",
  },
];

export default function App() {
  const { getCurrentType } = useQuesStore((state) => state);

  const router = useRouter();

  const handlePress = (system) => {
    console.log("TYPE", getCurrentType());

    // if (currentIndex < 8) {
    //   await fetchQuestions();
    //   const nextScreen = getQuestionType(getCurrentQuestion());

    //   router.navigate(nextScreen);
    // } else {
    //   router.navigate("/");
    // }
    router.push({ pathname: "topics", params: { system: system } });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}
          <ScrubLogo type={null} />

          <View style={styles.buttonContainer}>
            {/* Buttons */}
            {buttons.map((button, index) => (
              <TouchableOpacity
                onPress={() => handlePress(button.label)}
                key={index}
                style={[styles.button]}
              >
                <View
                  style={[
                    styles.buttonCircleStyle,
                    { backgroundColor: button.bgColor },
                  ]}
                >
                  <Entypo name={button.icon} size={24} color="black" />
                </View>
                <View
                  style={[styles.lowerBox, { backgroundColor: button.bgColor }]}
                >
                  <CustomText
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.5}
                    style={styles.buttonText}
                  >
                    {button.label}
                  </CustomText>
                </View>
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
    paddingBottom: 150,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "95%",
    justifyContent: "space-between",
  },

  button: {
    width: "50%",
    marginBottom: 10,
    alignItems: "center",
  },

  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
  },

  lowerBox: {
    width: "95%",
    borderWidth: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colorBlack,
    // fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    // fontFamily: "Poppins-Regular",
    fontFamily: "Poppins-Semi",
  },
});
