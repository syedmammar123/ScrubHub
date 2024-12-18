import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function questionOption({
  selected,
  bgColor,
  Option,
  setSelected,
}) {
  const handlePress = () => {
    console.log(selected);
    setSelected(Option);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.optionContainer,
        { backgroundColor: selected === Option ? theme.barBgColor : bgColor },
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
