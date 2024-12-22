import { View, Text, StatusBar, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
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

let answers = [null, null, null, null];
const screenheight = Dimensions.get("screen").height;
console.log(screenheight);

export default function Matching() {
  //Question Fetch
  const { currentIndex, questions } = useQuesStore((state) => state);

  //Component Submission States
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  //Layout Calculation / X,Y Values States
  const [matchingOptionsLayout, setMatchingOptionsLayout] = useState([]);
  const [matchingDropLayout, setMatchingDropLayout] = useState([]);
  const [matchingContainerY, setMatchingContainerY] = useState(null);
  const [answerContainerY, setAnswerContainerY] = useState(null);
  const [offsetValue, setOffsetValue] = useState(0);
  // const [answers, setAnswers] = useState(
  //   Array(4).fill({ val: "", realIndex: -1 })
  // );
  const translateValueX = options.map(() => useSharedValue(0));
  const translateValueY = options.map(() => useSharedValue(0));
  const box = useSharedValue(-1);
  const yValue = useSharedValue(0);

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        console.log(offsetValue);

        console.log(
          "DRAGY",
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y
        );

        if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 20
        ) {
          box.value = 0;
          yValue.value = -offsetValue + 3 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 47 - 20
        ) {
          box.value = 1;
          yValue.value = -offsetValue + 55 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 2 * 47 - 20
        ) {
          box.value = 2;
          yValue.value =
            -offsetValue + 2 * 53.5 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          offsetValue - 3 * 47 - 20
        ) {
          box.value = 3;
          yValue.value =
            -offsetValue + 3 * 52.5 - matchingOptionsLayout[index]?.y;
        } else {
          box.value = -1;
        }
      })
      .onEnd(() => {
        if (box.value !== -1) {
          console.log("DROPPED AT BOX", box.value);

          let ans = [...answers];
          ans[box.value] = {
            val: options[index],
            realIndex: index,
          };
          answers = ans;
          console.log(answers);

          translateValueX[index].value = withSpring(
            matchingDropLayout[0]?.x - matchingOptionsLayout[index]?.x
          );
          translateValueY[index].value = withSpring(yValue.value);
        } else {
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
              <View>
                <Text>Loading..</Text>
              </View>
            ) : (
              <>
                {/* UPPER CONTAINER */}
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  {/* Guideline */}
                  <View>
                    <Text style={styles.Text}>
                      Given a set of four mirobes and a set of four treatments,
                      match the microbe to the first line treatment:
                    </Text>
                  </View>

                  {/* Hint */}
                  <View>
                    <Text style={styles.heading}>
                      {questions[currentIndex].question}
                    </Text>
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
                    {questions[currentIndex].microbes?.map((val, index) => (
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
                    {questions[currentIndex].treatments?.map((val, index) => (
                      <GestureDetector
                        key={index}
                        gesture={panGestureHandler[index]}
                      >
                        <MatchingButton
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
                <StatusIcon text={"Amazing!"} />
                <StatusButton
                  setChecked={setChecked}
                  checked={checked}
                  setError={setError}
                  setSubmitted={setSubmitted}
                  width={"70%"}
                  text={"Continue"}
                />
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
    fontWeight: "bold",

    textAlign: "left",
    fontSize: 17,
    marginTop: 20,
    alignSelf: "center",
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "18@s",
    marginTop: 10,
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
  },
  TextMatching: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: "14@s",
    width: "50%",
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
