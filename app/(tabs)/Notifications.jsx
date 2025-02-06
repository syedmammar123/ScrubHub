import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { theme } from "@/theme";
import BackButton from "@/components/backButton";
import BackgroundImage from "@/components/backgroundImage";
import ScrubLogo from "@/components/scrubLogo";
import { ScrollView } from "react-native-gesture-handler";
import useCurrentUserStore from "@/store/currentUserStore";
import useQuesStore from "@/store/quesStore";
import { getQuestionType } from "@/util/utilQuesFunc";

const Notifications = () => {
  const { user, userNotifications } = useCurrentUserStore((state) => state);
  const router = useRouter();

  const {
    fetchChallengeFriendQuestions,
    getFriendChallengeQuestion,
    getFetchedFriendChallengeID,
    setType,
  } = useQuesStore((state) => state);

  const [error, setError] = useState(false);
  const handlePress = async (docId) => {
    setType("friendchallenge");
    const id = "5h0Ivag02puXiUaMLDmg"; // Replace ID here
    const currentChallenge = getFetchedFriendChallengeID();
    console.log("CURRENTCHALLENGE", currentChallenge);

    if (true) {
      // Add || currentChallenge!==docId in if to fetch again if same Id isnt same
      console.log("FETCHING");

      const questions = await fetchChallengeFriendQuestions(id);
      if (questions === 0) {
        console.log("YES");

        setError(true);
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
          <ScrollView>
            <TouchableOpacity
              // onPress={()=>handlePress(docId)} Send Doc ID here
              onPress={handlePress}
              style={{ backgroundColor: "red", padding: 20 }}
            >
              <Text>Get CHALLENGE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BackgroundImage>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  scrollContainer: {
    flex: 1,
  },
});
