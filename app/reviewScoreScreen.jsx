import React, { useState } from "react";
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
import StatusButton from "@/components/statusButton";
import CustomText from "@/components/CustomText";

export default function ReviewScoreScreen() {
  const router = useRouter();

  const { getReviewScore } = useQuesStore((state) => state);
  const [score, setScore] = useState(getReviewScore());
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <View contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}
          <ScrubLogo type={null} />

          {/* Score Section */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomText
              style={{
                color: "black",
                fontSize: 25,
                marginBottom: 30,
                fontFamily: "Poppins-Regular",
              }}
            >
              Your Score
            </CustomText>
            <View>
              <CustomText
                style={{
                  color: score < 8 ? "#EF5555" : theme.barColor,
                  fontSize: 60,
                  marginBottom: 70,
                }}
              >
                {score}
                <CustomText
                  style={{
                    fontFamily: "Poppins-Regular",
                    color: "#3d3d3d",
                    fontSize: 60,
                  }}
                >
                  {" "}
                  / 15
                </CustomText>
              </CustomText>
            </View>
            
            <CustomText
              style={{
                width: "80%",
                textAlign: "center",
                color: "#787878",
                fontSize: 14,
                marginBottom: 20,
                fontFamily: "Poppins-Regular",
              }}
            >
              You did a great job, Learn more by solving more questions of
              different topics.
            </CustomText>
            <StatusButton type="home" width={"70%"} text="Continue" />
          </View>
        </View>
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
    flex: 1,
  },
});
