import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function DropDownButton({ setDropDownActive, countryCode }) {
  return (
    <TouchableOpacity
      onPress={() => setDropDownActive(true)}
      style={styles.dropdownButton}
    >
      <Text style={styles.dropdownText}>{countryCode}</Text>

      <Ionicons
        name="chevron-down"
        size={18}
        color="white"
        style={styles.dropdownIcon}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "25%",
  },
  dropdownText: { color: "white" },
  dropdownIcon: { marginLeft: 5, alignSelf: "flex-end" },
});