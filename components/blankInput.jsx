import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function blankInput({ setDropZoneLayout }) {
  return (
    <View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        console.log("Drop ZONE LAYOUT", { x, y, width, height });
        setDropZoneLayout({ x, y, width, height });
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
