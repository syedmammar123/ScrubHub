import { ImageBackground, StyleSheet } from "react-native";
import React from "react";

export default function backgroundImage({ children }) {
  return (
    <ImageBackground
      source={require("@/assets/background.png")} // Path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
