import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function reviewButton({ btnTitle, bgColor, nextRoute }) {
  const router = useRouter("");
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate(nextRoute)}
      >
        <View style={[styles.buttonCircleStyle, { backgroundColor: bgColor }]}>
          <MaterialIcons name="reviews" size={40} color="black" />
        </View>
        <View style={[styles.lowerBox, { backgroundColor: bgColor }]}>
          <Text style={styles.buttonText}>{btnTitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginBottom: 15,
    alignItems: "center",
  },
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -25,
    zIndex: 1,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 35,
  },

  lowerBox: {
    width: 350,
    borderWidth: 1,
    height: 95,
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colorBlack,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
