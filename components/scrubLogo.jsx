import { View, StyleSheet, Image } from "react-native";
import React from "react";

export default function scrubLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("@/assets/scrubLogo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: "79%",
    height: 150,
    marginBottom: 10,
  },
});
