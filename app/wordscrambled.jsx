import { View, Text, StatusBar, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";
import InputBox from "@/components/inputBox";
import BlankInput from "@/components/blankInput";
import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useQuesStore from "@/store/quesStore";

let boxesPerLine;
const screenWidth = Dimensions.get("window").width;
const containerWidth = screenWidth * 0.95;

function calcLines(totalBoxes) {
  const boxWithGap = 50 + 15; // Box width + column Gap
  boxesPerLine = Math.floor(containerWidth / boxWithGap);
  if (boxesPerLine === 0) return totalBoxes;
  const lines = Math.ceil(totalBoxes / boxesPerLine);

  return lines;
}

export default function WordScrambled() {
  //Question Fetch
  const { currentIndex, questions } = useQuesStore((state) => state);

  // Answer Length & NOofLines States
  const answerLength = useMemo(() => {
    return questions[currentIndex]?.answer?.split(" ").join("").length;
  }, [questions[currentIndex].answer]);
  const answer = useMemo(() => {
    return questions[currentIndex]?.answer?.split(" ").join("").toLowerCase();
  }, [questions[currentIndex].answer]);
  const noflines = useMemo(() => {
    return calcLines(answerLength);
  }, []);

  // Submission States
  const [answerCalculated, setAnswerCalculated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isMatchesCorrect, setIsMatchesCorrect] = useState(null);
  const [selected, setSelected] = useState(
    Array(answerLength).fill({ value: -1, realIndex: -1 })
  );

  console.log("Selected", selected);

  // Drag drop functions/ Values
  const translateValueX = questions[currentIndex]?.letterChoices?.map(() =>
    useSharedValue(0)
  );
  const translateValueY = questions[currentIndex]?.letterChoices?.map(() =>
    useSharedValue(0)
  );
  const [letterLayout, setLetterLayout] = useState([]);

  const [blankInputLayout, setBlankInputLayout] = useState(
    Array(answerLength).fill(null)
  );

  const line = useSharedValue(-1);
  const ytranslated = useSharedValue(-1);

  const updatedAnswers = (index, realindex, value) => {
    setSelected((prev) => {
      const updated = [...prev];
      updated[index] = { value: value, realIndex: realindex };
      return updated;
    });
  };

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        if (translateValueY[index].value > 0) {
          line.value = -1;
        } else if (noflines === 1) {
          line.value = 1;
          ytranslated.value = -55 - letterLayout[index]?.y;
        } else if (noflines === 2) {
          if (0 - translateValueY[index].value - letterLayout[index]?.y > 115) {
            line.value = 1;
            ytranslated.value = -129 - letterLayout[index]?.y;
          } else {
            line.value = 2;
            ytranslated.value = -55 - letterLayout[index]?.y;
          }
        } else if (noflines === 3) {
          line.value = -1;
          if (0 - translateValueY[index].value - letterLayout[index]?.y > 182) {
            line.value = 1;
            ytranslated.value = -205 - letterLayout[index]?.y;
          } else if (
            0 - translateValueY[index].value - letterLayout[index]?.y >
            115
          ) {
            line.value = 2;
            ytranslated.value = -129 - letterLayout[index]?.y;
          } else {
            line.value = 3;
            ytranslated.value = -55 - letterLayout[index]?.y;
          }
        }
      })
      .onEnd((event) => {
        const draggedX = letterLayout[index]?.x + event.translationX;

        let isDropped = false;
        if (line.value !== -1) {
          for (
            let i = (line.value - 1) * boxesPerLine;
            i < line.value * boxesPerLine;
            i++
          ) {
            const blank = blankInputLayout[i];

            if (
              blank &&
              draggedX >= blank.x - 5 &&
              draggedX + letterLayout[index]?.width <=
                blank.x + blank.width + 10
            ) {
              isDropped = true;
              let presentBox = selected[i];
              console.log(presentBox);

              // For Swapping boxes
              if (selected[i].value !== -1) {
                console.log("YES");
                console.log("Index", index);

                translateValueX[selected[i].realIndex].value = withSpring(0);
                translateValueY[selected[i].realIndex].value = withSpring(0);
              }
              runOnJS(updatedAnswers)(
                i,
                index,
                questions[currentIndex].letterChoices[index]
              );

              translateValueY[index].value = withSpring(ytranslated.value);

              //X Value For TranslateX,(Y Comes from Lines)
              const ival = (line.value - 1) * boxesPerLine;
              const off = i - ival;
              const val = 5 + off * 65;

              translateValueX[index].value = withSpring(
                val - letterLayout[index]?.x + 10
              );

              break;
            }
          }
        }

        if (!isDropped) {
          console.log("DETECTED AFTER BOX DROPPPED");
          let i;
          let flag = false;

          for (i = 0; i < answerLength; i++) {
            if (index === selected[i].realIndex) {
              flag = true;
              break;
            }
          }

          if (flag) {
            runOnJS(updatedAnswers)(i, -1, -1);
          }

          translateValueX[index].value = withSpring(0);
          translateValueY[index].value = withSpring(0);
        }
      });
  };

  const panGestureHandler = questions[currentIndex]?.letterChoices?.map(
    (_, index) => CreatePanGesture(index)
  );

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
    if (checked) {
      console.log("Checking");

      let flag = false;
      const selectedString = selected.reduce((array, curr, index) => {
        let val = curr.value.toLowerCase();
        console.log(val);

        if (val === answer[index]) {
          array.push({
            value: val,
            realIndex: curr.realIndex,
            backgroundColor: theme.barColor,
          });
          return array;
        } else {
          flag = true;
          array.push({
            value: val,
            realIndex: curr.realIndex,
            backgroundColor: "#EF5555",
          });
          return array;
        }
      }, []);

      console.log("Selected", selectedString);
      const selectedIndices = selectedString.map((item) => item.realIndex);
      const missingIndices = questions[currentIndex]?.letterChoices?.reduce(
        (array, _, index) => {
          if (!selectedIndices.includes(index)) {
            array.push(index);
          }
          return array;
        },
        []
      );

      console.log("MISSING", missingIndices);
      const missingArray = missingIndices.map((item) => {
        return {
          realIndex: item,
          backgroundColor: "white",
          value: questions[currentIndex]?.letterChoices[item],
        };
      });

      console.log("MISSINGARRAY", missingArray);
      console.log([...selectedString, ...missingArray]);
      const sortedArray = [...selectedString, ...missingArray].sort(
        (a, b) => a.realIndex - b.realIndex
      );
      console.log("Sorted Array", sortedArray);

      setSelected(sortedArray);

      // setFinalAnswer(finalIndices);
      if (flag) {
        setIsMatchesCorrect(false);
      } else {
        setIsMatchesCorrect(true);
      }
      setAnswerCalculated(true);
    }
  }, [checked]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      {/* Status Of Questions BAR */}
      <UpperBar />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            {/* UPPER CONTAINER */}
            {submitted ? (
              <View>
                <Text>Loading..</Text>
              </View>
            ) : (
              <>
                {/* UPPER CONTAINER */}
                <View>
                  {/* Guideline */}
                  <View>
                    <Text style={styles.guideline}>
                      Given a hint with a series of empty spaces and{" "}
                      {questions[currentIndex]?.letterChoices?.length} letter
                      options, find out which word/term is being hinted at
                    </Text>
                  </View>

                  {/* Hint */}
                  <View>
                    <Text style={styles.guideline}>
                      {questions[currentIndex]?.hint}
                    </Text>
                  </View>

                  {/* Blanks */}
                  <View style={styles.inputContainer}>
                    {blankInputLayout.map((_, index) => (
                      <BlankInput
                        checked={checked}
                        key={index}
                        setBlankInputLayout={setBlankInputLayout}
                        index={index}
                      />
                    ))}
                  </View>

                  {/* Letters to Choose */}
                  <View style={styles.lettersContainer}>
                    {questions[currentIndex]?.letterChoices?.map(
                      (val, index) => (
                        <GestureDetector
                          key={index}
                          gesture={panGestureHandler[index]}
                        >
                          <InputBox
                            answerCalculated={answerCalculated}
                            bgColor={
                              !answerCalculated
                                ? "white"
                                : selected[index].backgroundColor
                            }
                            letter={val}
                            setLetterLayout={setLetterLayout}
                            index={index}
                            AnimatedStyle={AnimatedStyle}
                          />
                        </GestureDetector>
                      )
                    )}
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
                      isMatchesCorrect
                        ? "Amazing!"
                        : `${questions[currentIndex]?.answer}`
                    }
                  />
                ) : (
                  <StatusIcon icon="none" text={""} />
                )}

                {checked ? (
                  <StatusButton
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
                    questionType={"wordscramble"}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  guideline: {
    fontWeight: "bold",
    width: "95%",
    textAlign: "left",
    fontSize: 17,
    marginTop: 20,
    alignSelf: "center",
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

    rowGap: 15,
  },
  lettersContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    columnGap: 14,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
});
