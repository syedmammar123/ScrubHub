import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function IncompleteWordButtons({
  title,
  setProcess,
  selected,
  opacity,
  setSelected,
  setWords,
  index,
  setAnswers,
  words,
  bgColor,
}) {
  const handlePress = () => {
    if (selected !== -1 && words[index].opacity !== 0) {
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
      setAnswers((prev) => {
        const previous = [...prev];
        const foundIndex = previous.findIndex(
          (obj) => obj.realIndex === selected,
        );
        console.log("FOUND AT", foundIndex);

        previous[foundIndex] = { ...previous[foundIndex], val: title };

        console.log("Update", previous);

        return previous;
      });
      setSelected(-1);
    }
  };
  return (
    <Pressable
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          opacity: opacity === 0.5 ? 0.6 : 1,
          shadowColor: opacity === 0.5 ? "#ffffff" : "#000000",
        },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.title, { opacity: words[index].opacity }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "auto",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 9,
    fontFamily: "Poppins-Semi",
    // fontWeight: "bold",
  },
});
