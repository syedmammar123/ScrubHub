import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function StatusButton({ text }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lowerbox}></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "70%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: theme.barColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  lowerbox: {
    position: "absolute",
    bottom: -4,
    backgroundColor: "#7CBD2D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    zIndex: -1,
  },
});
