import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetChallenges from "@/hooks/useGetChallenges";
import { avatars } from "./userInfoScreen";
import { formatDateOnly, formatTimeOnly } from "@/util/getRandomItem";
import { theme } from "@/theme";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";
import { useRouter } from "expo-router";
import CustomText from "@/components/CustomText";
import { useState } from "react";

const dummyData = [
  {
    challengerId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    opponentId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    challengerScore: 5,
    opponentScore: 3,
    status: "completed",
    challengerAvatarId: 1,
    challengerUsername: "John",
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1U",
  },
  {
    challengerId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    opponentId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    challengerScore: 5,
    opponentScore: 8,
    status: "completed",
    challengerAvatarId: 1,
    challengerUsername: "John",
    timestamp: { nanoseconds: 542004000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1a",
  },
  {
    challengerId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    opponentId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    challengerScore: 8,
    opponentScore: 8,
    status: "completed",
    challengerAvatarId: 1,
    challengerUsername: "John",
    timestamp: { nanoseconds: 542304000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1b",
  },
  {
    challengerId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    opponentId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    challengerScore: 8,
    opponentScore: 8,
    status: "completed",
    opponentAvatarId: 2,
    opponentUsername: "John",
    timestamp: { nanoseconds: 542604000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1c",
  },
  {
    challengerId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    opponentId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    challengerScore: 8,
    opponentScore: 5,
    status: "completed",
    opponentAvatarId: 2,
    opponentUsername: "John",
    timestamp: { nanoseconds: 542674000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1d",
  },
  {
    challengerId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    opponentId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    challengerScore: 8,
    opponentScore: 15,
    status: "completed",
    opponentAvatarId: 2,
    opponentUsername: "John",
    timestamp: { nanoseconds: 642674000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1e",
  },
  {
    challengerId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    opponentId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    challengerScore: 8,
    opponentScore: null,
    status: "pending",
    opponentAvatarId: 2,
    opponentUsername: "John",
    timestamp: { nanoseconds: 842674000, seconds: 1738870965 },
    id: "K0vEgOesG8hHs0PVkX1f",
  },
  {
    challengerId: "DQEwsxt5K7g0k95FN7Y6oqGMeAr2",
    opponentId: "FrTsL0JPgZaBSMvPoGHErIpU1iz2",
    challengerScore: 8,
    opponentScore: null,
    status: "pending",
    challengerAvatarId: 2,
    challengerUsername: "John",
    timestamp: { nanoseconds: 742674000, seconds: 1738870965 },
    id: "5h0Ivag02puXiUaMLDmg",
  },
];

const DisplayChallenges = ({}) => {
  const { userChallenges, user } = useCurrentUserStore((state) => state);
  const { loading, error } = useGetChallenges();
  const [err, setErr] = useState();
  const {
    fetchChallengeFriendQuestions,
    getFriendChallengeQuestion,
    getFetchedFriendChallengeID,
    setType,
    clearFields,
  } = useQuesStore((state) => state);

  const router = useRouter();

  const handleText = (challenge) => {
    const isChallenger = challenge.challengerId === user?.uid;

    const otherPlayerName = isChallenger
      ? challenge.opponentUsername
      : challenge.challengerUsername;

    const { challengerScore, opponentScore, status } = challenge;

    if (status === "pending") {
      return isChallenger
        ? `You challenged ${otherPlayerName}. Waiting for response`
        : `${otherPlayerName} challenged you`;
    }

    const myScore = isChallenger ? challengerScore : opponentScore;
    const otherPlayerScoreValue = isChallenger
      ? opponentScore
      : challengerScore;

    if (myScore > otherPlayerScoreValue) {
      return `You won against ${otherPlayerName}. You scored ${myScore}, and ${otherPlayerName} scored ${otherPlayerScoreValue}`;
    } else if (myScore < otherPlayerScoreValue) {
      return `You lost against ${otherPlayerName}. You scored ${myScore}, and ${otherPlayerName} scored ${otherPlayerScoreValue}`;
    } else {
      return `You drew against ${otherPlayerName}. You scored ${myScore}, and ${otherPlayerName} scored ${otherPlayerScoreValue}`;
    }
  };

  const handleAttemptChallenge = (challenge) => {
    clearFields();
    setType("friendchallenge");
    const id = challenge.id;
    const currentChallenge = getFetchedFriendChallengeID();
    console.log("CURRENTCHALLENGE", currentChallenge);

    if (currentChallenge === "") {
      console.log("FETCHING");

      let questions = fetchChallengeFriendQuestions(challenge);
      if (questions === 0) {
        setErr(true);
        // console.log("YES");
      } else {
        console.log("FETCH COMPLERE");

        const nextScreen = getQuestionType(getFriendChallengeQuestion());

        console.log("NEXT SCREEN", nextScreen);
        router.navigate(nextScreen);
      }
    } else {
      // Already Fetched Questions
      const nextScreen = getQuestionType(getFriendChallengeQuestion());
      if (nextScreen === "wordscrambled") {
        router.replace("wordscrambledfriendchallenge");
      } else {
        router.replace(nextScreen);
      }
    }
  };

  console.log("userChallenges", userChallenges);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackgroundImage>
        <BackButton />
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          {error && userChallenges.length === 0 && (
            <CustomText className="text-center text-red-500 mt-10">
              {error}
            </CustomText>
          )}
          {loading && userChallenges.length === 0 && (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          )}
          {userChallenges.length > 0 && (
            <View>
              <ScrollView className="max-h-[74%] pb-96">
                {userChallenges.map((challenge) => {
                  return (
                    <View
                      key={challenge.id}
                      className="flex-row items-center p-3 px-4 rounded-lg border-b border-gray-300"
                    >
                      <View className="flex-row">
                        <Image
                          source={
                            avatars[
                              challenge.challengerAvatarId
                                ? challenge.challengerAvatarId
                                : challenge.opponentAvatarId
                            ]
                          }
                          className={`w-10 h-10 rounded-full`}
                        />
                      </View>
                      <View className={`flex-1 flex-col w-full ml-3`}>
                        <View className="w-full flex flex-row justify-between">
                          <CustomText className="text-sm text-gray-900">
                            {handleText(challenge)}
                          </CustomText>
                          {challenge.status === "pending" &&
                            challenge.opponentId === user.uid && (
                              <TouchableOpacity
                                className=" rounded-full py-2 w-24 bg-[#93D334] animate-pulse "
                                onPress={() => {
                                  handleAttemptChallenge(challenge);
                                }}
                              >
                                <CustomText className="font-semibold text-center">
                                  Attempt
                                </CustomText>
                              </TouchableOpacity>
                            )}
                        </View>

                        <View className="flex-row justify-between items-center mt-3">
                          <CustomText className="text-xs text-gray-500">
                            {formatDateOnly(challenge.timestamp)}
                          </CustomText>
                          <CustomText className="text-xs text-gray-500">
                            {formatTimeOnly(challenge.timestamp)}
                          </CustomText>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </BackgroundImage>
    </View>
  );
};

export default DisplayChallenges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
