import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import BackgroundImage from "@/components/backgroundImage";
import BackButton from "@/components/backButton";
import { theme } from "@/theme";
import UpperBar from "@/components/upperBar";
import InputBox from "@/components/inputBox";
import BlankInput from "@/components/blankInput";
import StatusButton from "@/components/statusButton";
import StatusIcon from "@/components/statusIcon";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Word = ["P", "O", "H", "S", "E", "E", "I", "S", "Y"];
const answerLength = 7;

function calcLines() {
  let lines = 1;
  let count = 1;
  if (answerLength <= 6) {
    return 1;
  }
  for (let i = 1; i <= answerLength; i++) {
    count++;
    if (count === 6) {
      console.log(count);

      lines++;
      count = 1;
    }
  }
  return lines;
}
let noflines = calcLines();
console.log("Lines are", noflines);

export default function WordScrambled() {
  const translateValueX = Word.map(() => useSharedValue(0));
  const translateValueY = Word.map(() => useSharedValue(0));

  const [readyBoxes, setReadyBoxes] = useState(false);
  const [readyBlanks, setReadyBlanks] = useState(false);

  const [letterLayout, setLetterLayout] = useState([]);
  const [blankInputLayout, setBlankInputLayout] = useState(
    Array(answerLength).fill(null)
  );
  const line = useSharedValue(-1);
  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
        console.log(
          "TranslateY",
          0 - translateValueY[index].value - letterLayout[index]?.y
        );
        if (translateValueY[index].value > 0) {
          line.value = -1;
        } else if (
          0 - translateValueY[index].value - letterLayout[index]?.y >
          115
        ) {
          line.value = 1;
        } else {
          line.value = 2;
        }
        console.log(line.value);
      })
      .onEnd((event) => {
        const draggedX = letterLayout[index]?.x + event.translationX;
        console.log("Dragged X", draggedX);

        let isDropped = false;
        console.log(line.value);

        for (let i = (line.value - 1) * 6; i < line.value * 6; i++) {
          const blank = blankInputLayout[i];
          console.log(blank);

          if (
            blank &&
            draggedX >= blank.x - 5 &&
            draggedX + letterLayout[index]?.width <= blank.x + blank.width + 10
          ) {
            // Successfully dropped in the blank input
            isDropped = true;
            console.log(i);
            console.log("DROPPED:=========");
            console.log("blankx+width", blank.x + blank.width);

            console.log(
              "Dragged X+width",
              draggedX + letterLayout[index]?.width
            );

            break;
          }
        }

        if (!isDropped) {
          // Reset position if not dropped in any blank input
          translateValueX[index].value = withSpring(0);
          translateValueY[index].value = withSpring(0);
        }
      });
  };

  const panGestureHandler = Word.map((_, index) => CreatePanGesture(index));

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
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            {/* UPPER CONTAINER */}
            <View>
              {/* Guideline */}
              <View>
                <Text style={styles.guideline}>
                  Given a hint with a series of empty spaces and 14 letter
                  options, find out which word/term is being hinted at
                </Text>
              </View>

              {/* Hint */}
              <View>
                <Text style={styles.guideline}>
                  Process of converting glucose to energy.
                </Text>
              </View>

              {/* Blanks */}
              {/* Render BlankInput Always */}
              <View style={styles.inputContainer}>
                {blankInputLayout.map((_, index) => (
                  <BlankInput
                    key={index}
                    setBlankInputLayout={setBlankInputLayout}
                    blankInputLayout={blankInputLayout}
                    setReadyBlanks={setReadyBlanks}
                    index={index}
                  />
                ))}
              </View>

              {/* Letters to Choose */}
              {readyBlanks && (
                <View style={styles.lettersContainer}>
                  {Word.map((val, index) => (
                    <GestureDetector
                      key={index}
                      gesture={panGestureHandler[index]}
                    >
                      <InputBox
                        letter={val}
                        setLetterLayout={setLetterLayout}
                        letterLayout={letterLayout}
                        index={index}
                        setReadyBoxes={setReadyBoxes}
                        AnimatedStyle={AnimatedStyle}
                      />
                    </GestureDetector>
                  ))}
                </View>
              )}
            </View>

            {/* LOWER CONTAINER */}
            <View>
              {/* Button */}
              <View style={styles.btncontainer}>
                <StatusIcon text="Amazing!" />
                <StatusButton text="Continue" />
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

// import React from "react";
// import { View, StyleSheet } from "react-native";

// import WordList from "@/components/WordList";
// import Word from "@/components/Word";
// import BackButton from "@/components/backButton";
// import UpperBar from "@/components/upperBar";
// import { GestureDetector } from "react-native-gesture-handler";

// const words = [
//   { id: 1, word: "A" },
//   { id: 8, word: "B" },
//   { id: 2, word: "C" },
//   { id: 7, word: "D" },
//   { id: 6, word: "E" },
//   { id: 9, word: "F" },
//   { id: 5, word: "G" },
//   { id: 3, word: "H" },
//   { id: 4, word: "I" },
//   { id: 10, word: "A" },
//   { id: 11, word: "A" },
// ];

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
// });

// const WordScrambled = () => {
//   return (
//     <View style={styles.container}>
//       <BackButton />
//       <UpperBar />
//       <WordList>
//         {words.map((word) => (
//           <Word key={word.id} {...word} />
//         ))}
//       </WordList>
//     </View>
//   );
// };

// export default WordScrambled;
