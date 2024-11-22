import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function blankInput({
  setBlankInputLayout,
  index,
  blankInputLayout,
}) {
  return (
    <View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        const updatedlayout = [...blankInputLayout];
        updatedlayout[index] = { x, y, width, height };
        setBlankInputLayout(updatedlayout);
      }}
      style={styles.line}
    ></View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: 60,
    height: 60,
    // marginTop: 150,
    borderWidth: 2,
    borderColor: theme.barColor,
    backgroundColor: "transparent",
  },
});
