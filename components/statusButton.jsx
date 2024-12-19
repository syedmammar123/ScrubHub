import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { getQuestionType } from "@/util/utilQuesFunc";
import useQuesStore from "@/store/quesStore";

export default function StatusButton({
  setSubmitted,
  setError,
  selected,
  text,
  width,
}) {
  // const {increaseCurrentIndex,questions,currentIndex} = useQuesStore((state) => state.increaseCurrentIndex);
  // const { increaseCurrentIndex, questions, currentIndex } = useQuesStore(
  //   (state) => state
  // );
  // const router = useRouter();
  // console.log("Before Pressing Cont", currentIndex);
  const { questions, increaseCurrentIndex, currentIndex } = useQuesStore(
    (state) => state
  );
  const router = useRouter();
  // useEffect(() => {
  //   if (currentIndex < 8) {
  //     const nextScreen = getQuestionType(questions[currentIndex + 1]);
  //     console.log("Navigating to:", nextScreen);
  //     router.navigate(nextScreen);
  //   } else {
  //     router.navigate("/");
  //   }
  // }, [currentIndex]);

  const handlePress = () => {
    setSubmitted(true);
    // console.log("After Pressing Cont", currentIndex);
    if (currentIndex + 1 < 9) {
      increaseCurrentIndex();
      const nextScreen = getQuestionType(questions[currentIndex + 1]);
      console.log("Navigating to:", nextScreen);
      // router.navigate(nextScreen);
      router.replace(nextScreen);
    } else {
      router.navigate("/");
    }

    // const nextScreen = getQuestionType();
    // router.navigate(nextScreen);
    // if (selected === "") {
    //   setError(true);
    // } else {
    //   setError(false);
    // }
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
