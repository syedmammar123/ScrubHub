import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Animated,
  Touchable,
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

  const handleText = (challenge) => {
    const isChallenger = challenge.challengerId === user.uid;
    const isOpponent = challenge.opponentId === user.uid;
    const challengerName = challenge.challengerUsername;
    const opponentName = challenge.opponentUsername;
    const { challengerScore, opponentScore, status } = challenge;

    if (status === "pending") {
      return isChallenger
        ? `You challenged ${opponentName}. Waiting for response`
        : isOpponent
          ? `${challengerName} challenged you`
          : `${challengerName} challenged you`;
    }

    const userScore = isChallenger ? challengerScore : opponentScore;
    const opponentScoreValue = isChallenger ? opponentScore : challengerScore;
    const opponentDisplayName = isChallenger ? opponentName : challengerName;

    if (userScore > opponentScoreValue) {
      return isChallenger
        ? `You won against ${opponentDisplayName}. You scored ${userScore} and ${opponentDisplayName} scored ${opponentScoreValue}`
        : `${challengerName} won against you. ${challengerName} scored ${challengerScore} and you scored ${opponentScore}`;
    } else if (userScore < opponentScoreValue) {
      return isChallenger
        ? `You lost against ${opponentDisplayName}. You scored ${userScore} and ${opponentDisplayName} scored ${opponentScoreValue}`
        : `${challengerName} lost against you. ${challengerName} scored ${challengerScore} and you scored ${opponentScore}`;
    } else {
      return isChallenger
        ? `You drew against ${opponentDisplayName}. You scored ${userScore} and ${opponentDisplayName} scored ${opponentScoreValue}`
        : `${challengerName} drew against you. ${challengerName} scored ${challengerScore} and you scored ${opponentScore}`;
    }
  };

  console.log("userChallenges", userChallenges);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackgroundImage>
        <BackButton />
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          {/* {error && userChallenges.length === 0 && (
            <Text className="text-center text-red-500 mt-10">{error}</Text>
          )}
          {loading && userChallenges.length === 0 && (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          )} */}
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
                          <Text className="text-sm text-gray-900">
                            {handleText(challenge)}
                          </Text>
                          {challenge.status === "pending" &&
                            challenge.opponentId === user.uid && (
                              <TouchableOpacity className=" rounded-full py-2 w-24 bg-[#93D334] animate-pulse ">
                                <Text className="font-semibold text-center">
                                  Attempt
                                </Text>
                              </TouchableOpacity>
                            )}
                        </View>

                        <View className="flex-row justify-between items-center mt-3">
                          <Text className="text-xs text-gray-500">
                            {formatDateOnly(challenge.timestamp)}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {formatTimeOnly(challenge.timestamp)}
                          </Text>
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
