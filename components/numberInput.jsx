import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function NumberInput({ placeholderTextColor, bgColor, color }) {
  return (
    <TextInput
      style={[
        styles.phoneInputStyles,
        { backgroundColor: bgColor, color: color },
      ]}
      placeholder="Enter Number..."
      keyboardType="number-pad"
      placeholderTextColor={placeholderTextColor}
    />
  );
}

const styles = StyleSheet.create({
  phoneInputStyles: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
