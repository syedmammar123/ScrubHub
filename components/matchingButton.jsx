import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

export default function matchingButton({
  title,
  AnimatedStyle,
  index,
  setMatchingOptionsLayout,
}) {
  return (
    <Animated.View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setMatchingOptionsLayout((prevLayout) => {
          const updatedlayout = [...prevLayout];
          updatedlayout[index] = { x, y, width, height };
          return updatedlayout;
        });
      }}
      style={[styles.btn, AnimatedStyle(index)]}
    >
      <Text style={styles.btnTitle}>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    paddingVertical: 8,

    width: "45%",
    backgroundColor: "green",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
