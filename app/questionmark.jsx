import { View, StatusBar, StyleSheet } from "react-native";
import React from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ReviewButton from "@/components/reviewButton";
import { theme } from "@/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function questionmark() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          <View style={styles.questionMarks}>
            <FontAwesome5
              style={{ marginBottom: 50 }}
              name="question"
              size={80}
              color="black"
            />
            <FontAwesome5
              style={{ marginBottom: 50 }}
              name="question"
              size={80}
              color="black"
            />
            <FontAwesome5
              style={{ marginBottom: 50 }}
              name="question"
              size={80}
              color="black"
            />
          </View>
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  questionMarks: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    flexDirection: "col",
  },
});
