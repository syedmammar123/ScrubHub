import { View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import React, { useRef, useMemo } from "react";
const happy = {
  0: require("@/assets/animations/brainh unscreen.json"),
  1: require("@/assets/animations/hearth unscreen.json"),
  2: require("@/assets/animations/lungh unscreen.json"),
  3: require("@/assets/animations/muscleh unscreen.json"),
  4: require("@/assets/animations/xrayh unscreen.json"),
};
const sad = {
  0: require("@/assets/animations/bloodcells unscreen.json"),
  1: require("@/assets/animations/brains unscreen.json"),
  2: require("@/assets/animations/hearts unscreen.json"),
  3: require("@/assets/animations/xrays unscreen.json"),
  4: require("@/assets/animations/lungs unscreen.json"),
};
export default function scrubLogo({ type }) {
  const animation = useRef(null);
  // Pick a random animation based on 'type'
  const selectedAnimation = useMemo(() => {
    const animationList = type === true ? happy : sad;
    const randomIndex = Math.floor(
      Math.random() * Object.keys(animationList).length
    );
    return animationList[randomIndex];
  }, [type]); // Recompute when 'type' changes
  return (
    <View style={styles.logoContainer}>
      {type !== null ? (
        <LottieView
          ref={animation}
          source={selectedAnimation}
          // source={sad[4]}
          // source={require("@/assets/animations/hearth unscreen.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <Image
          source={require("@/assets/scrubLogo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      )}
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
