import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import StatusButton from "@/components/statusButton";
import { useRouter } from "expo-router";

export default function ScoreScreen() {
  const { getScore } = useQuesStore((state) => state);
  const [score, setScore] = useState(getScore());

  console.log("score: ",score)

  const router = useRouter();
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
                  color: score < 5 ? "#EF5555" : theme.barColor,
                  fontSize: 60,
                  marginBottom: 30,
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
              <TouchableOpacity className={`items-center font-bold py-3 px-4 rounded bg-[#93D334] shadow-md mb-10`} onPress={() => router.navigate("ChallengeFriend")}>
              <Text className='font-semibold'>Challenge a friend</Text>
            </TouchableOpacity>
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
