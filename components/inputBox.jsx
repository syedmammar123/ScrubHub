import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { theme } from "@/theme";
import Animated from "react-native-reanimated";

export default function InputBox({
  letter,
  setLetterLayout,
  letterLayout,
  index,
  AnimatedStyle,
}) {
  return (
    // <View style={styles.container}>
    <Animated.View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        const updatedlayout = [...letterLayout];
        updatedlayout[index] = { x, y, width, height };
        setLetterLayout(updatedlayout);
      }}
      style={[styles.box, AnimatedStyle(index)]}
    >
      <Text style={{ fontWeight: "bold" }}>{letter}</Text>
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
    backgroundColor: "white",
    zIndex: 10,
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
