import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";
import CustomText from "./CustomText";

export default function matchingButton({
  title,
  AnimatedStyle,
  index,
  setMatchingOptionsLayout,
  bgColor,
}) {
  return (
    <Animated.View
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        setMatchingOptionsLayout((prevLayout) => {
          const updatedlayout = [...prevLayout];
          updatedlayout[index] = { x, y, width, height };
          return updatedlayout;
        });
      }}
      style={[styles.btn, AnimatedStyle(index), { backgroundColor: bgColor }]}
    >
      <CustomText
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        style={styles.btnTitle}
      >
        {title}
      </CustomText>
    </Animated.View>
  );
}

const styles = ScaledSheet.create({
  btn: {
    alignSelf: "center",

    height: 37,
    width: "45%",
    paddingHorizontal: 4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  btnTitle: {
    fontFamily: "Poppins-Semi",
    fontSize: "9@s",
    // fontWeight: "bold",
    textAlign: "center",
  },
});
