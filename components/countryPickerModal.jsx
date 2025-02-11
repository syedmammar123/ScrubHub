import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import countries from "../assets/countries.json";

import CustomText from "./CustomText";

export default function CountryPickerModal({
  dropDownActive,
  setDropDownActive,
  setCountryCode,
}) {
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
            data={countries}
            keyExtractor={(item) => item.cca2} // Use the ISO alpha-2 code as a key
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  const dialCode =
                    item.idd.root + (item.idd.suffixes?.[0] || "");
                  setCountryCode(dialCode);
                  setDropDownActive(false);
                }}
              >
                <Image
                  source={{
                    uri: `https://flagcdn.com/w40/${item.cca2.toLowerCase()}.png`,
                  }}
                  style={styles.flag}
                />
                <CustomText style={styles.dropdownOptionText}>
                  {`${item.name.common} (${item.idd.root}${
                    item.idd.suffixes?.[0] || ""
                  })`}
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
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 10,
    borderRadius: 2,
  },
  inviteSentContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    rowGap: 10,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  dropdownOptionText: { fontSize: 16, color: "black" },
});
