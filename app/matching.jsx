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
} from "react-native-reanimated";

const options = [
  "1. Vancomycin",
  "2. Penicillin",
  "3. Oral Vancomycin",
  "4. Ceftriaxone",
];

const toMatch = [
  "A. Methicillin-Resistant S. Aureus (MRSA)",
  "B. Streptococcus pneumoniae",
  "C. Clostridium difficile",
  "D. Neisseria meningitidis",
];

export default function Matching() {
  const [matchingOptionsLayout, setMatchingOptionsLayout] = useState([]);
  const [matchingDropLayout, setMatchingDropLayout] = useState([]);
  const translateValueX = options.map(() => useSharedValue(0));
  const translateValueY = options.map(() => useSharedValue(0));
  const box = useSharedValue(-1);
  const yValue = useSharedValue(0);

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        console.log("yDrag", 0 - translateValueY[index].value);
        console.log(
          "yDrag-y",
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y
        );

        if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          200
        ) {
          box.value = 0;
          yValue.value = -236.5 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          150
        ) {
          box.value = 1;
          yValue.value = -175 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          90
        ) {
          box.value = 2;
          yValue.value = -113 - matchingOptionsLayout[index]?.y;
        } else if (
          0 - translateValueY[index].value - matchingOptionsLayout[index]?.y >
          40
        ) {
          box.value = 3;
          yValue.value = -54 - matchingOptionsLayout[index]?.y;
        } else {
          box.value = -1;
        }
      })
      .onEnd((event) => {
        const draggedX = event.translationX + matchingOptionsLayout[index]?.x;
        console.log("DraggedX", draggedX);
        if (box.value !== -1) {
          console.log("DROPPED IN BOX", box.value);
          translateValueX[index].value = withSpring(
            200 - matchingOptionsLayout[index]?.x
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
