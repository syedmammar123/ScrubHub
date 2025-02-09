import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";

const styles = StyleSheet.create({
  root: {
    padding: 4,
  },
  container: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E6E8",
    backgroundColor: "white",
  },
  text: {
    fontSize: 19,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: "#E8E6E8",
    top: 4,
  },
});

const Word = ({ word }) => (
  <View style={styles.root}>
    <View>
      <View style={styles.container}>
        <CustomText style={styles.text}>{word}</CustomText>
      </View>
      <View style={styles.shadow} />
    </View>
  </View>
);

export default Word;
