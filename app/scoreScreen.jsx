import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import useQuesStore from "@/store/quesStore";
import StatusButton from "@/components/statusButton";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import useChallengeFriend from "@/hooks/useChallengeFriend";

export default function ScoreScreen() {
  const {
    getScore,
    getFriendChallengeScore,
    getOpponentScore,
    getCurrentType,
    getChallengerUsername,
    getChallengingScore,
    getOpponentID,
  } = useQuesStore((state) => state);

  const [score, setScore] = useState(getScore());

  const friendChallengeScore = getFriendChallengeScore();
  const currentOpponentScore = getOpponentScore();
  const type = getCurrentType();
  const challengerUsername = getChallengerUsername();

  const { challengeFriend, loading } = useChallengeFriend();

  // const friendChallengeScore = 10;
  // const type = "ChallengingFriends";
  // const currentOpponentScore = 15;
  // const challengerUsername = "Ammar3";

  console.log("friendChallengeScore: ", friendChallengeScore);
  console.log("currentOpponentScore: ", currentOpponentScore);
  console.log("type: ", type);

  const challengingScore = getChallengingScore();
  const friendId = getOpponentID();
  
  useEffect(() => {
    if (type === "ChallengingFriends") {
      const isChallengeFriendSuccessfull = challengeFriend(
        friendId,
        challengingScore,
        questions
      );
    }
  }, []);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      {/* Curvy Lines Background */}
      <BackgroundImage>
        {/* Content Container */}
        <View contentContainerStyle={styles.scrollContainer}>
          {/* Logo */}
          <ScrubLogo />

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
            <View className="flex flex-col items-center">
              <CustomText
                style={{
                  color: score < 5 ? "#EF5555" : theme.barColor,
                  fontSize: 60,
                  marginBottom: 30,
                }}
              >
                {friendChallengeScore ? friendChallengeScore : score}
                <CustomText
                  style={{
                    color: "#3d3d3d",
                    fontSize: 60,
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {" "}
                  / 15
                </CustomText>
              </CustomText>
              {type !== "friendchallenge" && type !== "ChallengingFriends" && (
                <TouchableOpacity
                  className={`items-center font-bold py-3 px-4 rounded bg-[#93D334] shadow-md mb-10`}
                  onPress={() => router.navigate("ChallengeFriend")}
                >
                  <CustomText className="font-semibold">
                    Challenge a friend
                  </CustomText>
                </TouchableOpacity>
              )}
              <View className="mb-5 px-5">
                {type === "friendchallenge" &&
                  friendChallengeScore > currentOpponentScore && (
                    <CustomText className="text-center text-lg font-semibold">
                      Hooray you{" "}
                      <CustomText className="font-bold text-green-700">
                        won
                      </CustomText>{" "}
                      against {challengerUsername}. {challengerUsername} scored{" "}
                      <CustomText className="font-semibold">
                        {currentOpponentScore}
                      </CustomText>{" "}
                      points.
                    </CustomText>
                  )}
                {type === "friendchallenge" &&
                  friendChallengeScore < currentOpponentScore && (
                    <CustomText className="text-center text-lg font-semibold">
                      You{" "}
                      <CustomText className="font-bold text-red-500">
                        lost
                      </CustomText>{" "}
                      against {challengerUsername}. {challengerUsername} scored{" "}
                      <CustomText className="font-semibold">
                        {currentOpponentScore}
                      </CustomText>{" "}
                      points.
                    </CustomText>
                  )}
                {type === "friendchallenge" &&
                  friendChallengeScore === currentOpponentScore && (
                    <CustomText className="text-center text-lg font-semibold">
                      It's a <CustomText className="font-bold">draw</CustomText>{" "}
                      against {challengerUsername}. {challengerUsername} scored{" "}
                      <CustomText className="font-semibold">
                        {currentOpponentScore}
                      </CustomText>{" "}
                      points.
                    </CustomText>
                  )}
                {type === "ChallengingFriends" && (
                  // <CustomText className="text-center text-lg font-semibold">
                  //   Challenge is <CustomText className="font-bold">sent</CustomText>{" "}
                  //   to your  {challengerUsername}. {challengerUsername} scored{" "}
                  //   <CustomText className="font-semibold">
                  //     {currentOpponentScore}
                  //   </CustomText>{" "}
                  //   points.
                  // </CustomText>
                  <CustomText className="text-center text-lg font-semibold">
                    Challenge is sent to your friend
                  </CustomText>
                )}
              </View>
            </View>

            <CustomText
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
