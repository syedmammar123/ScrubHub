import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function blankInput() {
  return <View style={styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    width: 40,
    height: 3,
    marginTop: 150,
    borderBottomWidth: 2,
    borderBottomColor: theme.barColor,
  },
});
