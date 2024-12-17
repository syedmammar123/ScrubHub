import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function IncompleteWordButtons({
  title,
  setProcess,
  selected,
  setSelected,
  setWords,
  index,
  words,
}) {
  const handlePress = () => {
    if (selected !== -1) {
      console.log(title);
      setProcess((prev) => {
        const updatedProcess = [...prev];
        updatedProcess[selected] = { ...updatedProcess[selected], val: title };
        return updatedProcess;
      });
      setWords((prev) => {
        const updatedWord = [...prev];
        updatedWord[index] = { ...updatedWord[index], opacity: 0 };
        return updatedWord;
      });
      setSelected(-1);
    }
  };
  return (
    <Pressable style={styles.btn} onPress={handlePress}>
      <Text style={[styles.title, { opacity: words[index].opacity }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.barColor,
    width: "auto",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontSize: 9,
    fontWeight: "bold",
  },
});
