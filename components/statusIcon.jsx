import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "@/theme";

export default function StatusIcon({ text }) {
  return (
    <View style={styles.container}>
      <AntDesign name="checkcircle" size={35} color={theme.barColor} />
      <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 10 }}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
