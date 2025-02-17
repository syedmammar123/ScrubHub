import { Text, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const CustomText = ({ style, className, ...props }) => {
  const fontSize = width < 370 ? 12 : 14; // Default font size 16, smaller for narrow screens

  return (
    <Text
      {...props}
      style={[{ fontFamily: "Poppins-Regular", fontSize }, style]}
      className={`${className}`}
    />
  );
};

export default CustomText;
