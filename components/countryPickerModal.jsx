import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { countryCodes } from "@/assets/countryCodes"; // Adjust path as needed
import CustomText from "./CustomText";

export default function CountryPickerModal({
  dropDownActive,
  setDropDownActive,
  setCountryCode,
}) {
  console.log("codes", countryCodes);

  return (
    <Modal
      visible={dropDownActive}
      transparent
      animationType="fade"
      onRequestClose={() => setDropDownActive(false)}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => setDropDownActive(false)}
      >
        <View style={styles.dropdownContainer}>
          <FlatList
            data={countryCodes}
            keyExtractor={(item) => item.code} // Unique key
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  setCountryCode(item.dial_code);
                  setDropDownActive(false);
                }}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <CustomText style={styles.dropdownOptionText}>
                  {`${item.name.en} (${item.dial_code})`}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    maxHeight: 300,
  },
  flag: {
    fontSize: 24, // Make sure flag emoji is big enough
    marginRight: 10,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownOptionText: { fontSize: 16, color: "black" },
});
