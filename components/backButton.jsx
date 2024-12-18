import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();
  const handlePress = () => {
    router.navigate("/");
  };
  return (
    <TouchableOpacity style={styles.buttonCircleStyle} onPress={handlePress}>
      <Ionicons name="arrow-back" size={18} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonCircleStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    zIndex: 1,
    width: 30,
    height: 30,
    marginTop: 60,
    borderRadius: 15,
    backgroundColor: "#F6F6F7",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginBottom: 10,
  },
});
