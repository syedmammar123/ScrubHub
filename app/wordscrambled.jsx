import React from "react";
import { View, StyleSheet } from "react-native";

import WordList from "@/components/WordList";
import Word from "@/components/Word";
import BackButton from "@/components/backButton";
import UpperBar from "@/components/upperBar";
import { GestureDetector } from "react-native-gesture-handler";

const words = [
  { id: 1, word: "A" },
  { id: 8, word: "B" },
  { id: 2, word: "C" },
  { id: 7, word: "D" },
  { id: 6, word: "E" },
  { id: 9, word: "F" },
  { id: 5, word: "G" },
  { id: 3, word: "H" },
  { id: 4, word: "I" },
  { id: 10, word: "A" },
  { id: 11, word: "A" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const WordScrambled = () => {
  return (
    <View style={styles.container}>
      <BackButton />
      <UpperBar />
      <WordList>
        {words.map((word) => (
          <Word key={word.id} {...word} />
        ))}
      </WordList>
    </View>
  );
};

export default WordScrambled;
