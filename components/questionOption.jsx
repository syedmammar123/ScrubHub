import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function questionOption({ bgColor, Option }) {
  return (
    <TouchableOpacity
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
