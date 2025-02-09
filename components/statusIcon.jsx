import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/theme";
import CustomText from "./CustomText";

export default function StatusIcon({ text, icon }) {
  console.log(icon === "none");

  return (
    <View style={styles.container}>
      {icon !== "cancel" ? (
        <AntDesign
          name="checkcircle"
          style={{ opacity: icon === "none" ? 0 : 1 }}
          size={35}
          color={theme.barColor}
        />
      ) : (
        <MaterialIcons name="cancel" size={35} color="#EF5555" />
      )}
      <CustomText
        style={{ fontFamily: "Poppins-Semi", fontSize: 18, marginLeft: 10 }}
      >
        {text}
      </CustomText>
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
