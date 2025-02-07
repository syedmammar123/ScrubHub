import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import ScrubLogo from "@/components/scrubLogo";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetChallenges from "@/hooks/useGetChallenges";
import { avatars } from "./userInfoScreen";
import { formatDateOnly, formatTimeOnly } from "@/util/getRandomItem";
import { theme } from "@/theme";

const DisplayChallenges = () => {
  const { userChallenges, user } = useCurrentUserStore((state) => state);
  const { loading, error } = useGetChallenges();

  const handleText = (challenge) => {
    if (challenge.challengerId === user.uid) {
      return `You challenged ${challenge.opponentUsername}`;
    } else {
      return `${challenge.challengerUsername} challenged you`;
    }
  };


  console.log(userChallenges);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackgroundImage>
        <BackButton />
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          {error && userChallenges.length === 0 && (
            <Text className="text-center text-red-500 mt-10">{error}</Text>
          )}
          {loading && userChallenges.length === 0 && (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          )}
          {userChallenges.length > 0 && (
            <View>
              <ScrollView className="max-h-[74%] pb-96">
                {userChallenges.map((challenge) => (
                  <View
                    key={challenge.timestamp.nanoseconds}
                    className="flex-row items-center p-3 px-4 rounded-lg border-b border-gray-300"
                  >
                    <View className="flex-row">
                      <Image
                        source={avatars[1]}
                        className={`w-10 h-10 rounded-full`}
                      />
                    </View>
                    <View
                      className={`flex-1 flex-col w-full ml-3`}
                    >
                      <Text className="text-sm text-gray-900">
                        {handleText(challenge)}
                      </Text>
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
                ))}
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
