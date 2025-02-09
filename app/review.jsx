import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ReviewButton from "@/components/reviewButton";
import { theme } from "@/theme";

export default function review() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          <View style={styles.reviewBtnContainer}>
            <ReviewButton
              btnTitle="REVIEW ALL"
              bgColor={"#EBA7A7"}
              nextRoute={"reviewall"}
            />
            <ReviewButton
              btnTitle="REVIEW BY SYSTEM"
              bgColor={"#FFB800"}
              nextRoute={"details"}
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
  reviewBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    flexDirection: "col",
  },
});
