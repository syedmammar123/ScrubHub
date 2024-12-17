import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function MatchingDropBox({ setMatchingDropLayout, index }) {
  return (
    <View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setMatchingDropLayout((prev) => {
          const updatedlayout = [...prev];
          updatedlayout[index] = { x, y, width, height };
          return updatedlayout;
        });
      }}
      style={styles.btn}
    >
      <Text style={styles.btnTitle}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    paddingVertical: 8,

    width: "45%",
    backgroundColor: "red",
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
