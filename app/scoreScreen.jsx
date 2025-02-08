import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import StatusButton from "@/components/statusButton";
import { useRouter } from "expo-router";

export default function ScoreScreen() {
  const {
    getScore,
    getFriendChallengeScore,
    getOpponentScore,
    getCurrentType,
    getChallengerUsername,
  } = useQuesStore((state) => state);
  const [score, setScore] = useState(getScore());

  const friendChallengeScore = getFriendChallengeScore();
  const currentOpponentScore = getOpponentScore();
  const type = getCurrentType();
  const challengerUsername = getChallengerUsername();

  // const friendChallengeScore = 10;
  // const type = "friendchallenge";
  // const currentOpponentScore = 15;
  // const challengerUsername = "Ammar3";

  console.log("friendChallengeScore: ", friendChallengeScore);
  console.log("currentOpponentScore: ", currentOpponentScore);
  console.log("type: ", type);

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
            <View className="flex flex-col items-center">
              <Text
                style={{
                  color: score < 5 ? "#EF5555" : theme.barColor,
                  fontSize: 60,
                  marginBottom: 30,
                }}
              >
                {friendChallengeScore ? friendChallengeScore : score}
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
              {type !== "friendchallenge" && (
                <TouchableOpacity
                  className={`items-center font-bold py-3 px-4 rounded bg-[#93D334] shadow-md mb-10`}
                  onPress={() => router.navigate("ChallengeFriend")}
                >
                  <Text className="font-semibold">Challenge a friend</Text>
                </TouchableOpacity>
              )}
              <View className="mb-5 px-5">
                {type === "friendchallenge" &&
                  friendChallengeScore > currentOpponentScore && (
                    <Text className="text-center text-lg font-semibold">
                      Hooray you{" "}
                      <Text className="font-bold text-green-700">won</Text>{" "}
                      against {challengerUsername}. {challengerUsername} scored{" "}
                      <Text className="font-semibold">
                        {currentOpponentScore}
                      </Text>{" "}
                      points.
                    </Text>
                  )}
                {type === "friendchallenge" &&
                  friendChallengeScore < currentOpponentScore && (
                    <Text className="text-center text-lg font-semibold">
                      You <Text className="font-bold text-red-500">lost</Text>{" "}
                      against {challengerUsername}. {challengerUsername} scored{" "}
                      <Text className="font-semibold">
                        {currentOpponentScore}
                      </Text>{" "}
                      points.
                    </Text>
                  )}
                {type === "friendchallenge" &&
                  friendChallengeScore === currentOpponentScore && (
                    <Text className="text-center text-lg font-semibold">
                      It's a <Text className="font-bold">draw</Text> against{" "}
                      {challengerUsername}. {challengerUsername} scored{" "}
                      <Text className="font-semibold">
                        {currentOpponentScore}
                      </Text>{" "}
                      points.
                    </Text>
                  )}
              </View>
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
