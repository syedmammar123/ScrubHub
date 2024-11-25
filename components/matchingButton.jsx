import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function matchingButton({ title }) {
  return (
    <View style={styles.btn}>
      <Text style={styles.btnTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    paddingVertical: 10,

    width: "45%",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
