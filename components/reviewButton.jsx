import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  AppState,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import useQuesStore from "@/store/quesStore";
import useGetSolvedQues from "@/hooks/useGetSolvedQues";
import { getQuestionType } from "@/util/utilQuesFunc";
import CustomText from "./CustomText";
import LoadingModal from "./LoadingModal";

export default function reviewButton({ btnTitle, bgColor, nextRoute }) {
  const {
    fetchReviewQuestions,
    getCurrentType,
    setReviewAllQuestions,
    getfetchedReviewTopic,
    getReviewQuestion,
    currentIndexReview,
  } = useQuesStore((state) => state);
  const state = useGetSolvedQues();
  const [error, setError] = useState(false);
  const [isFetchingReview, setIsFetchingReview] = useState(false);

  const handlePress = async () => {
    if (error) {
      setError(false);
    }

    setIsFetchingReview(true);
    if (getCurrentType() === "review") {
      if (getfetchedReviewTopic() === "reviewall") {
        const nextScreen = getQuestionType(getReviewQuestion());
        if (nextScreen === "wordscrambled") {
          const answerLength = getReviewQuestion()?.answer?.replace(
            /\s/g,
            ""
          ).length;

          router.navigate({
            pathname: nextScreen,
            params: { answerLength },
          });
          setTimeout(() => setIsFetchingReview(false), 300);
        } else {
          // setIsFetchingReview(false);
          router.navigate(nextScreen);
          setTimeout(() => setIsFetchingReview(false), 300);
        }
        console.log("NEXT SCREEN", nextScreen);
        // Questions Already Fetched
      } else {
        const questions = await state.fetchRandomQues();
        if (questions.length === 0) {
          setError(true);
          // setIsFetchingReview(false);
          return;
        }
        setReviewAllQuestions(questions);
        const nextScreen = getQuestionType(questions[0]);

        if (nextScreen === "wordscrambled") {
          const answerLength = getReviewQuestion()?.answer?.replace(
            /\s/g,
            ""
          ).length;

          router.navigate({
            pathname: nextScreen,
            params: { answerLength },
          });
          setTimeout(() => setIsFetchingReview(false), 300);
        } else {
          router.navigate(nextScreen);
          setTimeout(() => setIsFetchingReview(false), 300);
        }
        console.log("NEXT SCREEN", nextScreen);
      }
    }
  };
  const router = useRouter("");

  // useEffect(() => {
  //   // setIsQuestionFetching(false);

  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (nextAppState === "active") {
  //       setIsFetchingReview(false); // Reset when app returns
  //     }
  //   });

  //   return () => subscription.remove();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      setIsFetchingReview(false);
    }, [])
  );
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        disabled={isFetchingReview}
        onPress={() => {
          if (nextRoute === "reviewall") {
            handlePress();
          } else {
            router.navigate(nextRoute);
          }
        }}
      >
        <View style={[styles.buttonCircleStyle, { backgroundColor: bgColor }]}>
          <MaterialIcons name="reviews" size={40} color="black" />
        </View>
        <View style={[styles.lowerBox, { backgroundColor: bgColor }]}>
          <CustomText style={styles.buttonText}>{btnTitle}</CustomText>
        </View>
      </TouchableOpacity>
      {/* Error Modal */}

      <LoadingModal
        setIsQuestionFetching={setIsFetchingReview}
        isQuestionFetching={isFetchingReview}
        error={error}
        errorMsg={
          "Error fetching questions. No questions available at the moment."
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -25,
    zIndex: 1,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 35,
  },

  lowerBox: {
    width: 350,
    borderWidth: 1,
    height: 95,
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colorBlack,
    // fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Poppins-Semi",
  },
  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker background overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10, // For Android shadow
  },

  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
    marginTop: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
});
