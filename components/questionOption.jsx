import { Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";

export default function questionOption({
  bgColor,
  Option,
  setSelected,
  selected,
  checked,
  opacity,
  index,
}) {
  const handlePress = () => {
    if (typeof selected === "string") {
      setSelected(Option);
    } else {
      setSelected((prev) => {
        let updatedArray;
        if (prev.includes(index)) {
          updatedArray = prev.filter((s) => s !== index);
        } else {
          updatedArray = [...prev, index];
        }
        return updatedArray.sort((a, b) => a - b);
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={checked}
      style={[
        styles.optionContainer,
        { backgroundColor: bgColor, opacity: opacity },
      ]}
    >
      <Text
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {Option}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: 230,
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
