import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
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

export default function Matching() {
  const [matchingOptionsLayout, setMatchingOptionsLayout] = useState([]);
  const [matchingDropLayout, setMatchingDropLayout] = useState([]);
  // const [answers, setAnswers] = useState(
  //   Array(4).fill({ val: "", realIndex: -1 })
  // );
  const translateValueX = options.map(() => useSharedValue(0));
  const translateValueY = options.map(() => useSharedValue(0));
  const box = useSharedValue(-1);
  const yValue = useSharedValue(0);
  console.log(answers);

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          200
        ) {
          box.value = 0;
          yValue.value = -246.5 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          150
        ) {
          box.value = 1;
          yValue.value = -181 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          90
        ) {
          box.value = 2;
          yValue.value = -118 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          40
        ) {
          box.value = 3;
          yValue.value = -55 - matchingOptionsLayout[index]?.y;
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
            200 - matchingOptionsLayout[index]?.x,
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
                <Text style={styles.heading}>Microbe First-Line Treatment</Text>
              </View>

              {/* Input Of Word  */}
              <View style={styles.matchablesContainer}>
                {toMatch.map((val, index) => (
                  <View style={styles.row} key={index}>
                    <Text style={styles.TextMatching}>{val}</Text>

                    {/* Drop Box */}
                    <MatchingDropBox
                      index={index}
                      setMatchingDropLayout={setMatchingDropLayout}
                    />
                  </View>
                ))}
              </View>

              <View style={styles.answerBtnContainer}>
                {options.map((val, index) => (
                  <GestureDetector
                    key={index}
                    gesture={panGestureHandler[index]}
                  >
                    <MatchingButton
                      title={val}
                      AnimatedStyle={AnimatedStyle}
                      index={index}
                      setMatchingOptionsLayout={setMatchingOptionsLayout}
                    />
                  </GestureDetector>
                ))}
              </View>
            </View>
            {/* LOWER CONTAINER */}
            <View>
              {/* Button */}
              <View style={styles.btncontainer}>
                <StatusIcon text={"Amazing!"} />
                <StatusButton text={"Continue"} />
              </View>
            </View>
          </View>
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
    fontSize: 24,
    marginTop: 10,
    marginBottom: 50,
  },
  matchablesContainer: {
    width: "95%",
    justifyContent: "space-between",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TextMatching: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 17,
    width: "50%",
  },

  answerBtnContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
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
