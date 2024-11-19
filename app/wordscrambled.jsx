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

export default function WordScrambled() {
  const translateValueX = Word.map(() => useSharedValue(0));
  const translateValueY = Word.map(() => useSharedValue(0));

  const [dropZoneLayout, setDropZoneLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [dragZoneLayout, setDragZoneLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [letterLayout, setLetterLayout] = useState([]);

  const CreatePanGesture = (index) => {
    return Gesture.Pan()
      .onUpdate((event) => {
        translateValueX[index].value = event.translationX;
        translateValueY[index].value = event.translationY;
      })
      .onEnd((event) => {
        console.log(letterLayout[index]?.x + event.translationX);
        console.log(letterLayout[index]?.y - event.translationY);

        // const draggedX =
        //   letterLayout[index]?.x +
        //   event.translationX +
        //   letterLayout[index]?.width;
        // const draggedY =
        //   letterLayout[index]?.y +
        //   event.translationY +
        //   letterLayout[index]?.height;
        // console.log(draggedX);
        // console.log(draggedY);
        const draggedX = letterLayout[index]?.x + event.translationX;
        const draggedY = letterLayout[index]?.y - event.translationY;
        const dropXStart = dropZoneLayout.x - 3;
        const dropXEnd = dropZoneLayout.x + dropZoneLayout.width + 3;
        const dropYStart = dropZoneLayout.y - 3;
        const dropYEnd = dropZoneLayout.y + dropZoneLayout.height + 3;
        console.log(event.absoluteX);
        console.log(event.absoluteY);

        if (
          draggedX >= dropXStart &&
          draggedX <= dropXEnd &&
          draggedY >= dropYStart &&
          draggedY <= dropYEnd
        ) {
        } else {
          // Reset position if not dropped within the target area
          translateValueX[index].value = withSpring(0);
          translateValueY[index].value = withSpring(0);
        }
      });
  };
  const panGestureHandler = Word.map((key, index) => CreatePanGesture(index));

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

              {/* Input Of Word  */}
              <View style={styles.inputContainer}>
                <BlankInput setDropZoneLayout={setDropZoneLayout} />
              </View>

              {/* Letters to Choose */}
              <View
                style={styles.lettersContainer}
                onLayout={(e) => {
                  const { x, y, width, height } = e.nativeEvent.layout;
                  setDragZoneLayout({ x, y, width, height });
                }}
              >
                {Word.map((val, index) => {
                  return (
                    <GestureDetector
                      key={index}
                      gesture={panGestureHandler[index]}
                    >
                      <Animated.View
                        style={[
                          AnimatedStyle(index),
                          { width: 40, height: 50 },
                        ]}
                      >
                        <InputBox
                          letter={val}
                          setLetterLayout={setLetterLayout}
                          letterLayout={letterLayout}
                          index={index}
                        />
                      </Animated.View>
                    </GestureDetector>
                  );
                })}
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
  },

  lettersContainer: {
    width: "95%",
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
