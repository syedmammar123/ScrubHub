import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { theme } from "@/theme";
import Animated from "react-native-reanimated";

export default function InputBox({
  letter,
  setLetterLayout,
  index,
  AnimatedStyle,
  bgColor,
  answerCalculated,
}) {
  return (
    // <View style={styles.container}>
    <Animated.View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setLetterLayout((prevLayout) => {
          const updatedlayout = [...prevLayout];
          updatedlayout[index] = { x, y, width, height };
          return updatedlayout;
        });
      }}
      style={[
        styles.box,
        AnimatedStyle(index),
        { backgroundColor: bgColor, borderWidth: answerCalculated ? 0 : 1 },
      ]}
    >
      <Text
        style={{
          fontWeight: "bold",
          color: bgColor === "#EF5555" ? "white" : "black",
        }}
      >
        {letter}
      </Text>
    </Animated.View>

    //   <View style={[styles.outerBorder]}></View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20,
  },
  box: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: theme.barColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,

    marginTop: 5,
    zIndex: 2,
  },
  outerBorder: {
    position: "absolute",
    bottom: -4,
    width: 40,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    zIndex: -1,
    borderColor: theme.barColor,
  },
});
