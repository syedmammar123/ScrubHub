import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import CustomTextInput from "./CustomTextInput";

export default function NumberInput({
  value,
  onChangeText,
  placeholderTextColor,
bgColor,
  color,
}) {
  return (
    <CustomTextInput
      style={[
        styles.phoneInputStyles,
        { backgroundColor: bgColor, color: color },
      ]}
      placeholder="Enter Number..."
      keyboardType="number-pad"
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
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
    fontFamily: "Poppins-Regular",
  },
});
