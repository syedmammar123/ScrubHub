import { Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from "react";

export default function questionOption({ bgColor, Option, setSelected }) {
  const handlePress = () => {
    setSelected(Option);
  };
  return (
    <Pressable
      onPress={handlePress}
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
    </Pressable>
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
