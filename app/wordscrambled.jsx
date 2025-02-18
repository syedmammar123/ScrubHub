import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
import CustomText from "@/components/CustomText";
import ScrubLogo from "@/components/scrubLogo";
import { useLocalSearchParams } from "expo-router";

// Function to get a random letter
const getRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

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
  const { answerLength } = useLocalSearchParams(); // Retrieve parameter
  const {
    getReviewQuestion,
    getCurrentQuestion,
    getCurrentType,
    getChallengeQuestion,
    getFriendChallengeQuestion,
    getChallengingFriendsQuestion,
  } = useQuesStore((state) => state);

  const [question, setQuestion] = useState({ letterChoices: [], answer: "" });
  // const [answerLength, setAnswerLength] = useState(
  //   getCurrentQuestion()?.answer?.replace(/\s/g, "").length
  // );
  const [answer, setAnswer] = useState("");
  const [noflines, setNofLines] = useState(-1);
  const [letterChoices, setLetterChoices] = useState([]);
  const [wordCount, setWordCount] = useState(1);

  // Submission States
  const [answerCalculated, setAnswerCalculated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isMatchesCorrect, setIsMatchesCorrect] = useState(null);
  const [selected, setSelected] = useState(
    Array(Number(answerLength)).fill({ value: -1, realIndex: -1 })
  );

  console.log("Selected", selected);

  console.log(blankInputLayout);

  // Drag drop functions/ Values
  // const translateValueX = question?.letterChoices.map(() => useSharedValue(0));
  // const translateValueY = question.letterChoices.map(() => useSharedValue(0));
  // const translateValueX = getCurrentQuestion().letterChoices.map(() =>
  //   useSharedValue(0),
  // );
  // const translateValueY = getCurrentQuestion().letterChoices.map(() =>
  //   useSharedValue(0),
  // );

  const translateValueX = Array.from(
    { length: answerLength < 10 ? answerLength + 4 : answerLength },
    () => useSharedValue(0)
  );

  const translateValueY = Array.from(
    { length: answerLength < 10 ? answerLength + 4 : answerLength },
    () => useSharedValue(0)
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
  // const zIndices = Array.from(
  //   { length: answerLength < 10 ? answerLength + 4 : answerLength },
  //   () => useSharedValue(1)
  // );
  // const activeGesture = useSharedValue(-1);
  const CreatePanGesture = (index) => {
    return (
      Gesture.Pan()
        // .onStart(() => {
        //   activeGesture.value = index;
        // })
        // .onBegin(() => {

        // })
        .onUpdate((event) => {
          translateValueX[index].value = event.translationX;
          translateValueY[index].value = event.translationY;
          if (translateValueY[index].value > 0) {
            line.value = -1;
          } else if (noflines === 1) {
            line.value = 1;
            ytranslated.value = -55 - letterLayout[index]?.y;
          } else if (noflines === 2) {
            if (
              0 - translateValueY[index].value - letterLayout[index]?.y >
              115
            ) {
              line.value = 1;
              ytranslated.value = -129 - letterLayout[index]?.y;
            } else {
              line.value = 2;
              ytranslated.value = -55 - letterLayout[index]?.y;
            }
          } else if (noflines === 3) {
            line.value = -1;
            if (
              0 - translateValueY[index].value - letterLayout[index]?.y >
              182
            ) {
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
          } else if (noflines === 4) {
            console.log(
              0 - translateValueY[index].value - letterLayout[index]?.y
            );

            line.value = -1;
            if (
              0 - translateValueY[index].value - letterLayout[index]?.y >
              251
            ) {
              line.value = 1;
              ytranslated.value = -281 - letterLayout[index]?.y;
            } else if (
              0 - translateValueY[index].value - letterLayout[index]?.y >
              183
            ) {
              line.value = 2;
              ytranslated.value = -205 - letterLayout[index]?.y;
            } else if (
              0 - translateValueY[index].value - letterLayout[index]?.y >
              115
            ) {
              line.value = 3;
              ytranslated.value = -129 - letterLayout[index]?.y;
            } else {
              line.value = 4;
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
                runOnJS(updatedAnswers)(i, index, letterChoices[index]);

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
          // activeGesture.value = -1;
        })
    );
  };

  const panGestureHandler = letterChoices.map((_, index) =>
    CreatePanGesture(index)
  );

  const AnimatedStyle = (index) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateValueX[index].value },
          { translateY: translateValueY[index].value },
        ],
        // zIndex: activeGesture.value === index ? 1 : 0,
      };
    });

  useEffect(() => {
    let q = {};
    if (
      getCurrentQuestion()?.questionStyle === "scrabble" ||
      getReviewQuestion()?.questionStyle === "scrabble" ||
      getChallengeQuestion()?.questionStyle === "scrabble" ||
      getFriendChallengeQuestion()?.questionStyle === "scrabble" ||
      getChallengingFriendsQuestion()?.questionStyle === "scrabble"
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
      } else if (getCurrentType() === "ChallengingFriends") {
        q = getChallengingFriendsQuestion();
        setQuestion(q);
      }

      const ans = q?.answer?.split(" ").join("").toLowerCase();
      console.log(q?.answer?.split(" "));
      if (q?.answer?.split(" ").length > 1) {
        setWordCount(q?.answer?.split(" ").length);
      }
      setAnswer(ans);
      const letters = Array.from(ans, (letter) => letter.toUpperCase());
      if (letters.length < 10) {
        for (let i = 0; i < 4; i++) {
          letters.push(getRandomLetter());
        }
      }
      // Shuffle the array using Fisher-Yates algorithm
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
      };

      shuffleArray(letters); // Shuffle letters
      console.log("Shuffled Letters", letters);

      setLetterChoices(letters);

      const n = calcLines(answerLength);
      setNofLines(n);
    }
  }, []);
  useEffect(() => {
    if (checked) {
      console.log("Checking");

      let flag = false;
      const selectedString = selected.reduce((array, curr, index) => {
        let val = curr.value.toLowerCase();
        // let val = curr.value;
        console.log(curr);

        console.log(val);

        // console.log(val);

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
      const missingIndices = letterChoices.reduce((array, _, index) => {
        if (!selectedIndices.includes(index)) {
          array.push(index);
        }
        return array;
      }, []);

      console.log("MISSING", missingIndices);
      const missingArray = missingIndices.map((item) => {
        return {
          realIndex: item,
          backgroundColor: "white",
          value: letterChoices[item],
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
            <ScrubLogo type={null} />
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
      {/* Status Of Questions BAR */}
      <UpperBar />
      <View style={{ flex: 1 }}>
        <BackgroundImage>
          <ScrollView style={{ paddingBottom: 20 }}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              {/* UPPER CONTAINER */}

              <>
                {/* UPPER CONTAINER */}
                <View>
                  {/* Guideline */}
                  <View>
                    <CustomText style={styles.guideline}>
                      Given a hint with a series of empty spaces and{" "}
                      {question?.answer?.length} letter options, find out which
                      word/term is being hinted at
                    </CustomText>
                  </View>

                  {/* Hint */}
                  <View>
                    <CustomText style={styles.guideline}>
                      {question?.hint}
                    </CustomText>
                  </View>

                  {wordCount > 1 && (
                    <View>
                      <CustomText style={[styles.guideline, { fontSize: 16 }]}>
                        "{wordCount} Words"
                      </CustomText>
                    </View>
                  )}

                  {/* Blanks */}
                  <View style={styles.inputContainer}>
                    {selected.map((_, index) => (
                      <BlankInput
                        checked={checked}
                        key={index}
                        setBlankInputLayout={setBlankInputLayout}
                        index={index}
                      />
                    ))}
                  </View>

                  {/* Letters to Choose */}
                  <View
                    style={[
                      styles.lettersContainer,
                      { backgroundColor: checked ? "transparent" : "#F5F5F5" },
                    ]}
                  >
                    {letterChoices.map((val, index) => (
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
                    ))}
                    {answerCalculated && (
                      <View
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          elevation: 10,
                          top: -20,
                          left: 0,
                          right: 0,
                        }}
                      >
                        <ScrubLogo
                          width={150}
                          height={150}
                          type={isMatchesCorrect}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </>
              {/* )} */}

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
                      icon={
                        answerCalculated && isMatchesCorrect
                          ? "correct"
                          : "cancel"
                      }
                      text={
                        isMatchesCorrect ? "Amazing!" : `${question?.answer}`
                      }
                    />
                  ) : (
                    <StatusIcon icon="none" text={""} />
                  )}

                  {checked ? (
                    <StatusButton
                      setError={setError}
                      scoreIncrease={isMatchesCorrect}
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
          </ScrollView>
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
    // fontWeight: "bold",
    width: "95%",
    textAlign: "left",
    fontSize: 15,
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "Poppins-Semi",
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

    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    columnGap: 14,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    position: "relative",
  },
  btncontainer: {
    paddingBottom: 40,
    width: "95%",
    alignSelf: "center",
  },
});
