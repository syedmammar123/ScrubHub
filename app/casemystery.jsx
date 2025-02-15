import { View, StatusBar, StyleSheet } from "react-native";
import React from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ReviewButton from "@/components/reviewButton";
import { theme } from "@/theme";

export default function casemystery() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo type={null} />
          <View style={styles.reviewBtnContainer}>
            <ReviewButton
              btnTitle="ALL SYSTEM"
              bgColor={"#00C2FF"}
              nextRoute={"fourOptQues"}
            />
            <ReviewButton
              btnTitle="BY SYSTEM"
              bgColor={"#70FF00"}
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
