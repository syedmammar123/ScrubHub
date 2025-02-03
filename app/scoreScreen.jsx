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
import StatusButton from "@/components/statusButton";

export default function ScoreScreen() {
  const { getScore } = useQuesStore((state) => state);
  const [score, setScore] = useState(getScore());
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <View contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}
          <ScrubLogo />

          {/* Score Section */}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                marginBottom: 30,
                fontFamily: "Poppins-Regular",
              }}
            >
              Your Score
            </Text>
            <View>
              <Text
                style={{
                  color: score < 5 ? "#787878" : theme.barColor,
                  fontSize: 60,
                  marginBottom: 70,
                }}
              >
                {score}
                <Text
                  style={{
                    color: "#3d3d3d",
                    fontSize: 60,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {" "}
                  / 15
                </Text>
              </Text>
            </View>
            <Text
              style={{
                width: "80%",
                textAlign: "center",
                color: "#787878",
                fontSize: 13,
                marginBottom: 20,
                fontFamily: "Poppins-Regular",
              }}
            >
              You did a great job, Learn more by solving more questions of
              different topics.
            </Text>
            <TouchableOpacity>
              Challenge a friend
            </TouchableOpacity>
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
