import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { getQuestionType } from "@/util/utilQuesFunc";
import useQuesStore from "@/store/quesStore";

const checkAnswerArray = (selected) => {
  for (let i = 0; i < selected.length; i++) {
    if (selected[i] === -1) {
      return false;
    }
  }
  return true;
};
const checkAnswerArray2 = (selected) => {
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].value === -1) {
      return false;
    }
  }
  return true;
};

const checkAnswerArray3 = (selected) => {
  for (let i = 0; i < selected.length; i++) {
    if (selected[i].val === "") {
      return false;
    }
  }
  return true;
};

export default function StatusButton({
  setSubmitted,
  setError,
  selected,
  text,
  width,
  setChecked,
  checked,
  questionType,
  scoreIncrease,
  type, // To Go next after seeing score
}) {
  const {
    getReviewQuestion,
    getCurrentQuestion,
    increaseCurrentIndex,
    currentIndex,
    currentIndexReview,
    increaseCurrentReviewIndex,
    getCurrentType,
    increaseScore,
    submitQuestions,
    increaseCurrentChallengeIndex,
    getChallengeQuestion,
    currentChallengeIndex,
    submitChallengeQuestions,
    increaseChallengeScore,
    submitReviews,
    getfetchedQuestionTopic,
    getfetchedQuestionSystem,
    getfetchedReviewTopic,
    increaseReviewScore,
    currentFriendChallengeIndex,
    increaseFriendChallengeScore,
    increaseFriendChallengeIndex,
    getFriendChallengeQuestion,
    submitFriendChallenge,
  } = useQuesStore((state) => state);
  const router = useRouter();

  const handlePress = async () => {
    console.log("Type", questionType);

    if (!checked) {
      if (
        (questionType === "fourOpt" && selected === "") ||
        (questionType === "matching" && checkAnswerArray(selected) === false) ||
        (questionType === "multipleOpt" && selected.length === 0) ||
        (questionType === "wordscramble" &&
          checkAnswerArray2(selected) === false) ||
        (questionType === "incomplete" && checkAnswerArray3(selected) === false)
      ) {
        setError(true);
      } else {
        setError(false);
        setChecked(true);
      }
    } else {
      setSubmitted(true);
      if (getCurrentType() === "review") {
        console.log("After Pressing Cont", currentIndexReview);
        if (currentIndexReview + 1 < 15) {
          if (scoreIncrease) {
            increaseReviewScore();
          }
          increaseCurrentReviewIndex();
          const nextScreen = getQuestionType(getReviewQuestion());
          if (nextScreen === "wordscrambled") {
            router.replace("wordscramblereview");
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          if (scoreIncrease) {
            increaseReviewScore();
          }

          if (getfetchedReviewTopic() !== "reviewall") {
            await submitReviews();
          }
          // Logic to submit Questions
          router.navigate("reviewScoreScreen");
        }
      } else if (getCurrentType() === "study") {
        console.log("After Pressing Cont", currentIndex);
        if (currentIndex + 1 < 15) {
          if (scoreIncrease) {
            increaseScore();
          }
          increaseCurrentIndex();
          const nextScreen = getQuestionType(getCurrentQuestion());
          console.log("Navigating to:", nextScreen);

          router.replace(nextScreen);
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseScore();
          }
          const system = `${getfetchedQuestionSystem()}all`;
          const topic = getfetchedQuestionTopic();
          if (topic !== system) {
            await submitQuestions();
          }

          router.navigate("scoreScreen");
        }
      } else if (getCurrentType() === "challenge") {
        console.log("After Pressing Cont", currentChallengeIndex);
        if (currentChallengeIndex + 1 < 9) {
          if (scoreIncrease) {
            increaseChallengeScore();
          }
          increaseCurrentChallengeIndex();
          const nextScreen = getQuestionType(getChallengeQuestion());
          if (nextScreen === "wordscrambled") {
            router.replace("wordscrambledchallenge");
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseChallengeScore();
          }
          await submitChallengeQuestions();
          router.navigate("challengeLeaderboard");
        }
      } else if (getCurrentType() === "friendchallenge") {
        console.log("After Pressing Cont", currentChallengeIndex);
        if (currentFriendChallengeIndex + 1 < 5) {
          if (scoreIncrease) {
            increaseFriendChallengeScore();
          }
          increaseFriendChallengeIndex();
          const nextScreen = getQuestionType(getFriendChallengeQuestion());
          if (nextScreen === "wordscrambled") {
            router.replace("wordscrambledfriendchallenge");
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseFriendChallengeScore();
          }
          await submitFriendChallenge();
          // router.navigate("challengeLeaderboard");
          router.navigate("scoreScreen");
        }
      }
    }
  };
  return (
    <View style={[styles.container, { width: width }]}>
      <TouchableOpacity
        onPress={
          type === "home"
            ? () => {
                router.navigate("/");
              }
            : handlePress
        }
        style={styles.btn}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled style={styles.lowerbox}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: theme.barColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 10,
  },
  text: {
    // fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Poppins-Semi",
  },
  lowerbox: {
    position: "absolute",
    bottom: -4,
    backgroundColor: "#7CBD2D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 1,
  },
});
