import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import useCurrentUserStore from "@/store/currentUserStore";
import useGetNotifications from "@/hooks/useGetNotifications";
import { formatDateOnly, formatTimeOnly } from "@/util/getRandomItem";
import { avatars } from "../userInfoScreen";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";

const dummyNotifications = [
  {
    avatars: [1, 2],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "You have a new message from John.",
  },
  {
    avatars: [3],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "Your order has been shipped.",
  },
  {
    avatars: [2, 3],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "Reminder: Meeting scheduled for 3 PM.",
  },
  {
    avatars: [1],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "System update completed successfully.",
  },
  {
    avatars: [2],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "A new comment was added to your post.",
  },
  {
    avatars: [1, 3],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "Your password was changed successfully.",
  },
  {
    avatars: [3, 1],
    timestamp: { nanoseconds: 542000000, seconds: 1738870965 },
    text: "Your scheduled event is starting soon.",
  },
];

const NotificationsScreen = () => {
  const { userNotifications } = useCurrentUserStore((state) => state);
  const { loading, error } = useGetNotifications();
  const router = useRouter();

  const {
    fetchChallengeFriendQuestions,
    getFriendChallengeQuestion,
    getFetchedFriendChallengeID,
    setType,
  } = useQuesStore((state) => state);

  const handlePress = async (docId) => {
    setType("friendchallenge");
    const id = "5h0Ivag02puXiUaMLDmg"; // Replace ID here
    const currentChallenge = getFetchedFriendChallengeID();
    console.log("CURRENTCHALLENGE", currentChallenge);

    if (currentChallenge === "") {
      // Add || currentChallenge!==docId in if to fetch again if same Id isnt same
      console.log("FETCHING");

      let questions = await fetchChallengeFriendQuestions(id);
      if (questions === 0) {
        console.log("YES");

        // setError(true);
      } else {
        // Questions are fetched
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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackgroundImage>
        <BackButton />
        <View contentContainerStyle={styles.scrollContainer}>
          <ScrubLogo />
          {error && userNotifications.length === 0 && (
            <Text className="text-center text-red-500 mt-10">{error}</Text>
          )}
          {loading && userNotifications.length === 0 && (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
          )}
          {userNotifications.length > 0 && (
            <View>
              <ScrollView className="max-h-[74%] pb-96">
                {userNotifications.map((notification) => (
                  <View
                    key={notification.timestamp.nanoseconds}
                    className="flex-row items-center p-3 rounded-lg border-b border-gray-300"
                  >
                    <View className="flex-row">
                      {notification.avatars.map((avatar, index) => (
                        <Image
                          key={index}
                          source={avatars[avatar]}
                          className={`w-10 h-10 rounded-full ${index !== 0 ? "-ml-3" : ""}`}
                        />
                      ))}
                    </View>
                    <View
                      className={`flex-1 flex-col w-full ${notification.avatars.length > 1 ? "ml-3" : "ml-10"}`}
                    >
                      <Text className="text-sm text-gray-900">
                        {notification.text}
                      </Text>
                      <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-xs text-gray-500">
                          {formatDateOnly(notification.timestamp)}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {formatTimeOnly(notification.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
                <TouchableOpacity
                  // onPress={()=>handlePress(docId)} Send Doc ID here
                  onPress={handlePress}
                  style={{ backgroundColor: "red", padding: 20 }}
                >
                  <Text>Get CHALLENGE</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>
      </BackgroundImage>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
