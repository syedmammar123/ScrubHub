import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";

export default function DropDownButton({ setDropDownActive, countryCode }) {
  return (
    <TouchableOpacity
      onPress={() => setDropDownActive(true)}
      style={styles.dropdownButton}
    >
      <CustomText style={styles.dropdownText}>{countryCode}</CustomText>

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
  dropdownText: { color: "white", fontFamily: "Poppins-Regular" },
  dropdownIcon: { marginLeft: 5 },
});
