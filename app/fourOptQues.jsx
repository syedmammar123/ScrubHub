import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScrubLogo from "@/components/scrubLogo";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import QuestionOption from "@/components/questionOption";
import StatusButton from "@/components/statusButton";
import useQuesStore from "@/store/quesStore";
import UpperBar from "@/components/upperBar";
import StatusIcon from "@/components/statusIcon";
import CustomText from "@/components/CustomText";

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
let bgColors = ["#0038FF", "#00C2FF", "#FFA500", "#9747FF"];

const types = {
  1: "quickDiagnosis",
  4: "shortFacts",
  7: "firstLineTreatment",
  8: "lab",
  9: "testToOrder",
};

export default function fourOptQues() {
  const {
    getReviewQuestion,
    getCurrentQuestion,
    getCurrentType,
    getChallengeQuestion,
    getFriendChallengeQuestion,
  } = useQuesStore((state) => state);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState({
    options: [],
    question: "",
    answer: "",
  });
  useEffect(() => {
    let q = {};
    if (
      getReviewQuestion()?.questionStyle === types[1] ||
      getChallengeQuestion()?.questionStyle === types[1] ||
      getCurrentQuestion()?.questionStyle === types[1] ||
      getFriendChallengeQuestion()?.questionStyle === types[1] ||
      getReviewQuestion()?.questionStyle === types[4] ||
      getChallengeQuestion()?.questionStyle === types[4] ||
      getCurrentQuestion()?.questionStyle === types[4] ||
      getFriendChallengeQuestion()?.questionStyle === types[4] ||
      getReviewQuestion()?.questionStyle === types[7] ||
      getChallengeQuestion()?.questionStyle === types[7] ||
      getCurrentQuestion()?.questionStyle === types[7] ||
      getFriendChallengeQuestion()?.questionStyle === types[7] ||
      getReviewQuestion()?.questionStyle === types[8] ||
      getChallengeQuestion()?.questionStyle === types[8] ||
      getCurrentQuestion()?.questionStyle === types[8] ||
      getFriendChallengeQuestion()?.questionStyle === types[8] ||
      getReviewQuestion()?.questionStyle === types[9] ||
      getChallengeQuestion()?.questionStyle === types[9] ||
      getCurrentQuestion()?.questionStyle === types[9] ||
      getFriendChallengeQuestion()?.questionStyle === types[9]
    ) {
      if (getCurrentType() === "review") {
        q = getReviewQuestion();
        if (q?.options) {
          q.options = shuffleArray(q.options);
        }

        setQuestion(q);
        setQuestion(q);
      } else if (getCurrentType() === "study") {
        q = getCurrentQuestion();
        if (q?.options) {
          q.options = shuffleArray(q.options);
        }

        setQuestion(q);
        setQuestion(q);
      } else if (getCurrentType() === "challenge") {
        q = getChallengeQuestion();
        if (q?.options) {
          q.options = shuffleArray(q.options);
        }

        setQuestion(q);
        setQuestion(q);
      } else if (getCurrentType() === "friendchallenge") {
        q = getFriendChallengeQuestion();
        if (q?.options) {
          q.options = shuffleArray(q.options);
        }

        setQuestion(q);
        setQuestion(q);
      }
    }
  }, []);

  console.log("QUESTION", question);
  if (submitted)
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <View
          style={{
            marginTop: 100,
          }}
        >
          <BackgroundImage>
            <ScrubLogo />
            <View
              style={{
                marginTop: 150,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                style={styles.loadingIndicator}
                size={"large"}
                color={theme.barColor}
              />
            </View>
          </BackgroundImage>
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <BackButton />
      <UpperBar />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrubLogo />
          {/* {submitted ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                style={styles.loadingIndicator}
                size={"large"}
                color={theme.barColor}
              />
            </View>
          ) : ( */}
          <ScrollView style={{ paddingBottom: 20 }}>
            <View style={styles.mainContainer}>
              {/* Question */}
              <View style={styles.questionContainer}>
                <CustomText style={styles.question}>
                  {question?.question}
                </CustomText>
              </View>
              {/* OPTIONS */}
              <View style={styles.optionsContainer}>
                {question?.options.map((opt, index) => (
                  <QuestionOption
                    checked={checked}
                    key={index}
                    selected={selected}
                    setSelected={setSelected}
                    opacity={
                      !checked
                        ? 1
                        : opt === selected || opt === question.answer
                          ? 1
                          : 0.4
                    }
                    bgColor={
                      !checked
                        ? selected === opt
                          ? "white"
                          : bgColors[index]
                        : opt !== question.answer && opt !== selected
                          ? bgColors[index]
                          : selected === question.answer
                            ? theme.barColor
                            : opt === question.answer && opt !== selected
                              ? theme.barColor
                              : "#EF5555"
                    }
                    Option={`${opt}`}
                  />
                ))}
              </View>
            </View>
            <View style={{ paddingBottom: 20, rowGap: 15 }}>
              {error ? (
                <StatusIcon icon="cancel" text={"No Option Selected!"} />
              ) : (
                ""
              )}
              {checked && selected !== "" && !error ? (
                <StatusIcon
                  icon={selected === question.answer ? "correct" : "cancel"}
                  text={
                    selected === question.answer
                      ? "Correct Answer!"
                      : "Wrong Answer!"
                  }
                />
              ) : (
                ""
              )}
              {checked ? (
                <StatusButton
                  scoreIncrease={selected === question.answer}
                  setError={setError}
                  selected={selected}
                  setSubmitted={setSubmitted}
                  setChecked={setChecked}
                  checked={checked}
                  text={"Continue"}
                  width={"60%"}
                />
              ) : (
                <StatusButton
                  setChecked={setChecked}
                  checked={checked}
                  setError={setError}
                  selected={selected}
                  setSubmitted={setSubmitted}
                  text={"Submit"}
                  width={"60%"}
                  questionType={"fourOpt"}
                />
              )}
            </View>
          </ScrollView>
          {/* )} */}
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
  },
  questionContainer: {
    width: "90%",
  },
  question: {
    textAlign: "center",
    fontFamily: "Poppins-Semi",
    // fontWeight: "bold",
    fontSize: 14,
    // fontFamily: "Poppins-Regular",
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 40,
  },
});
