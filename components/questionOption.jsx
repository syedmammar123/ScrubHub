import { Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";

export default function questionOption({
  bgColor,
  Option,
  setSelected,
  checked,
}) {
  const handlePress = () => {
    setSelected(Option);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={checked}
      style={[styles.optionContainer, { backgroundColor: bgColor }]}
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
