import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";
import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import MatchingButton from "@/components/matchingButton";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MatchingDropBox from "@/components/matchingDropBox";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";
import useQuesStore from "@/store/quesStore";

let options = [
  "1. Vancomycin",
  "2. Penicillin",
  "3. Oral Vancomycin",
  "4. Ceftriaxone",
];

let toMatch = [
  "A. Methicillin-Resistant S. Aureus (MRSA)",
  "B. Streptococcus pneumoniae",
  "C. Clostridium difficile",
  "D. Neisseria meningitidis",
];

const screenheight = Dimensions.get("screen").height;
console.log(screenheight);

export default function Matching() {
  //Question Fetch
  const {
    getReviewQuestion,
    getCurrentQuestion,
    getCurrentType,
    getChallengeQuestion,
    getFriendChallengeQuestion,
  } = useQuesStore((state) => state);

  const [question, setQuestion] = useState({});
  const [questionOptions, setQuestionOptions] = useState([]);
  // Answer States
  const [answers, setAnswers] = useState(Array(4).fill(-1));

  //Component Submission States
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isMatchesCorrect, setIsMatchesCorrect] = useState(true);

  //Layout Calculation / X,Y Values States
  const [matchingOptionsLayout, setMatchingOptionsLayout] = useState([]);
  const [matchingDropLayout, setMatchingDropLayout] = useState([]);
  const [matchingContainerY, setMatchingContainerY] = useState(null);
  const [answerContainerY, setAnswerContainerY] = useState(null);
  const [offsetValue, setOffsetValue] = useState(0);
  const translateValueX = options.map(() => useSharedValue(0));
  const translateValueY = options.map(() => useSharedValue(0));
  const box = useSharedValue(-1);
  const yValue = useSharedValue(0);

  const updateAnswers = (index, boxValue) => {
    setAnswers((prev) => {
      const updatedAns = [...prev];
      if (index === -1) {
        updatedAns[boxValue] = -1;
      } else {
        updatedAns[boxValue] = questionOptions[index].id;
      }

      return updatedAns;
    });
  };
  console.log("0", matchingDropLayout[0]);
  console.log("1", matchingDropLayout[1]);
  console.log("2", matchingDropLayout[2]);
  console.log("3", matchingDropLayout[3]);

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        // console.log(offsetValue);

        // console.log(
        //   "DRAGY",
        //   0 - translateValueY[index].value - matchingOptionsLayout[index]?.y
        // );

        if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 20
        ) {
          box.value = 0;
          yValue.value = -offsetValue - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 47 - 20
        ) {
          box.value = 1;
          yValue.value =
            -offsetValue +
            (matchingDropLayout[0].height + matchingDropLayout[1].y + 10) -
            matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 2 * 47 - 20
        ) {
          box.value = 2;
          yValue.value =
            -offsetValue +
            (matchingDropLayout[0].height + matchingDropLayout[1].height + 20) -
            matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 3 * 47 - 20
        ) {
          box.value = 3;
          yValue.value =
            -offsetValue +
            (matchingDropLayout[0].height +
              matchingDropLayout[1].height +
              matchingDropLayout[2].height +
              matchingDropLayout[3].y +
              30) -
            matchingOptionsLayout[index]?.y;
        } else {
          box.value = -1;
        }
      })
      .onEnd(() => {
        if (box.value !== -1) {
          console.log("DROPPED AT BOX", box.value);
          // Checking if box has value Already
          let presentBox = answers[box.value];
          if (presentBox !== -1) {
            translateValueX[presentBox].value = withSpring(0);
            translateValueY[presentBox].value = withSpring(0);
          }
          runOnJS(updateAnswers)(index, box.value);

          translateValueX[index].value = withSpring(
            matchingDropLayout[0]?.x - matchingOptionsLayout[index]?.x
          );
          translateValueY[index].value = withSpring(yValue.value);
        } else {
          console.log("DETECTED AFTER BOX DROPPPED");
          let i;
          let flag = false;
          for (i = 0; i < 4; i++) {
            if (index === answers[i]) {
              flag = true;
              break;
            }
          }
          if (flag) {
            runOnJS(updateAnswers)(-1, answers[i]);
          }
          translateValueX[index].value = withSpring(0);
          translateValueY[index].value = withSpring(0);
        }
      });
  };
  const panGestureHandler = options.map((_, index) => CreatePanGesture(index));

  const AnimatedStyle = (index) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateValueX[index].value },
          { translateY: translateValueY[index].value },
        ],
      };
    });

  useEffect(() => {
    if (checked && question?.correctMatches) {
      console.log(questionOptions);

      const correctAnswersfromDB = question.correctMatches;
      const correctKeys = Object.keys(question.correctMatches).sort();

      let correctAnswers = correctKeys.map((key) => correctAnswersfromDB[key]);
      // let correctAnswers = Object.values(question.correctMatches);
      console.log(correctAnswers);
      console.log(answers);

      const updatedAnswers = answers.map((val, index) => {
        if (val === correctAnswers[index]) {
          return val;
        } else {
          setIsMatchesCorrect(false);
          return -1;
        }
      });
      console.log(updatedAnswers);

      setAnswers(updatedAnswers);
    }
  }, [checked]);

  useEffect(() => {
    let q = {};
    if (
      getReviewQuestion()?.questionStyle === "matchTheMicrobe" ||
      getCurrentQuestion()?.questionStyle === "matchTheMicrobe" ||
      getChallengeQuestion()?.questionStyle === "matchTheMicrobe" ||
      getFriendChallengeQuestion()?.questionStyle === "matchTheMicrobe"
    ) {
      if (getCurrentType() === "review") {
        q = getReviewQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "study") {
        q = getCurrentQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "challenge") {
        q = getChallengeQuestion();
        setQuestion(q);
      } else if (getCurrentType() === "friendchallenge") {
        q = getFriendChallengeQuestion();
        setQuestion(q);
      }
      if (q.treatments.length < 4) {
        const matches = Object.values(q.correctMatches);
        let arr = [];
        for (let i = 0; i < q.treatments.length; i++) {
          const count = matches.filter(
            (id) => id === q.treatments[i].id
          ).length;
          console.log("Count of ", q.treatments[i].id, count);

          for (let j = 0; j < count; j++) {
            arr.push({ id: q.treatments[i].id, name: q.treatments[i].name });
          }
        }
        console.log("New Options", arr);

        setQuestionOptions(arr);
      } else {
        setQuestionOptions(q.treatments);
      }
    }
  }, []);
  useEffect(() => {
    if (matchingContainerY !== null && answerContainerY !== null) {
      setOffsetValue(answerContainerY - matchingContainerY);
    }
  }, [matchingContainerY, answerContainerY]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />

      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              width: "95%",
              alignSelf: "center",
            }}
          >
            {submitted ? (
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
            ) : (
              <>
                {/* UPPER CONTAINER */}
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  {/* Guideline */}
                  {/* <View>
                    Instruction Remove 
                    <Text style={styles.Text}>
                      Given a set of four mirobes and a set of four treatments,
                      match the microbe to the first line treatment:
                    </Text>
                  </View> */}

                  {/* Hint */}
                  <View>
                    <Text style={styles.heading}>{question?.question}</Text>
                  </View>

                  {/* Input Of Word  */}
                  <View
                    onLayout={(e) => {
                      console.log(
                        "Starting of Matching Container",
                        e.nativeEvent.layout.y
                      );
                      setMatchingContainerY(e.nativeEvent.layout.y);
                    }}
                    style={styles.matchablesContainer}
                  >
                    {question.microbes?.map((val, index) => (
                      <View style={styles.row} key={val.id}>
                        <Text style={styles.TextMatching}>
                          {val.id + "." + val.name}
                        </Text>

                        {/* Drop Box */}
                        <MatchingDropBox
                          index={index}
                          setMatchingDropLayout={setMatchingDropLayout}
                        />
                      </View>
                    ))}
                  </View>

                  <View
                    onLayout={(e) => {
                      console.log(
                        "Starting of Buttons Container",
                        e.nativeEvent.layout.y
                      );
                      setAnswerContainerY(e.nativeEvent.layout.y);
                    }}
                    style={styles.answerBtnContainer}
                  >
                    {questionOptions?.map((val, index) => (
                      <GestureDetector
                        key={index}
                        gesture={panGestureHandler[index]}
                      >
                        <MatchingButton
                          bgColor={
                            !checked
                              ? "#ffffff"
                              : answers[index] !== -1
                                ? theme.barColor
                                : "#EF5555"
                          }
                          title={val.name}
                          AnimatedStyle={AnimatedStyle}
                          index={index}
                          setMatchingOptionsLayout={setMatchingOptionsLayout}
                        />
                      </GestureDetector>
                    ))}
                  </View>
                </View>
              </>
            )}

            {/* LOWER CONTAINER */}
            <View>
              {/* Button */}
              <View style={[styles.btncontainer, { rowGap: 15 }]}>
                {error ? (
                  <StatusIcon
                    icon="cancel"
                    text={"All Boxes should be filled!"}
                  />
                ) : (
                  <StatusIcon icon="none" text={""} />
                )}
                {checked && !error ? (
                  <StatusIcon
                    icon={isMatchesCorrect ? "correct" : "cancel"}
                    text={
                      isMatchesCorrect ? "Correct Matches!" : "Wrong Matches!"
                    }
                  />
                ) : (
                  <StatusIcon icon="none" text={""} />
                )}

                {checked ? (
                  <StatusButton
                    setError={setError}
                    selected={answers}
                    scoreIncrease={isMatchesCorrect}
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
                    selected={answers}
                    setSubmitted={setSubmitted}
                    text={"Submit"}
                    questionType={"matching"}
                    width={"60%"}
                  />
                )}
              </View>
            </View>
          </View>
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  Text: {
    // fontWeight: "bold",
    fontFamily: "Poppins-Semi",
    textAlign: "left",
    fontSize: 17,
    marginTop: 20,
    alignSelf: "center",
  },
  heading: {
    fontFamily: "Poppins-Semi",
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: "15@s",
    marginTop: 60,
    marginBottom: 0,
  },
  matchablesContainer: {
    width: "95%",
    justifyContent: "space-between",
    rowGap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 37,
  },
  TextMatching: {
    // fontWeight: "bold",
    textAlign: "left",
    fontSize: "12@s",
    width: "50%",
    fontFamily: "Poppins-Semi",
  },

  answerBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 15,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    columnGap: 15,
  },
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
  dropBox: {},
});
