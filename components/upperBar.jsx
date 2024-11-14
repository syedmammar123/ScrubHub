import { View, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";

export default function UpperBar() {
  return (
    <View style={styles.bar}>
      <View style={styles.innerBar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: "95%",
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.barBgColor,
    alignSelf: "center",
  },
  innerBar: {
    position: "relative",
    width: "20%",
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.barColor,
    alignSelf: "flex-start",
  },
});
