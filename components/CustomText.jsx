import { Text } from "react-native";
import React from "react";

const CustomText = ({ style, className, ...props }) => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Poppins-Regular" }, style]}
      className={`${className}`}
    />
  );
};

export default CustomText;
