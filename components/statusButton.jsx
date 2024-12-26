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

export default function StatusButton({
  setSubmitted,
  setError,
  selected,
  text,
  width,
  setChecked,
  checked,
  questionType,
}) {
  const { questions, increaseCurrentIndex, currentIndex } = useQuesStore(
    (state) => state
  );
  const router = useRouter();

  const handlePress = () => {
    console.log("Type", questionType);

    if (!checked) {
      if (
        (questionType === "fourOpt" && selected === "") ||
        (questionType === "matching" && checkAnswerArray(selected) === false) ||
        (questionType === "multipleOpt" && selected.length === 0) ||
        (questionType === "wordscramble" &&
          checkAnswerArray2(selected) === false)
      ) {
        setError(true);
      } else {
        setError(false);
        setChecked(true);
      }
    } else {
      setSubmitted(true);
      console.log("After Pressing Cont", currentIndex);
      if (currentIndex + 1 < 9) {
        increaseCurrentIndex();
        const nextScreen = getQuestionType(questions[currentIndex + 1]);
        console.log("Navigating to:", nextScreen);

        router.replace(nextScreen);
      } else {
        router.navigate("/");
      }
    }
  };
  return (
    <View style={[styles.container, { width: width }]}>
      <TouchableOpacity onPress={handlePress} style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lowerbox}></TouchableOpacity>
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
    fontWeight: "bold",
    fontSize: 16,
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
