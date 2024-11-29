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
        const updatedLayout = [...blankInputLayout];
        updatedLayout[index] = { x, y, width, height };

        setBlankInputLayout(updatedLayout);

        if (updatedLayout.every((layout) => layout !== null)) {
          setReadyBlanks(true);
        }
      }}
      style={styles.line}
    ></View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: 50,
    height: 60,
    // marginTop: 150,
    borderWidth: 1,
    borderColor: theme.barColor,
    backgroundColor: "transparent",
  },
});
