import { View, StyleSheet, Image } from "react-native";
// import LottieView from "lottie-react-native";
import React, { useRef } from "react";
export default function scrubLogo({ type }) {
  const animation = useRef(null);
  return (
    <View style={styles.logoContainer}>
      {/* {type ? ( */}
      <LottieView
        ref={animation}
        source={require("@/assets/BloodCell_Happy.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Image
        source={require("@/assets/scrubLogo.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      {/* // ) : (
       
      // )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  logoImage: {
    width: "79%",
    height: 150,
    marginBottom: 10,
  },
});
