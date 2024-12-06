import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function blankInput({
  setBlankInputLayout,
  index,
  blankInputLayout,
  setReadyBlanks,
}) {
  return (
    <View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setBlankInputLayout((prevLayout) => {
          const updatedlayout = [...prevLayout];
          updatedlayout[index] = { x, y, width, height };
          return updatedlayout;
        });
      }}
      style={styles.line}
    ></View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: 50,
    height: 60,
    zIndex: 0,
    borderWidth: 1,
    borderColor: theme.barColor,
    backgroundColor: "transparent",
  },
});
