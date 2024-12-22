import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/theme";

export default function StatusIcon({ text, icon }) {
  return (
    <View style={styles.container}>
      {icon !== "cancel" ? (
        <AntDesign name="checkcircle" size={35} color={theme.barColor} />
      ) : (
        <MaterialIcons name="cancel" size={35} color="red" />
      )}
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
  },
});
