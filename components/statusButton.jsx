import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { getQuestionType } from "@/util/utilQuesFunc";
import useQuesStore from "@/store/quesStore";
import useChallengeFriend from "@/hooks/useChallengeFriend";
import CustomText from "./CustomText";

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
  setIsQuestionFetching,
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
    currentFriendChallengeId,
    currentChallengerId,
    currentFriendChallengeScore,
    currentOpponentScore,
    clearFields,
    clearFieldsAfterAttempt,
    clearReviewFields,
    clearFieldsAfterChallengeFriend,
    increaseChallengingFriendsIndex,
    increaseChallengingFriendsScore,
    getChallengingFriendsQuestion,
    challengingFriendsIndex,
    submitChallengingFriend,
    challengingFriendsQuestions,
    getChallengingScore,
    getOpponentID,
    getChallengingFriendsAllQuestion,
  } = useQuesStore((state) => state);
  const router = useRouter();

  const { challengeFriend, challengeCompleted } = useChallengeFriend();

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
            const answerLength = getReviewQuestion()?.answer?.replace(
              /\s/g,
              ""
            ).length;

            router.replace({
              pathname: nextScreen,
              params: { answerLength },
            });
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          if (scoreIncrease) {
            increaseReviewScore();
          }

          await submitReviews();

          // Logic to submit Questions
          router.replace("reviewScoreScreen");

          // clearReviewFields();
        }
      } else if (getCurrentType() === "study") {
        console.log("After Pressing Cont", currentIndex);

        if (currentIndex + 1 < 15) {
          if (scoreIncrease) {
            increaseScore();
          }
          increaseCurrentIndex();
          const nextScreen = getQuestionType(getCurrentQuestion());

          if (nextScreen === "wordscrambled") {
            const answerLength = getCurrentQuestion()?.answer?.replace(
              /\s/g,
              ""
            ).length;
            // router.replace({
            //   pathname: "wordscramblereview",
            //   params: { answerLength },
            // });
            router.replace({
              pathname: nextScreen,
              params: { answerLength },
            });
          } else {
            router.replace(nextScreen);
          }
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseScore();
          }

          await submitQuestions();

          router.replace("scoreScreen");
        }
      } else if (getCurrentType() === "challenge") {
        console.log("After Pressing Cont", currentChallengeIndex);
        if (currentChallengeIndex + 1 < 15) {
          if (scoreIncrease) {
            increaseChallengeScore();
          }
          increaseCurrentChallengeIndex();
          const nextScreen = getQuestionType(getChallengeQuestion());
          if (nextScreen === "wordscrambled") {
            const answerLength = getChallengeQuestion()?.answer?.replace(
              /\s/g,
              ""
            ).length;

            router.replace({
              pathname: nextScreen,
              params: { answerLength },
            });
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
          router.replace("challengeLeaderboard");
        }
      } else if (getCurrentType() === "friendchallenge") {
        console.log("After Pressing Cont", currentChallengeIndex);
        if (currentFriendChallengeIndex + 1 < 15) {
          if (scoreIncrease) {
            increaseFriendChallengeScore();
          }
          increaseFriendChallengeIndex();
          const nextScreen = getQuestionType(getFriendChallengeQuestion());
          if (nextScreen === "wordscrambled") {
            const answerLength = getFriendChallengeQuestion()?.answer?.replace(
              /\s/g,
              ""
            ).length;

            router.replace({
              pathname: nextScreen,
              params: { answerLength },
            });
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseFriendChallengeScore();
          }
          await challengeCompleted(
            currentFriendChallengeId,
            currentChallengerId,
            currentFriendChallengeScore,
            currentOpponentScore
          );

          router.replace("scoreScreen");
          clearFieldsAfterAttempt();
        }
      } else if (getCurrentType() === "ChallengingFriends") {
        console.log("After Pressing Cont", challengingFriendsIndex);
        if (challengingFriendsIndex + 1 < 15) {
          if (scoreIncrease) {
            increaseChallengingFriendsScore();
          }
          increaseChallengingFriendsIndex();
          const nextScreen = getQuestionType(getChallengingFriendsQuestion());
          if (nextScreen === "wordscrambled") {
            const answerLength =
              getChallengingFriendsQuestion()?.answer?.replace(
                /\s/g,
                ""
              ).length;

            router.replace({
              pathname: nextScreen,
              params: { answerLength },
            });
          } else {
            router.replace(nextScreen);
          }
          console.log("Navigating to:", nextScreen);
        } else {
          // Logic to submit Questions
          if (scoreIncrease) {
            increaseChallengingFriendsScore();
          }

          // SUBMIT FUNCTION CALL HERE
          // await submitChallengingFriend();
          challengeFriend(
            getOpponentID(),
            getChallengingScore(),
            getChallengingFriendsAllQuestion()
          );

          router.replace("scoreScreen");
          clearFieldsAfterChallengeFriend();
        }
      }
    }
  };
  const handlePressType = () => {
    if (type === "home") {
      router.replace("/");
    } else if (type === "backTopics") {
      setIsQuestionFetching(false);
    } else {
      handlePress();
    }
  };
  return (
    <View style={[styles.container, { width: width }]}>
      <TouchableOpacity onPress={handlePressType} style={styles.btn}>
        <CustomText style={styles.text}>{text}</CustomText>
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
